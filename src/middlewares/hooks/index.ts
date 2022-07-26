import path from "path"
import { getPlugins, PROJECT_DIR } from "../../utils"
//get all hooks
const internalHooks = path.resolve(__dirname);

const buildInPlugins = path.resolve(PROJECT_DIR, "./plugins/hooks");

const pluginHooks = process.env.HooksPath || path.resolve(process.cwd(), "./plugins/hooks");

export const Hooks = Object.assign({}, getPlugins(internalHooks), getPlugins(buildInPlugins), getPlugins(pluginHooks));

console.log(Hooks);