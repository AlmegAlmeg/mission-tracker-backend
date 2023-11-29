import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const TimeLogSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid(),
  },

  time: {
    type: Number,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const TimeLog = model('TimeLog', TimeLogSchema);
