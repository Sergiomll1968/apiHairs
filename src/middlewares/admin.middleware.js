import * as bookingsService from '../api/bookings/bookings.service.js';

function unauthorized(res) {
  res.status(401);
  res.json('Unauthorized');
}

function middlewareAdmin(req, res, next, { allowOwnUser = false, collection = undefined }) {
  let isOwnUser = false;
  if (allowOwnUser) {
    if (collection === 'bookings') {
      const booking = req.params.id ? bookingsService.getById(req.params.id) : req.body;
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
