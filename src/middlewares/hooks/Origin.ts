import express from "express";

export default function setOrigin() {
    return function(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.headers.origin = req.headers.origin || req.headers.host;
        next();
    }
}