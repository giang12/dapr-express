import express from "express"
import { RouteConfig } from "../../types/RouteConfig"

/**
 * [Redirect description]
 * @param {RouteConfig }} { routeSettings } [description]
 */
export default function Redirect({ routeSettings }: { routeSettings:RouteConfig }) {

    return async function(req: express.Request, res: express.Response, next: express.NextFunction) {
        let conf = Object.assign({}, {status: 302, path: "https://x1111.xyz"}, routeSettings.redirect);

        res.redirect(conf.status, conf.path);
    }
}