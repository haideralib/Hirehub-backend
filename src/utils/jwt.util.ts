import "dotenv/config";
import jwt from 'jsonwebtoken';


const Access_Secrect = process.env.ACCESS_SECRECT;
const Access_ExpiresIn = "15m";
const Refresh_Secrect = process.env.REFRESH_SECRECT;
const Refresh_ExpiresIn = "7d"

export const AccessTokenGenerator = async (id:string, email:string, role:string)=>{
    return await jwt.sign(
        {id, email, role},
        Access_Secrect!,
        {
            expiresIn: Access_ExpiresIn
        }
    )
}

export const VerifyAccessToken = async (token:string) => {
    return await jwt.verify(token, Access_Secrect!);
}

export const RefreshTokenGenerator = async (id:string, email:string, role:string)=>{
    return await jwt.sign(
        {id, email, role},
        Refresh_Secrect!,
        {
            expiresIn: Refresh_ExpiresIn
        }
    )
}


