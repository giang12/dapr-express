import path from "path"
import { getPlugins, PROJECT_DIR } from "../../utils"
//getting all executors
//
const internalAuthsPath = path.resolve(__dirname);

const buildInPlugins = path.resolve(PROJECT_DIR, "./plugins/auth");

const pluginAuthsPath = process.env.AuthPath || path.resolve(process.cwd(), "./plugins/auth");

export const Auth = Object.assign({}, getPlugins(internalAuthsPath), getPlugins(buildInPlugins), getPlugins(pluginAuthsPath));

console.log(Auth)