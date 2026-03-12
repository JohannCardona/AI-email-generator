import { Router } from 'express';
import { generateDrafts } from '../controllers/emailController.js';

const router = Router();

router.post('/generate', generateDrafts);

export default router;
