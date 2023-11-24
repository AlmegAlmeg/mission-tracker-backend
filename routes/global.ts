import { Router } from 'express';
import { logError } from '../utils/consoleMessage';
import { Tag } from '../db/Tag';
import { ITag } from '../models/Tag';

const router = Router();

router.get('/settings', async (req, res) => {
  try {
    const tags = await Tag.find().select({ id: true, content: true, bgColor: true, _id: false });
    const backgroundColors = tags.map((t) => t.bgColor);

    return res.json({ success: true, tags, backgroundColors });
  } catch (error) {
    logError(error);
    return res.json({ success: false, error });
  }
});

// router.post('/settings', async (req, res) => {
//   try {
//     const TAGS: Omit<ITag, 'id'>[] = [
//       { content: 'Pending for test', bgColor: '#1CEF00' },
//       { content: 'Testing', bgColor: '#B148E1' },
//       { content: 'Lunched', bgColor: '#335145' },
//       { content: 'Waiting for client', bgColor: '#4B3ACC' },
//       { content: 'Todo', bgColor: '#CC3A3A' },
//     ];

//     for (const { content, bgColor } of TAGS) {
//       const DBTag = new Tag({ content, bgColor });
//       await DBTag.save();
//     }

//     return res.json({ success: true });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error });
//   }
// });

// router.delete('/settings', async (req, res) => {
//   try {
//     await Tag.deleteMany();

//     return res.json({ success: true });
//   } catch (error) {
//     logError(error);
//     return res.json({ success: false, error });
//   }
// });

export { router as GlobalRouter };
