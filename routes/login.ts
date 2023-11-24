import { Router } from 'express';
import { loginSchema, registerSchema } from '../utils/validations';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { User } from '../db/User';
import { parseErrors } from '../utils/parseErrors';
import { logError } from '../utils/consoleMessage';

const router = Router();

/* Login */
router.post('/login', async (req, res) => {
  try {
    const response = loginSchema.safeParse(req.body);
    if (!response.success) throw parseErrors(response.error);

    const { email } = response.data;

    const users = await User.find({ email });
    if (users.length === 0) throw 'No user found';

    const token = jwt.sign(email, process.env.JWT_SECRET!);

    return res.json({ success: true, token });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

/* Register */
router.post('/register', async function (req, res) {
  try {
    const response = registerSchema.safeParse(req.body);
    if (!response.success) throw parseErrors(response.error);

    const { email, firstName, lastName, avatar } = response.data;

    const existingUser = await User.find({ email });
    if (existingUser.length !== 0) throw `Email ${email} is already registered`;

    const user = new User({ id: uuid(), email, firstName, lastName });
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error: JSON.stringify(error) });
  }
});

export { router as LoginRouter };
