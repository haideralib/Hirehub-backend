import type { Request, Response,NextFunction } from "express";
import { AppError } from "../utils/appError.util";
import { VerifyAccessToken } from "../utils/jwt.util";
import type { JwtPayload } from "jsonwebtoken";



export const JwtHandler = async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        throw new AppError(401, "Invalid token!");
    }

    const token = authHeader.split(" ")[1]
    

    try {
        const user = await VerifyAccessToken(token!) as JwtPayload;
        req.user = user;
        next();
        
    } catch (error) {
        throw new AppError(401, "Invalid or Expired Token!");
    }
}