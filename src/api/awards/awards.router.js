import Router from 'express';
import * as awardsController from './awards.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/all', awardsController.getAll);

router.post('/', admin, awardsController.create);

router.patch('/archive/:id', admin, awardsController.archive);
router.patch('/:id', admin, awardsController.update);

export default router;
