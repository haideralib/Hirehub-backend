import express from 'express';
import authRoutes  from './routes/auth.route';

const app = express();
const PORT = 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, ()=> console.log("Server is running on PORT: ", PORT));