import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IMission } from '../models/Mission';

const MissionSchema = new Schema<IMission>({
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

  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
});

export const Mission = model('Mission', MissionSchema);
