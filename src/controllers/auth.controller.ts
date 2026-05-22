import type {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import { db } from '../config/db.config';
import { users } from '../schemas/users.schema';
import { candidates } from '../schemas/candidate.schema';
import type {RegisterBody} from '../types/registerBody.type';
import { employers } from '../schemas/employer.schema';
import { AppError } from '../utils/appError.util';
import type { AppRes } from '../types/appRes.type';
import { PasswordEncoder } from '../utils/passwordEncoder.util';

export const RegisterController = asyncHandler( async (req:Request<{}, {}, RegisterBody>, res:Response)=>{
    const {
        // users
        name, email, password, role, 
        // candidate 
        skills, experience,
        company_name, industry 
    } =  req.body;

    
    
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
        throw new AppError(401, "Transaction failed");
    });

    const appRes:AppRes<any> = {
        success:true,
        statusCode:201,
        t:result
    }
    res.json(appRes);
     

});