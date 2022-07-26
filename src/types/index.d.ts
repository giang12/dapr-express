import {AppResponse} from "./AppResponse"

export declare global{
    namespace Express {
        interface Request {
            clientIp: string;
            user: object;
            reqClient: object
        }
    }
}

export declare global{
    namespace Express {
        interface Response {
            response(arg0: any): void;
            body:AppResponse
        }
    }
}