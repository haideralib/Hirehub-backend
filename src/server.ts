import express from 'express';
import authRoutes  from './routes/auth.route';
import { GlobalErrorHandler } from './middlewares/globalError.middleware';

const app = express();
const PORT = 5000;
app.use(express.json());




app.use("/api/auth", authRoutes);


// Error Middlewares  
app.use(GlobalErrorHandler);

app.listen(PORT, ()=> console.log("Server is running on PORT: ", PORT));

