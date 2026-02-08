import  express from 'express';
import authController from '../controllers/auth.controller.js';
import projectController from '../controllers/project.controller.js';
const router = express.Router();
router.post('/auth/login',authController.login )
router.get('/projects', projectController.getProjects)
router.post('/projects', projectController.addNewProject);
router.delete('/projects/:id',projectController.deleteProject)
router.put('/projects/:id', projectController.editProject)
export default router;