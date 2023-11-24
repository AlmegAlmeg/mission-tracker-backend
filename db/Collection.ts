import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { ICollection } from '../models/Collection';

const CollectionSchema = new Schema<ICollection>({
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
});

export const Collection = model('Collection', CollectionSchema);
