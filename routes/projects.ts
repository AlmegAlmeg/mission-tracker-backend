import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { Project } from '../db/Project';
import { projectQuery } from '../utils/queries';
import { Socket } from 'socket.io';
import { SOCKET_MAP } from '../config/socketMap';

const router = Router();

export async function projectsHandler(socket: Socket) {
  /* All projects */
  socket.on(SOCKET_MAP.GET_ALL_PROJECTS, async () => {
    const projects = await getAllProjects();
    socket.emit(SOCKET_MAP.GET_ALL_PROJECTS, projects);
  });

  /* Project by slug */
  socket.on(SOCKET_MAP.GET_PROJECT_BY_SLUG, async (slug: string) => {
    const project = await getProjectBySlug(slug);
    socket.emit(SOCKET_MAP.GET_PROJECT_BY_SLUG, project);
  });
}

export async function getAllProjects() {
  try {
    const projects = await Project.find().select(projectQuery).populate('lists').exec();

    return projects;
  } catch (error) {
    logError(error);
    return JSON.stringify(error);
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await Project.findOne({ slug }).select(projectQuery).populate('lists').exec();
    if (project === null) throw 'No project found';

    return project;
  } catch (error) {
    logError(error);
    throw error;
  }
}

export { router as ProjectsRouter };

// router.get('/', async (req, res) => {
//   try {
//     const projects = await Project.find().select(projectQuery).populate('lists').exec();

//     return res.json({ success: true, projects });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });

// router.get('/:slug', async (req, res) => {
//   try {
//     const { slug } = req.params;
//     if (!slug) throw 'Slug is required';

//     const project = await getProject(slug);
//     return res.json({ success: true, project });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });

// router.post('/', userMiddleware, async (req, res) => {
//   try {
//     const response = await projectSchema.safeParseAsync(req.body);
//     if (!response.success) throw parseErrors(response.error);

//     const { name } = response.data;

//     const slug = name.toLowerCase().replaceAll('- ', '').replaceAll(' ', '-');

//     const existingProject = await Project.findOne({ slug });
//     if (existingProject) throw 'Project already exists';

//     const project = new Project({
//       id: uuid(),
//       name,
//       slug,
//     });

//     await project.save();

//     return res.json({ success: true, project });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error: JSON.stringify(error) });
//   }
// });
