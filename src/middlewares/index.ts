import express from "express";
import cors from "cors";

export {default as InitRequest} from "./InitRequest"
export {default as SendResponse} from "./SendResponse"

export const JSON = express.json;

export const UrlEncoded = (opts:boolean | object) => {
	if(typeof opts === 'object' ) return express.urlencoded(opts);
	//default
	return express.urlencoded({extended: false})
}

export const Cors = (opts:boolean | object) => {
	return typeof opts !== "boolean" ? cors(opts): cors()
}