import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { List } from '../db/List';
import { Socket } from 'socket.io';
import { SOCKET_MAP } from '../config/socketMap';
import { listSchema } from '../utils/validations';
import { parseErrors } from '../utils/parseErrors';
import { Project } from '../db/Project';
import { getProjectBySlug } from './projects';

const router = Router();

export function listHandler(socket: Socket) {
  /* Create new list */
  socket.on(SOCKET_MAP.CREATE_LIST, async (slug: string, body: { title: string }) => {
    await createList(slug, body);

    const project = await getProjectBySlug(slug);
    socket.emit(SOCKET_MAP.GET_PROJECT_BY_SLUG, project);
  });
}

async function createList(slug: string, body: { title: string }) {
  try {
    const response = listSchema.safeParse(body);
    if (!response.success) throw parseErrors(response.error);

    const project = await Project.findOne({ slug });
    if (!project) throw 'Project not found';

    const list = new List({ project: project._id, title: response.data.title });

    await list.save();
    project.lists.unshift(list._id);
    await project.save();
  } catch (error) {
    logError(error);
  }
}

// router.get('/', async (req, res) => {
//   try {
//     const projects = await List.find();

//     return res.json({ success: true, projects });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });

export { router as ListsRouter };
