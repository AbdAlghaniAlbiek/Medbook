import { PaginationSchema } from "@repo/shared";
import { z } from "zod";

export type EntityFilter = z.infer<typeof PaginationSchema>;
