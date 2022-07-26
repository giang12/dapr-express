import express from "express";

export default function removeXPowerBy() {
    return function(req: express.Request, res: express.Response, next: express.NextFunction) {
    	//res.setHeader( 'X-Powered-By', 'Awesome App v0.0.1' );
    	res.removeHeader("X-Powered-By");
    	next();
    }
}