import type { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User"; // or your user type
import type { JwtUser } from "./jwtUser.type";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // or JwtPayload, string, etc.
    }
  }
}

export {};