const { Router } = require('express');

const routes = Router();
const multer = require('multer')
const uploadConfig = require('../utils/upload')
const upload = multer(uploadConfig.MULTER)

const ProjectController = require('../controller/ProjectController');
const UserController = require('../controller/UserController');
const UniversityController = require('../controller/UniversityController');
const SessionController = require('../controller/SessionController');
const verifyToken = require('./ensureAuth');

const projectController = new ProjectController();
const userController = new UserController();
const universityController = UniversityController;

routes.post('/v1/user', userController.create);
routes.get('/v1/user', userController.get);

routes.post('/v1/sessions', SessionController.create);

routes.post('/v1/university', verifyToken, upload.single('image'), universityController.create);
routes.get('/v1/university', universityController.get);
routes.get('/v1/university/:id', universityController.index);

routes.post('/v1/project', verifyToken, upload.single('image'), projectController.create);
routes.get('/v1/project/:id', projectController.get);
routes.get('/v1/projects', projectController.index);

module.exports = routes;
