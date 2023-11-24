import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
});

export const registerSchema = z.object({
  firstName: z.string().min(2).max(10),
  lastName: z.string().min(2).max(10),
  email: z.string().email(),
  avatar: z.string().optional(),
});
