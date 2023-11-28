import z from "zod";
import { IProject } from "../models/Project";

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
  name: z.string().min(2).max(10),
});

export const tagSchema = z.object({
  id: z.string(),
  content: z.string(),
  bgColor: z.string(),
});

export const timeLogSchema = z.object({
  time: z.number().min(1),
  tag: tagSchema.optional(),
});
