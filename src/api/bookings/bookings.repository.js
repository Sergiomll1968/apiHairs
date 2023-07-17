import bookingModel from './bookings.model.js';

export async function getByDate({ date }) {
  const dateToFind = new Date(Date.parse(date));
  const activeUsers = await bookingModel
    .find({ date: dateToFind, deleted: false })
    .lean();
  return activeUsers;
}

export async function create({ bookingData }) {
  const {
    date, state, userId, serviceId,
  } = bookingData;

  const newBooking = await bookingModel
    .create({
      date, state, userId, serviceId,
    });

  return newBooking;
}

export async function archive({ id }) {
  await bookingModel
    .findByIdAndUpdate({ _id: id }, { deleted: true }, { new: true })
    .lean();
  const activeUsers = await bookingModel
    .find({ deleted: false });
  return activeUsers;
}

export async function update({ id, bookingData }) {
  const updatedBooking = await bookingModel
    .findOneAndUpdate({
      _id: id,
    }, bookingData, { new: true })
    .lean();
  return updatedBooking;
}

export async function getById({ id }) {
  const booking = await bookingModel
    .findById(id)
    .lean();

  return booking;
}
