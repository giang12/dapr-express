import { Application } from "express"
import { RouteConfig } from "../types/RouteConfig"
import { ServerConfig } from "../types/ServerConfig"
import { Cors } from "../middlewares"
import { localOverride } from "../utils"
export default function setupCors(app: Application, serverSettings:ServerConfig, routes: Array <RouteConfig>) {
    console.log("setting up cors:::")
    routes.forEach(r => {
        let corsConfig = localOverride(serverSettings.cors, r.cors)

        console.log(`${r.url} corsConfig= ${JSON.stringify(corsConfig)}`);
        if(corsConfig){
            app.options(r.url, Cors(corsConfig)) //https://www.npmjs.com/package/cors#enabling-cors-pre-flight
            app[r.verb.toLowerCase() as keyof typeof app](r.url, Cors(corsConfig))
        }
    })
};
