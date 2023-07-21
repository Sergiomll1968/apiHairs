import Router from 'express';
import * as usersController from './users.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/all', admin, usersController.getAll);
router.get(
  '/:id',
  (req, res, next) => admin(req, res, next, { allowOwnUser: true, collection: 'users' }),
  usersController.getById,
);

router.post('/changepasswordrequest', usersController.changePasswordRequest);
router.post('/changepassword/:token', usersController.changePassword);

router.patch(
  '/:id',
  (req, res, next) => admin(req, res, next, { allowOwnUser: true, collection: 'users' }),
  usersController.patchId,
);

router.post('/getusernamebytoken', usersController.getUsernameByToken);

export default router;
