import { Router } from 'express';
import authController from '../controllers/auth.controller.js';


const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
