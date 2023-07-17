import { Schema, model } from 'mongoose';

const awardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const awardModel = model('Award', awardSchema);

export default awardModel;
