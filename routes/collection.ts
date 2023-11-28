import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { Collection } from '../db/Collection';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Collection.find();

    return res.json({ success: true, projects });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as CollectionsRouter };
