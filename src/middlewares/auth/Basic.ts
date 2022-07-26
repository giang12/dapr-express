import { Application, Request, Response, NextFunction } from "express"
import { ServerConfig } from "../../types/ServerConfig"
import { RouteConfig } from "../../types/RouteConfig"

//OVERRIDE ME! via plugins
export default function Basic({ routeSettings, app, serverSettings, routes }: { routeSettings: RouteConfig, app: Application, serverSettings: ServerConfig, routes: Array < RouteConfig > }) {

    return async function(req: Request, res: Response, next: NextFunction) {
        // Read the token from header
        let auth = req.headers["authorization"];
        if (!(auth && auth.startsWith("Bearer"))) {
            // No token
            res.status(403);
            return next(new Error("UnAuthorized!"));
        }
        let token = auth.slice(7);
        console.log(`authToken=${token}`);
        // Check the token
        if (token !== "123456") {
            res.status(403);
            return next(new Error("UnAuthorized!"));
        }

        req.user = { id: 1, name: "John Doe" };
        next();
    };
}