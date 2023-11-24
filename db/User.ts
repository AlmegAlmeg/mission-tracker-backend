import { Schema, model } from 'mongoose';
import { IUser } from '../models/User';
import { v4 as uuid } from 'uuid';

const UserSchema = new Schema<IUser>({
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
  },

  timeLogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TimeLog',
    },
  ],
});

export const User = model('User', UserSchema);
