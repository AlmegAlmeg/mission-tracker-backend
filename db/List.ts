import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const ListSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid(),
  },

  title: {
    type: String,
    required: true,
  },

  missions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mission',
    },
  ],

  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export const List = model('List', ListSchema);
