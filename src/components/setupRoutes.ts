import { Application } from "express"
import { DaprClient } from "@dapr/dapr"
import compression from "compression"
import { JSON, UrlEncoded } from "../middlewares"

import { RouteConfig } from "../types/RouteConfig"
import { ServerConfig } from "../types/ServerConfig"

import { Executors } from "../middlewares/executors"
import { Hooks } from "../middlewares/hooks"
import { localOverride } from "../utils"

export default function setupRoutes(app: Application, daprClient: DaprClient, settings:ServerConfig, routes: Array < RouteConfig > ) {
    console.log("setting up routes:::")
    routes.forEach(r => {
        console.log(r)
        if(!r.executor) {
            throw new Error("missing executor for route " + r.url)
        }
        let pipeline = makePipeline(daprClient, settings, r);
        app[r.verb.toLowerCase() as keyof typeof app](r.url, pipeline)
    })

};

function makePipeline(daprClient: DaprClient, serverSettings:ServerConfig, r: RouteConfig) {
    let pipeline:Array<Function> = [];
    let opts = { serverSettings, routeSettings:r, daprClient };

    //options
    let isJson = localOverride(serverSettings.json, r.json);
    if(isJson) {
        pipeline.push(JSON(isJson))
    }
    let isUrlEncoded = localOverride(serverSettings.urlencoded, r.urlencoded);
    if(isUrlEncoded) {
        pipeline.push(UrlEncoded(isUrlEncoded))
    }

    //route specific before hooks
    if(r.beforeHooks){
        r.beforeHooks.forEach((hook:string)=>{
            //@ts-ignore
            pipeline.push(Hooks[hook.toString().toLowerCase() as keyof typeof Hooks](opts));
        })
    }
    
    //@ts-ignore each of these executors have to have this type ({}:opts) => express.NextFunction
    pipeline.push(Executors[r.executor.toString().toLowerCase() as keyof typeof Executors](opts));
    
    //route specific after hooks
    if(r.afterHooks) {
        r.afterHooks.forEach((hook:string)=>{
            //@ts-ignore
            pipeline.push(Hooks[hook.toString().toLowerCase() as keyof typeof Hooks](opts));
        })
    }

    let isCompress = localOverride(serverSettings.compression, r.compression);
    if(isCompress) {
        pipeline.push(isCompress === true ? compression() : compression(isCompress))
    }

    return pipeline;
}