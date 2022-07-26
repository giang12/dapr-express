import fs from "fs"
import path from "path"
import { flattenDeep } from "lodash"

export const PROJECT_DIR = path.resolve(__dirname, "../");

export function getPlugins(dir:string) {
    let plugins = {};

    getAllFiles(dir).forEach((file:string) => {
      if(typeof file !== 'string' || file === "") throw new Error("panic");

      let [ name ] = path.basename(file).split(".");
      if(name === 'index') return;//skip
      
      try{
        let exe = require(file)
        //@ts-ignore
        plugins[name.toLowerCase() as keyof typeof plugins] = exe.default? exe.default : exe;
      }catch(e){
        console.log(e)
        throw new Error("failed to import " + name + " from " + file);
      }
    });
    return plugins;
}

export function getAllFiles(dir:string):Array<string>{
    let files:Array<string> = flattenDeep(walkDirSync(dir, (file:any)=>{
      return file.toString();
    }));
    return files
}

export const walkDirSync:any = (dir:string, callback:any) =>  fs.lstatSync(dir).isDirectory()
        ? fs.readdirSync(dir).map(f => walkDirSync(path.join(dir, f), callback))
        : callback(dir);

export function localOverride(globalset?:any, localset?:any) {
    if(localset !== null && localset !== undefined && localset !== "") {
        return localset
    }
    return globalset;
}