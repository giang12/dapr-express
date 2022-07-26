import { RouteConfig } from "../../types/RouteConfig"

import { DaprClient, HttpMethod } from "@dapr/dapr";
import express from "express";

export default function DaprRpc({ routeSettings, daprClient }: { routeSettings:RouteConfig, daprClient: DaprClient }) {
	if (!routeSettings.rpc) throw new Error("panic");
    if (!routeSettings.verb) {
    	routeSettings.verb = "GET"
    }

    return async function(req: express.Request, res: express.Response, next: express.NextFunction) {
	    let {appName, method, verb} = Object.assign({}, routeSettings.rpc);
	    //default fallback
	    if (!verb) {
	        verb = routeSettings.verb.toUpperCase();
	    }
        console.log(`Rpc ${verb} ${appName}.${method}`);
        try {
            const r = await daprClient.invoker.invoke(appName, method, HttpMethod[verb.toUpperCase() as keyof typeof HttpMethod], req.body);
            res.response(r);
        } catch (e) {
            res.response(e);
        }
        next();
    }
}