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

  slug: {
    type: String,
    unique: true,
  },

  collections: [
    {
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

          tag: {
            type: Schema.Types.ObjectId || undefined,
            ref: 'Tag',
          },
        },
      ],
    },
  ],
});

ProjectSchema.pre('save', function () {
  this.slug = this.name.toLowerCase().replaceAll('- ', '').replaceAll(' ', '-');
  this.collections.push({ id: uuid(), title: 'Completed', missions: [] });
});

export const Project = model('Project', ProjectSchema);
