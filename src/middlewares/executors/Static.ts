import express from "express"
import { RouteConfig } from "../../types/RouteConfig"

/**
 * [Static description]
 * @param {RouteConfig }} { routeSettings } [description]
 */
export default function Static({ routeSettings }: { routeSettings:RouteConfig }) {

    return async function(req: express.Request, res: express.Response, next: express.NextFunction) {
        let conf = Object.assign({}, {status: 200, value: ""}, routeSettings.static);

        res.status(conf.status);
        res.response(conf.value);
        next();
    }
}