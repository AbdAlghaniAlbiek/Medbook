import {
  DoctorExperience,
  DoctorSpecialty,
  User,
  UserRole,
} from "@prisma/client";

export const users = [
  {
    id: 1,
    name: "Dr. Ahmad",
    email: "ahmad@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Doctor" as UserRole,
    experience: "Advanced" as DoctorExperience,
    phoneNumber: "963987745621",
    availableDays: ["Tuesday", "Monday", "Saturday"],
    bio: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    location: [36.2021, 37.1343],
    specialty: "General" as DoctorSpecialty,
    hospital: "Aleppo",
    rating: 5,
    fee: 100,
  },
  {
    id: 2,
    name: "Dr. Mohammad",
    email: "mohammad@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Doctor" as UserRole,
    experience: "Intermediate" as DoctorExperience,
    phoneNumber: "963987745622",
    availableDays: ["Tuesday", "Monday", "Saturday"],
    bio: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    location: [36.2021, 37.1343],
    specialty: "General" as DoctorSpecialty,
    hospital: "Aleppo",
    rating: 4,
    fee: 75,
  },
  {
    id: 3,
    name: "Dr. Yaseen",
    email: "yaseen@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Doctor" as UserRole,
    experience: "Beginner" as DoctorExperience,
    phoneNumber: "963987745822",
    availableDays: ["Tuesday", "Monday", "Saturday"],
    bio: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    location: [36.2021, 37.1343],
    specialty: "General" as DoctorSpecialty,
    hospital: "Aleppo",
    rating: 2,
    fee: 50,
  },
  {
    id: 4,
    name: "Dr. Mahmoud",
    email: "mahmoud@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Doctor" as UserRole,
    experience: "Advanced" as DoctorExperience,
    phoneNumber: "963989845822",
    availableDays: ["Tuesday", "Monday", "Saturday"],
    bio: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    location: [36.2021, 37.1343],
    specialty: "General" as DoctorSpecialty,
    hospital: "Aleppo",
    rating: 5,
    fee: 300,
  },
  {
    id: 5,
    name: "Dr. Yusef",
    email: "yusef@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Doctor" as UserRole,
    experience: "Advanced" as DoctorExperience,
    phoneNumber: "963977845822",
    availableDays: ["Tuesday", "Monday", "Saturday"],
    bio: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    location: [36.2021, 37.1343],
    specialty: "General" as DoctorSpecialty,
    hospital: "Aleppo",
    rating: 5,
    fee: 600,
  },

  // Patients
  {
    id: 6,
    name: "Amjad",
    email: "amjad@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Patient" as UserRole,
    phoneNumber: "963987545822",
  },
  {
    id: 7,
    name: "Sarah",
    email: "sarah@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Patient" as UserRole,
    phoneNumber: "963987845882",
  },
  {
    id: 8,
    name: "Karim",
    email: "karim@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Patient" as UserRole,
    phoneNumber: "963987849882",
  },
  {
    id: 9,
    name: "Abdo",
    email: "abdo@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Patient" as UserRole,
    phoneNumber: "963987849887",
  },
  {
    id: 10,
    name: "Loai",
    email: "loai@gmail.com",
    password: "$2b$10$lK/XMSmxbZBSmArnP/32B.RlWmvvrBGUDsGuUpR.vynDZsmLudcXy", //Test1234
    role: "Patient" as UserRole,
    phoneNumber: "963987849387",
  },
];
