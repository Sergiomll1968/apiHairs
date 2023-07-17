import Router from 'express';
import * as bookingsController from './bookings.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/day/:date', bookingsController.getByDate);

router.post(
  '/date',
  (req, res, next) => admin(req, res, next, { allowOwnUser: true, collection: 'bookings' }),
  bookingsController.create,
);

router.patch(
  '/archive/:id',
  (req, res, next) => admin(req, res, next, { allowOwnUser: true, collection: 'bookings' }),
  bookingsController.archive,
);

router.patch(
  '/:id',
  (req, res, next) => admin(req, res, next, { allowOwnUser: true, collection: 'bookings' }),
  bookingsController.update,
);

export default router;
