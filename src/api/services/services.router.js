import Router from 'express';
import * as servicesController from './services.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/all', servicesController.getAll);

router.post('/', admin, servicesController.create);

router.patch('/archive/:id', admin, servicesController.archive);
router.patch('/:id', admin, servicesController.update);

export default router;
