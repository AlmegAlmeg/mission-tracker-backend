import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser?.isAdmin) throw 'Only admin can do this action';

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ status: false, error });
  }
};
