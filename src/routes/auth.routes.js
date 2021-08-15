const { Router } = require('express');
const { AuthController } = require('../controllers');

const authRouter = new Router();

authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.get('/isAuthenticated', AuthController.isAuthenticated);

authRouter.post('/forgot-password', AuthController.forgotPassword);

authRouter.put('/reset-password', AuthController.resetPassword);

module.exports = authRouter;
