export type RpcConfig = {
    appName:string,
    method:string,
    verb?:string //if empty => inhirit from RouteConfig
}
export type StaticConfig = {
    status: number,
    value: string
}
export type RedirectConfig = {
    status: number,
    path: string
}
export type RouteConfig =  {
    url: string,
    verb: string,
    executor: string, //name

    beforeHooks?: Array<string>,
    afterHooks?: Array<string>,
    auth?: string,
    cors?: boolean | object,
    json?:boolean | object,
    urlencoded?: boolean | object,
    compression?: boolean | object,
    rateLimit?: object,


    proxy?: object,
    rpc?: RpcConfig,
    static?: StaticConfig,
    redirect?:RedirectConfig
}
