import { z } from "zod";

// form schema
export const nodeFormSchema = z.object({
  nodeName: z
    .string()
    .regex(/\S/, { message: "Node name cannot be just spaces" })
    .min(1, {
      message: "Node name is required",
    }),
});

// node schema
export const nodeSchema = z.object({
  id: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.object({
    label: z.string(),
  }),
  type: z.enum(["output", "input", "default"]),
  measured: z
    .object({
      width: z.number(),
      height: z.number(),
    })
    .optional(),
});
