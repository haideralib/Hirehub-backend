import type {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import { db } from '../config/db.config';
import { users } from '../schemas/users.schema';
import { candidates } from '../schemas/candidate.schema';
import type {RegisterBody} from '../types/registerBody.type';
import { employers } from '../schemas/employer.schema';
import { AppError } from '../utils/appError.util';
import type { AppRes } from '../types/appRes.type';
import { PasswordEncoder, VerifyPassword } from '../utils/passwordEncoder.util';
import { eq } from 'drizzle-orm';
import type { LoginRes } from '../types/loginRes.type';
import { AccessTokenGenerator, RefreshTokenGenerator } from '../utils/jwt.util';
import { client } from '../config/redis.config';
import type { JwtPayload } from 'jsonwebtoken';
import { getCandidateProfile, getEmployerProfile } from '../services/profile.service';

export const RegisterController = asyncHandler( async (req:Request<{}, {}, RegisterBody>, res:Response)=>{
    const {
        // users
        name, email, password, role, 
        // candidate 
        skills, experience,
        company_name, industry 
    } =  req.body;


    const emailCheck = (await db.select().from(users).where(eq(users.email, email)));

    if (emailCheck[0] != null) {
        throw new AppError(400, "Email already exists!");
    }

        const result = await db.transaction( async (tx) => {
            const user = await tx.insert(users).values({
                name:name,
                email:email,
                password: await PasswordEncoder(password),
                role:role
            }).returning();

            const userId = user[0]?.id as string;
        if (role === "candidate") {
             
            const candidate = await tx.insert(candidates).values({
                userId:userId,
               skills:skills,
               experience:experience ?? "",

            }).returning();  

            return {user, candidate:candidate[0]}   

        } else if(role === "company"){

        const result = await db.transaction(async (tx) => {
            const employeer = await tx.insert(employers).values({
                userId: userId,
                company_name:company_name ?? "",
                industry: industry ?? "",
            }).returning();

            return {user, employee: employeer[0]}
        });
    }
    }).catch((err) => {
        throw new AppError(400, "Transaction failed");
    });

    const appRes:AppRes<any> = {
        success:true,
        statusCode:201,
        t:result
    }
    res.json(appRes);  

});


export const LoginController = asyncHandler(async (req,res) => {
    const {email, password, rememberMe} = req.body;

    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];
    
    if(user == null) throw new AppError(401, "Your not found by email");
    
    const passwordCheck = await VerifyPassword(user.password, password);
   
    if(passwordCheck == false) throw new AppError(401, "Incorrect password!");

    const accessToken = await AccessTokenGenerator(user.id, user.email, user.role);
    const refreshToken = await RefreshTokenGenerator(user.id, user.email, user.role);

   await client.set(`refresh:${user.id}`,refreshToken, {
    EX: 7 * 24 * 60 * 60
   }); 

    const appRes:AppRes<LoginRes> = {
        success:true,
        statusCode:200,
        t:{
            token: accessToken 
        }
    }

    res.status(200).json(appRes);

});


export const  ProfileController = asyncHandler(async (req,res)=>{
    const user = req.user;
    
    let profile;
    
    if (user?.role === "candidate") {
        profile = await getCandidateProfile(user?.id);
    } else if (user?.role === "company"){
        profile = await getEmployerProfile(user?.id);
    }

    const appRes:AppRes<any> = {
        success:true,
        statusCode:200,
        t: profile
    }

    res.status(200).json(appRes);
});