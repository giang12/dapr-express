import path from "path"
import { PROJECT_DIR, getPlugins } from "../../utils"
//getting all executors
const internalExecutorsPath = path.resolve(__dirname);

const buildInPlugins = path.resolve(PROJECT_DIR, "./plugins/executors");

const pluginExecutorsPath = process.env.ExecutorsPath || path.resolve(process.cwd(), "./plugins/executors");

export const Executors = Object.assign({}, getPlugins(internalExecutorsPath), getPlugins(buildInPlugins), getPlugins(pluginExecutorsPath));

console.log(Executors);