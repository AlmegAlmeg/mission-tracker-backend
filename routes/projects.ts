import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { Project } from '../db/Project';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .select(['id', 'name', 'slug', 'collections'])
      .populate({ path: 'collections', select: ['id', 'title', 'mission'] })
      .exec();
    return res.json({ success: true, projects });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as ProjectsRouter };
