import { Application } from "express"
import { ServerConfig } from "../types/ServerConfig"
import { RouteConfig } from "../types/RouteConfig"
import { localOverride } from "../utils"

import { Auth } from "../middlewares/auth"

export default function setupAuth(app: Application, serverSettings:ServerConfig, routes: Array <RouteConfig> ) {
    console.log("setting up Auth:::")
    routes.forEach(routeSettings => {
        let authorName = localOverride(serverSettings.auth, routeSettings.auth);
        let author = Auth[authorName.toLowerCase() as keyof typeof Auth];

        console.log(`${routeSettings.url} author=${author}`);
        if(typeof author === "function"){
            //@ts-ignore
            app[routeSettings.verb.toLowerCase() as keyof typeof app](routeSettings.url, author({routeSettings, app, serverSettings, routes}))
        } else {
            throw new Error(`${authorName} is not a function`)
        }
    })
};
