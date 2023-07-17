import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const bookingSchema = new Schema({
  date: { type: Date, required: true },
  state: { type: String, required: true },
  // state -> pending, attended, cancelled, failed
  deleted: { type: Boolean, required: true, default: false },
  userId: { type: ObjectId, ref: 'User', required: true },
  serviceId: { type: ObjectId, ref: 'Service', required: true },
});

const bookingModel = model('Booking', bookingSchema);

export default bookingModel;
