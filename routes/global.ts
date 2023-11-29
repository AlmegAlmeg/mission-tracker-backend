import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { Tag } from '../db/Tag';
import { Avatars } from '../db/Avatar';
import { v4 as uuid } from 'uuid';
import { Project } from '../db/Project';
import { Mission } from '../db/Mission';
import { List } from '../db/List';

const router = Router();

router.get('/settings', async (req, res) => {
  try {
    const tags = await Tag.find().select({ id: true, content: true, bgColor: true, _id: false });
    const backgroundColors = tags.map((t) => t.bgColor);

    return res.json({ success: true, tags, backgroundColors, avatars: [...Avatars] });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error });
  }
});

router.post('/settings', async (req, res) => {
  try {
    const projects = [
      { id: uuid(), name: 'Albeer', collections: [] },
      { id: uuid(), name: 'Hamevakrim', collections: [] },
      { id: uuid(), name: 'Todo App - Support', collections: [] },
      { id: uuid(), name: 'Template Research', collections: [] },
    ];

    for (const project of projects) {
      const proj = new Project({
        id: uuid(),
        name: project.name,
        slug: project.name.toLowerCase().replaceAll('- ', '').replaceAll(' ', '-'),
        collections: [],
      });

      await proj.save();
    }

    return res.json({ success: true });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error });
  }
});

router.delete('/settings', async (req, res) => {
  try {
    await Project.deleteMany();
    await List.deleteMany();
    await Mission.deleteMany();

    return res.json({ success: true });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error });
  }
});

export { router as GlobalRouter };
