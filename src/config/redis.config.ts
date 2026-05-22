import {createClient} from 'redis';
import 'dotenv/config';




export const client = createClient({
        url: process.env.REDIS_URL!
    });

    client.on("error", (err)=> console.log("Redis Error: ", err));

    client.connect();
    
    console.log("Redis is running...");