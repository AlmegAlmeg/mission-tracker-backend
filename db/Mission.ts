import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const MissionSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid(),
  },

  title: {
    type: String,
    required: true,
  },

  description: String,

  estimation: Number,

  logs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TimeLog',
    },
  ],

  assignedTo: {
    type: Schema.Types.ObjectId || null,
    ref: 'User',
    default: null,
  },

  tags: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  },

  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },

  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

export const Mission = model('Mission', MissionSchema);
