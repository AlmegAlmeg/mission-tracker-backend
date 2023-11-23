import { Schema, model } from 'mongoose';
import { ITag } from '../models/Tag';
import { v4 as uuid } from 'uuid';

const TagSchema = new Schema<ITag>({
  id: {
    type: String,
    required: true,
    default: uuid(),
  },

  bgColor: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
});

export const Tag = model('Tag', TagSchema);
