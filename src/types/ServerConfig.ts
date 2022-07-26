export type ServerConfig = {

    // Exposed port
    port: string | number,
    // Exposed IP
    ip: string,
    // dapr sidecar
    daprHost: string
    daprPort: string,
    // Used server instance. If null, it will create a new HTTP(s)(2) server
    // If false, it will start without server in middleware mode
    server: boolean,
    // Use HTTP2 server (experimental)
    http2: boolean,

    //global hooks run before specific route reponse
    beforeHooks?: Array<string>, 
    afterHooks?: Array<string>, //after reponse
    //authenticate and authorize
    auth?: string,
    // global cors
    cors?: boolean | object,
    // body parsers
    json?:boolean | object,
    urlencoded?: boolean | object,
    compression?: boolean | object,
    // rateLimiters
    rateLimit?: object,

    // // Log each request (default to "info" level)
    // logRequest: "info",

    // // Log the request ctx.params (default to "debug" level)
    // logRequestParams: "debug",

    // // Log each response (default to "info" level)
    // logResponse: "info",

    // // Log the response data (default to disable)
    // logResponseData: null,

    // // If set to true, it will log 4xx client errors, as well
    // log4XXResponses: false,

    // // Log the route registration/aliases related activity
    // logRouteRegistration: "info",



    // // HTTP Server Timeout
    // httpServerTimeout: null,

    // // Optimize route order
    // optimizeOrder: true,

    // // CallOption for the root action `api.rest`
    // rootCallOptions: null,

    // // Debounce wait time before call to regenerate aliases when received event "$services.changed"
    // debounceTime: 500
}