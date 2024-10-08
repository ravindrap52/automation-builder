import { z } from "zod";

// form schema
export const nodeFormSchema = z.object({
  nodeName: z
    .string()
    .min(1, { message: "Node name is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Node name cannot be just spaces",
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
