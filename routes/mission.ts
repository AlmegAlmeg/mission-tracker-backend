import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { listSchema, missionSchema } from '../utils/validations';
import { parseErrors } from '../utils/parseErrors';
import userMiddleware from '../middleware/userMiddleware';
import { List } from '../db/List';
import { Mission } from '../db/Mission';
import { Socket } from 'socket.io';
import { SOCKET_MAP } from '../config/socketMap';
import { z } from 'zod';
import { Project } from '../db/Project';
import { getProjectBySlug } from './projects';
import { User } from '../db/User';

const router = Router();

export function missionHandler(socket: Socket) {
  socket.on(
    SOCKET_MAP.CREATE_MISSION,
    async (listId: string, body: z.infer<typeof missionSchema>) => {
      const projectSlug = await createMission(listId, body);
      if (!projectSlug) return;

      socket.emit(SOCKET_MAP.GET_PROJECT_BY_SLUG, getProjectBySlug(projectSlug));
    }
  );
}

async function createMission(listId: string, body: z.infer<typeof missionSchema>) {
  try {
    const response = missionSchema.safeParse(body);
    if (!response.success) throw parseErrors(response.error);

    const { data } = response;

    const list = await List.findOne({ id: listId });
    if (!list) throw 'Mission not found';

    const project = await Project.findById(list.project);
    if (!project) throw 'Project not found';

    const user = await User.findOne({ id: data.assignedTo });

    const mission = new Mission({
      ...data,
      assignedTo: user?._id,
      list: list._id,
      project: list.project,
    });

    await mission.save();
    list.missions.push(mission._id);
    await list.save();

    return project.slug;
  } catch (error) {
    logError(error);
    return null;
  }
}

// router.get('/', async (req, res) => {
//   try {
//     const missions = await Mission.find({}).populate('assignedTo').populate('tags');
//     return res.json({ success: true, missions });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });

// router.post('/:listId', userMiddleware, async (req, res) => {
//   try {
//     const { listId } = req.params;
//     if (!listId) throw 'Mission ID is required';

//     const response = listSchema.safeParse(req.body);
//     if (!response.success) throw parseErrors(response.error);

//     const { data } = response;

//     const list = await List.findOne({ id: listId });
//     if (!list) throw 'Mission not found';

//     const mission = new Mission({
//       ...data,
//       list: listId,
//       project: list.project,
//     });

//     await mission.save();
//     list.missions.push(mission._id);
//     await list.save();

//     return res.json({ success: true, mission });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });

export { router as MissionsRouter };
