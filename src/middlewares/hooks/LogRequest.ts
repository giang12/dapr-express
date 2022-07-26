import express from "express"

export default function LogRequest() {

    return function(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('BeforeHook middleware triggered:');
        console.log(`new req ${req.url} from ${req.clientIp}`);
        console.log(req.headers)
        console.log(`user=${JSON.stringify(req.user)}`)
        console.log(`client=${JSON.stringify(req.reqClient)}`)
        next();
    };
}