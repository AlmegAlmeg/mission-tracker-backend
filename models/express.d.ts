import { UserType } from './UserType';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserType;
    }
  }
}
