import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../utils/appError.util";
import type { AppErrorRes } from "../types/appError.type";


export const GlobalErrorHandler = (err:AppError, req:Request, res:Response, next:NextFunction) => {
    const statusCode = err.statusCode || 500;
    
    const appError:AppErrorRes<string> = {
        success:false,
        statusCode:statusCode,
        msg: err.message,
    }

    return res.status(statusCode).json(appError);
}