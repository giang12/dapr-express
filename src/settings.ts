import { RouteConfig } from "./types/RouteConfig"
import { ServerConfig } from "./types/ServerConfig"

import config from 'config'

console.log(JSON.stringify(config, null, 2));

export const ROUTES: Array < RouteConfig > = config.get("routes");
export const settings:ServerConfig = config.get("settings");

export default settings