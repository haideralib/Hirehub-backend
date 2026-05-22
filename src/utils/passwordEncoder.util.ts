import {hash} from 'bcrypt';

const salt = 10;

export const PasswordEncoder = async (password:string)=>{
    return await hash(password, salt);    
}

