import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { timeLogSchema } from '../utils/validations';
import { parseErrors } from '../utils/parseErrors';
import { TimeLog } from '../db/TimeLog';
import userMiddleware from '../middleware/userMiddleware';
import { Mission } from '../db/Mission';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const timeLogs = await TimeLog.find({}).populate('createdBy');
    return res.json({ success: true, timeLogs });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

router.post('/:missionId', userMiddleware, async (req, res) => {
  try {
    const { missionId } = req.params;
    if (!missionId) throw 'Mission ID is required';

    const response = timeLogSchema.safeParse(req.body);
    if (!response.success) throw parseErrors(response.error);

    const { data } = response;

    const mission = await Mission.findOne({ id: missionId });
    if (!mission) throw 'Mission not found';

    const timeLog = new TimeLog({
      ...data,
      mission: missionId,
      project: mission.project,
      createdBy: req.currentUser!._id,
    });

    mission.logs.push(timeLog._id);

    await timeLog.save();
    await mission.save();

    return res.json({ success: true, data });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as TimeLogRouter };
