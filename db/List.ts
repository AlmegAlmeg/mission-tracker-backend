import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const ListSchema = new Schema({
  id: {
    type: String,
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

ListSchema.pre('save', function (next) {
  if (!this.id) this.id = uuid();
  next();
});

export const List = model('List', ListSchema);
