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
    type: Schema.Types.ObjectId || undefined,
    ref: 'User',
  },

  tags: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  },

  collection: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
  },

  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export const Mission = model('Mission', MissionSchema);
