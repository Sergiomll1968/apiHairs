import * as bookingsService from './bookings.service.js';

function validBooking(bookingDataToValidate) {
  const date = !Number.isNaN(Date.parse(bookingDataToValidate.date));
  const state = typeof bookingDataToValidate.state === 'string';
  const userId = typeof bookingDataToValidate.userId === 'string';
  const serviceId = typeof bookingDataToValidate.serviceId === 'string';
  return date && state && userId && serviceId;
}

export async function getByDate(req, res) {
  const { date } = req.params;
  const activeUsers = await bookingsService.getByDate({ date });
  res.json(activeUsers);
}

export async function create(req, res) {
  const bookingData = req.body;
  if (!validBooking(bookingData)) {
    res.status(500);
    res.json('Data validation error');
    return;
  }
  const newBooking = await bookingsService.create({ bookingData });
  res.json(newBooking);
}

export async function archive(req, res) {
  const { id } = req.params;
  const activeUsers = await bookingsService.archive({ id });
  res.json(activeUsers);
}

export async function update(req, res) {
  const { id } = req.params;
  const bookingData = req.body;
  if (!validBooking(bookingData)) {
    res.status(500);
    res.json('Data validation error');
    return;
  }
  const updatedBooking = await bookingsService.update({ id, bookingData });
  res.json(updatedBooking);
}
