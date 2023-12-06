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

export const projectSchema = z.object({
  name: z.string(),
});

export const tagSchema = z.object({
  id: z.string(),
  content: z.string(),
  bgColor: z.string(),
});

export const timeLogSchema = z.object({
  time: z.number().min(1),
  tag: tagSchema.optional(),
  description: z.string(),
});

export const listSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  estimation: z.number().optional(),
  assignedTo: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const missionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  estimation: z.number().optional(),
  assignedTo: z.string().optional(),
});
