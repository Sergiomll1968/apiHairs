import * as bookingsRepository from './bookings.repository.js';

export async function getByDate({ date }) {
  const activeUsers = await bookingsRepository.getByDate({ date });
  return activeUsers;
}

export async function create({ bookingData }) {
  const newBooking = await bookingsRepository.create({ bookingData });
  return newBooking;
}

export async function archive({ id }) {
  const activeUsers = await bookingsRepository.archive({ id });
  return activeUsers;
}

export async function update({ id, bookingData }) {
  const updatedBooking = await bookingsRepository.update({ id, bookingData });
  return updatedBooking;
}

export async function getById({ id }) {
  const booking = await bookingsRepository.getById({ id });
  return booking;
}
