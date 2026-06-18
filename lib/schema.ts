import { z } from "zod";

export const estimatorSchema = z.object({
  scope: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  details: z.string().max(1000, "Keep it under 1000 characters").optional(),
});

export type EstimatorValues = z.infer<typeof estimatorSchema>;
