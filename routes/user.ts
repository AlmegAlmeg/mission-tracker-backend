import { Router } from 'express';
import { logError } from '../utils/consoleMessage';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!req.currentUser) throw 'Unknown user';
    return res.json({ success: true, user: req.currentUser });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as UserRouter };
