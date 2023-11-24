import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { ITimeLog } from '../models/TimeLog';

const TagSchema = new Schema<ITimeLog>({
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

  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  },
});

export const Tag = model('Tag', TagSchema);
