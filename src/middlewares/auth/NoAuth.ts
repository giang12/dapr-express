import { Application, Request, Response, NextFunction} from "express"
import { ServerConfig } from "../../types/ServerConfig"
import { RouteConfig } from "../../types/RouteConfig"

export default function NoAuth({app, serverSettings, routes}:{app: Application, serverSettings:ServerConfig, routes: Array <RouteConfig>}) {

	return function noop(req:Request, res:Response, next:NextFunction){
		next();
	};
}