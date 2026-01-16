import { Appointment, AppointmentStatus } from "@prisma/client";

export const appointments = [
  {
    id: 1,
    assignedToId: 1,
    createdById: 6,
    date: new Date().toISOString(),
    time: "12:00",
    patientEmail: "amjad@gmail.com",
    patientPhone: "963987545822",
    patientName: "Amjad",
    reason:
      "lorem ipsum lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume v lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume",
    status: "Pending" as AppointmentStatus,
  },
  {
    id: 2,
    assignedToId: 1,
    createdById: 7,
    date: new Date().toISOString(),
    time: "12:00",
    patientEmail: "sarah@gmail.com",
    patientPhone: "963987845882",
    patientName: "Sarah",
    reason:
      "lorem ipsum lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume v lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume",
    status: "Pending" as AppointmentStatus,
  },
  {
    id: 3,
    assignedToId: 1,
    createdById: 8,
    date: new Date().toISOString(),
    time: "12:00",
    patientEmail: "karim@gmail.com",
    patientPhone: "963987849882",
    patientName: "Karim",
    reason:
      "lorem ipsum lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume v lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume lorem ipsume",
    status: "Pending" as AppointmentStatus,
  },
] as Appointment[];
