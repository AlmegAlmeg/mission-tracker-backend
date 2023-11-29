import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { User } from '../db/User';
import { logError } from '../utils/consoleMessage';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { token } = req.headers;
    if (!token) throw 'Request must contain a token';

    const email = jwt.decode(token.toString());
    if (email === null) throw 'Unauthenticated';

    const users = await User.find({ email }).select({
      _id: true,
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      timeLogs: true,
      avatar: true,
      role: true,
    });

    if (!users.length) throw 'Unauthenticated';

    req.currentUser = users[0];
    next();
  } catch (error) {
    logError(`${error}`);
    return res.status(403).json({ success: false, error });
  }
};
