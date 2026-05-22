import {hash, compare} from 'bcrypt';

const salt = 10;

export const PasswordEncoder = async (password:string)=>{
    return await hash(password, salt);    
}

export const VerifyPassword = async (hashedPassword:string,password:string)=>{
    return await compare(password, hashedPassword)
}
