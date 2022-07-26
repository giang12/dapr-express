import express from "express"
import { AppResponse } from "../types/AppResponse"

export default function(req:express.Request, res:express.Response, next:express.NextFunction) {
    console.log('Final immutable response handler triggered');

    let r:AppResponse = res.body;

    if(!r) return res.send();

    if(isError(r)) {
        //@TODO handle internal errors
        if(r.code && r.code < 100) return res.status(500).send(r);
        
        //app errors
        return res.status(r.code || 500).send(r);
    }

    //success
    return res.send(r);
};

function isError(r:AppResponse) {
    return !r || r.isAppError || (r.code && (r.code < 100 || r.code > 399));
}