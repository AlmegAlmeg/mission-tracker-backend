import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { registerSchema } from '../utils/validations';

const router = Router();

router.post('/new-user', async (req, res) => {
  try {
    const response = registerSchema.safeParse(req.body);
  } catch (error) {
    logError(error);
    console.log(`Error connecting to database. \n${error}`);
  }
});

export { router as GlobalRouter };
