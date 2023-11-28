import { Router } from "express";
import { logError } from "../utils/consoleMessage";
import { timeLogSchema } from "../utils/validations";
import { parseErrors } from "../utils/parseErrors";

const router = Router();

router.post("/:missionId", async (req, res) => {
  try {
    const { missionId } = req.params;
    if (!missionId) throw "Mission ID is required";

    const response = timeLogSchema.safeParse(req.body);
    if (!response.success) throw parseErrors(response.error);

    const { data } = response;

    return res.json({ success: true, data });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as TimeLogRouter };
