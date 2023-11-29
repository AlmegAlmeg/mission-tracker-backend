import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Avatars } from './Avatar';

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid(),
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  avatar: {
    type: String,
    required: true,
    default: Avatars[0],
  },

  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Moderator', 'Developer', 'Project Manager'],
    default: 'Developer',
  },

  timeLogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TimeLog',
    },
  ],
});

export const User = model('User', UserSchema);
