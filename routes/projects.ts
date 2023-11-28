import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { Project } from '../db/Project';
import { projectQuery } from '../utils/queries';
import { projectSchema } from '../utils/validations';
import { parseErrors } from '../utils/parseErrors';
import { v4 as uuid } from 'uuid';
import { Collection } from '../db/Collection';
import userMiddleware from '../middleware/userMiddleware';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().select(projectQuery).populate('collections').exec();

    return res.json({ success: true, projects });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) throw 'Slug is required';

    const project = await Project.findOne({ slug }).select(projectQuery);

    if (project === null) throw 'No project found';

    return res.json({ success: true, project });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

router.post('/', userMiddleware, async (req, res) => {
  try {
    const response = await projectSchema.safeParseAsync(req.body);
    if (!response.success) throw parseErrors(response.error);

    const { name } = response.data;

    const slug = name.toLowerCase().replaceAll('- ', '').replaceAll(' ', '-');

    const existingProject = await Project.findOne({ slug });
    if (existingProject) throw 'Project already exists';

    const project = new Project({
      id: uuid(),
      name,
      slug,
    });

    const collection = new Collection({
      id: uuid(),
      title: 'Completed',
      missions: [],
      project: project._id,
    });

    await project.save();
    await collection.save();

    return res.json({ success: true, project });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as ProjectsRouter };
