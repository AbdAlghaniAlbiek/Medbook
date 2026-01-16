import React from "react";
import DoctorImage from "@/assets/images/doctor.png";
import Image from "next/image";
import { User } from "@repo/db";
import { Briefcase, CircleDollarSign, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Rating } from "@/components/rating";

interface IDoctorProps {
  doctor: User;
}
function Doctor({ doctor }: IDoctorProps) {
  const router = useRouter();

  return (
    <div className="border rounded-xl flex flex-row gap-4 p-4 bg-white shadow-md">
      <div className="p-2 rounded-full border self-center">
        <Image
          width={80}
          height={80}
          src={DoctorImage}
          alt=""
          className="w-fit"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center mb-3">
          <p className="text-3xl">
            <b>{doctor.name}</b>
          </p>
          <Rating
            rate={doctor.rating!}
            showScore
            className="mr-auto scale-50"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Hospital size={20} />
          <p>Hospital: {doctor.hospital}</p>
        </div>

        <div className="flex gap-2 items-center">
          <Briefcase size={20} />
          <p>Specialty: {doctor.specialty}</p>
        </div>

        <div className="flex gap-2 items-center">
          <CircleDollarSign size={20} />
          <p>Fee: {doctor.fee}</p>
        </div>
      </div>

      <Button
        className="block ml-auto"
        size={"sm"}
        onClick={() => router.push(`/doctors/${doctor.id}`)}
      >
        Details
      </Button>
    </div>
  );
}

export default Doctor;
