import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IProject } from '../models/Project';

const ProjectSchema = new Schema<IProject>({
  id: {
    type: String,
    required: true,
    default: uuid(),
  },

  name: {
    type: String,
    required: true,
  },

  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
  ],
});

ProjectSchema.pre('save', function () {
  this.collections.push({ id: uuid(), title: 'Completed', missions: [] });
});

export const Project = model('Project', ProjectSchema);
