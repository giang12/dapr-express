import { createProxyMiddleware } from "http-proxy-middleware"
import { RouteConfig } from "../../types/RouteConfig"


export default function HttpProxy({ routeSettings }: { routeSettings:RouteConfig }) {
	if(!routeSettings.proxy) throw new Error("panic");
	
    return createProxyMiddleware(routeSettings.proxy);
}