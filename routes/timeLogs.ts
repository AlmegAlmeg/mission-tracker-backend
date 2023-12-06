import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { TimeLog } from '../db/TimeLog';
import { Mission } from '../db/Mission';
import { Socket } from 'socket.io';
import { SOCKET_MAP } from '../config/socketMap';

const router = Router();

export function timeLogHandler(socket: Socket) {
  socket.on(SOCKET_MAP.CREATE_TIME_LOG, async (missionId: string, time: number) => {
    createTimeLog(missionId, time);
  });
}

async function createTimeLog(missionId: string, time: number) {
  try {
    const mission = await Mission.findOne({ id: missionId });
    if (!mission) throw 'Mission not found';

    const timeLog = new TimeLog({
      time,
      mission: missionId,
      project: mission.project,
      // createdBy: mission.createdBy,
    });

    mission.logs.push(timeLog._id);

    await timeLog.save();
    await mission.save();

    return mission.project.toString();
  } catch (error) {
    logError(error);
    return null;
  }
}

// router.get('/', async (req, res) => {
//   try {
//     const timeLogs = await TimeLog.find({}).populate('createdBy');
//     return res.json({ success: true, timeLogs });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });

// router.post('/:missionId', userMiddleware, async (req, res) => {
//   try {
//     const { missionId } = req.params;
//     if (!missionId) throw 'Mission ID is required';

//     const response = timeLogSchema.safeParse(req.body);
//     if (!response.success) throw parseErrors(response.error);

//     const { data } = response;

//     const mission = await Mission.findOne({ id: missionId });
//     if (!mission) throw 'Mission not found';

//     const timeLog = new TimeLog({
//       ...data,
//       mission: missionId,
//       project: mission.project,
//       createdBy: req.currentUser!._id,
//     });

//     mission.logs.push(timeLog._id);

//     await timeLog.save();
//     await mission.save();

//     return res.json({ success: true, data });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });

export { router as TimeLogRouter };
