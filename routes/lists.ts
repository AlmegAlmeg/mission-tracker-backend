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

  /* Update list */
  socket.on(
    SOCKET_MAP.UPDATE_LIST,
    async (projectSlug: string, listId: string, body: { title: string }) => {
      await updateList(listId, body);

      socket.broadcast.emit(SOCKET_MAP.GET_PROJECT_BY_SLUG, await getProjectBySlug(projectSlug));
    }
  );
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

async function updateList(listId: string, body: { title: string }) {
  try {
    const response = listSchema.safeParse(body);
    if (!response.success) throw parseErrors(response.error);

    await List.findOneAndUpdate({ id: listId }, { title: response.data.title });
  } catch (error) {
    logError(error);
  }
}

export { router as ListsRouter };
