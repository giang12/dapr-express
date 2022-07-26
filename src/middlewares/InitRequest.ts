import  express  from "express"
import { AppResponse } from "../types/AppResponse"
/**
 * decorate req res
 * @param {express.Request}      req  [description]
 * @param {express.Response}     res  [description]
 * @param {express.NextFunction} next [description]
 */
export default function(req:express.Request, res:express.Response, next:express.NextFunction) {
    res.response = function response(obj:AppResponse) {
        res.body = obj;
    }
    next();
};

