import { z } from 'zod';

export const counterSchema = z.object({
  body: z.object({}).strict(),
  query: z.object({}).strict(),
  params: z.object({}).strict(),
});

export type CounterSchema = z.infer<typeof counterSchema>;