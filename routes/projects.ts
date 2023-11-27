import { Router } from "express";
import { logError } from "../utils/consoleMessage";
import { Project } from "../db/Project";
import { projectQuery } from "../utils/queries";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().select(projectQuery);

    return res.json({ success: true, projects });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) throw "Slug is required";

    const project = await Project.findOne({ slug }).select(projectQuery);

    if (project === null) throw "No project found";

    return res.json({ success: true, project });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as ProjectsRouter };
