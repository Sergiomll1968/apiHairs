import unauthorized from './auth.middleware.js';
import * as bookingsService from '../api/bookings/bookings.service.js';

function middlewareAdmin(req, res, next, { allowOwnUser = false, collection = undefined }) {
  let isOwnUser = false;
  if (allowOwnUser) {
    if (collection === 'bookings') {
      const booking = bookingsService.getById(req.params.id);
      isOwnUser = booking.userId.toString() === req.user._id.toString();
    } else {
      isOwnUser = req.user._id.toString() === req.params.id;
    }
  }
  if (req.user.rol === 'admin' || (allowOwnUser && isOwnUser)) {
    next();
    return;
  }
  unauthorized(res);
}

export default middlewareAdmin;
