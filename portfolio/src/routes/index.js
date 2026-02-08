import  express from 'express';
import authController from '../controllers/auth.controller.js';
import projectController from '../controllers/project.controller.js';
const router = express.Router();
router.post('/auth/login',authController.login )
router.get('/projects', projectController.getProjects)
export default router;