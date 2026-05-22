import {Router} from 'express';
import { LoginController, ProfileController, RegisterController } from '../controllers/auth.controller';
import { JwtHandler } from '../middlewares/jwt.middleware';


const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/profile", JwtHandler, ProfileController);

export default router;