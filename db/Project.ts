import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { List } from './List';

const ProjectSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid(),
  },

  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List',
    },
  ],
});

ProjectSchema.pre('save', async function () {
  const list = new List({ title: 'Completed', missions: [], project: this._id, id: uuid() });
  await list.save();
  this.lists.push(list._id);
});

export const Project = model('Project', ProjectSchema);
