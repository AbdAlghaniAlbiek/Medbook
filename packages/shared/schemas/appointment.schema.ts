import { z } from "zod";

export const AppointmentSchema = z.object({
  patientName: z.string(),
  patientEmail: z.email(),
  patientPhone: z.optional(z.string()),
  date: z.string().datetime(),
  time: z.string().min(4),
  reason: z.string().min(4).max(500),
  assignedToId: z.number(),
});
