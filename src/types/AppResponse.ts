import express from "express";

export type AppError =  {
  isAppError?: boolean;
  code?: number;
  type?: string;  
};

export type AppResponse = express.Response & AppError