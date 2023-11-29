import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { listSchema } from '../utils/validations';
import { parseErrors } from '../utils/parseErrors';
import userMiddleware from '../middleware/userMiddleware';
import { List } from '../db/List';
import { Mission } from '../db/Mission';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find({}).populate('assignedTo').populate('tags');
    return res.json({ success: true, missions });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

router.post('/:listId', userMiddleware, async (req, res) => {
  try {
    const { listId } = req.params;
    if (!listId) throw 'Mission ID is required';

    const response = listSchema.safeParse(req.body);
    if (!response.success) throw parseErrors(response.error);

    const { data } = response;

    const list = await List.findOne({ id: listId });
    if (!list) throw 'Mission not found';

    const mission = new Mission({
      ...data,
      list: listId,
      project: list.project,
    });

    await mission.save();
    list.missions.push(mission._id);
    await list.save();

    return res.json({ success: true, mission });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as MissionsRouter };
