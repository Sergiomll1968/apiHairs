import Router from 'express';

import awardsRouter from './awards/awards.router.js';
import bookingsRouter from './bookings/bookings.router.js';
import servicesRouter from './services/services.router.js';
import usersRouter from './users/users.router.js';

import * as authController from './auth/auth.controller.js';

const router = Router();

router.use('/awards', awardsRouter);
router.use('/bookings', bookingsRouter);
router.use('/services', servicesRouter);
router.use('/users', usersRouter);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/confirm/:emailtoken', authController.confirm);

export default router;
