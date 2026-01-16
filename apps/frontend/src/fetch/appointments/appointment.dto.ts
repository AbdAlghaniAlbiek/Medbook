import { AppointmentSchema } from "@repo/shared";
import { z } from "zod";

export type AppointmentCreateDto = z.infer<typeof AppointmentSchema>;

export type AppointmentCreateProps = keyof AppointmentCreateDto;
