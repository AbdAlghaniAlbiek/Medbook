import { z } from "zod";

export const PaginationSchema = z.object({
  filter: z.optional(z.object({}).passthrough()),
  order: z.optional(
    z.object({
      field: z.string().default("createdAt").optional(),
      direction: z.string().default("desc").optional(),
    })
  ),
  pagination: z.optional(
    z.object({
      page: z.number().default(1).optional(),
      limit: z.number().default(30).optional(),
    })
  ),
});
