import express from "express"

export default function LogResponse() {

    return function(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('AfterHook middleware triggered');
        //console.log(`req=${JSON.stringify(req.body)}`);
        //console.log(`res=${JSON.stringify(res.body)}`);
        next();
    };
}