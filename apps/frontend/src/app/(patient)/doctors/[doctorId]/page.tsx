"use client";

import EmptyResult from "@/components/placeholders/empty-results";
import { useDoctorsFetch } from "@/fetch/doctors/doctors.fetch";
import { ErrorResponse } from "@repo/shared";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import DoctorImage from "@/assets/images/doctor.png";
import Image from "next/image";
import { User } from "@repo/db";
import {
  Briefcase,
  CalendarCheck,
  CircleDollarSign,
  CircleGauge,
  Hospital,
  LocateIcon,
  Mail,
  MapPin,
  Shell,
} from "lucide-react";

import { customIcon } from "@/components/map/custom-icons";
import dynamic from "next/dynamic";
import { Rating } from "@/components/rating";
import LargeLoader from "@/components/loaders/large-loader";
import { useAppointmentFetch } from "@/fetch/appointments/appointment.fetch";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { ButtonDialog } from "@/components/buttons-popups/buttons-popups";
import CreateAppointment from "../../_forms/create-appointment.form";
const MultiPointMap = dynamic(() => import("@/components/map/multi-point"), {
  ssr: false,
});

function page({ params }: { params: Promise<{ doctorId: number }> }) {
  const [doctorId, setDoctorId] = useState<number>();

  const { useGetOneDoctor } = useDoctorsFetch();
  const { data, error, isError, refetch, isSuccess, isLoading } =
    useGetOneDoctor(doctorId ?? 0, false);

  useEffect(() => {
    params.then((result) => {
      setDoctorId(result.doctorId);
      refetch();
    });
  }, []);

  useEffect(() => {
    console.log(error);
    if (isError && error)
      toast.error(
        error.fullMessage instanceof ErrorResponse
          ? "Validation Input Error"
          : error.fullMessage
      );
  }, [error, isError]);

  const showContent = () => {
    if (data && isSuccess) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-4">
          <div className="flex flex-row gap-5 items-center">
            <Image src={DoctorImage} alt="" width={100} height={100} />
            <h1 className="text-5xl text-ellipsis">{data!.name}</h1>
            {data!.rating && (
              <Rating rate={data!.rating!} showScore className="mt-4" />
            )}
          </div>
          <ButtonDialog
            actionStatus={{ status: "Create" }}
            dialogProps={{
              title: "Create An Appointment",
              content: <CreateAppointment doctor={data!} />,
            }}
            buttonProps={{ content: "Make Appointment" }}
          />

          <div className="mt-6 flex flex-col justify-start items-start gap-3 ml-5">
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <p>Email: {data!.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <CircleGauge size={20} />
              <p>Experience: {data!.experience}</p>
            </div>

            <div className="flex items-center gap-2">
              <CalendarCheck size={20} />
              <p>Available Days: {data!.availableDays.join("-")}</p>
            </div>

            <div className="flex items-center gap-2">
              <CircleDollarSign size={20} />
              <p>Fee: {data!.fee}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Hospital size={20} />
              <p>Hospital: {data!.hospital}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Briefcase size={20} />
              <p>Specialty: {data!.specialty}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Shell size={20} />
                <p>Bio:</p>
              </div>
              <p className="p-2 border mt-2">{data!.bio}</p>
            </div>
          </div>

          {data?.location && (
            <>
              <div className="mt-8 ml-4 mb-2 flex gap-2 items-center">
                <MapPin size={20} />
                <p>Location</p>
              </div>
              <MultiPointMap
                center={{ lat: data.location[0], lng: data.location[1] }}
                zoom={13}
                markers={[
                  {
                    position: data.location,
                    icon: customIcon({
                      iconUrl:
                        "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                      iconAnchor: [20, 40],
                      iconSize: [40, 40],
                      popupAnchor: [0, -40],
                    }),
                  },
                ]}
              />
            </>
          )}
        </div>
      );
    } else if (isLoading) {
      return <LargeLoader />;
    } else if (!data) {
      return <EmptyResult imageUrl={DoctorImage} message="No Result" />;
    }
  };

  return <div className="w-[700px] mx-auto">{showContent()}</div>;
}

export default page;
