"use client";

import { useDoctorsFetch } from "@/fetch/doctors/doctors.fetch";
import React, { useEffect, useState } from "react";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { toast } from "sonner";
import { ErrorResponse } from "@repo/shared";
import LargeLoader from "@/components/loaders/large-loader";
import EmptyResult from "@/components/placeholders/empty-results";
import DoctorImage from "@/assets/images/doctor.png";
import {
  GetSuccessResponse,
  IGetSuccessResponse,
} from "@/helpers/dto/response.dto";
import Image from "next/image";
import { Briefcase, CircleDollarSign, Hospital } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/select/select";
import { useAppointmentFetch } from "@/fetch/appointments/appointment.fetch";
import Appointment from "./_components/appointment";
import { convertOffsetToTimes } from "motion/react";

function page() {
  const [page, setPage] = useState(1);
  const [limit, _] = useState(20);

  const { useGetPaginatedAppointments } = useAppointmentFetch("Doctor");
  const { data, error, isError, isLoading, refetch } =
    useGetPaginatedAppointments(
      {
        order: { field: "createdAt", direction: "asc" },
        pagination: { page, limit },
      },
      true
    );

  useEffect(() => {
    if (isError && error)
      toast.error(
        error.fullMessage instanceof ErrorResponse
          ? "Validation Input Error"
          : error.fullMessage
      );
  }, [error, isError]);

  const calculatePages = data ? data?.meta.count / limit : 1;
  const pages =
    calculatePages % 1 != 0 ? Math.floor(calculatePages) + 1 : calculatePages;

  const showContent = () => {
    if (data && data?.entities?.length > 0) {
      return (
        <div>
          <div className="flex flex-row mx-auto gap-6">
            <div className="flex flex-col gap-2">
              {new Array(pages).fill(1, 1).map((_, i) => (
                <div
                  className={cn(
                    page === i + 1 ? "bg-primary text-white" : "",
                    "rounded-md p-2 border"
                  )}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 w-full">
              {data.entities.map((appointment) => (
                <Appointment
                  appointment={appointment}
                  refetch={refetch}
                  key={appointment.id}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else if (isLoading) {
      return <LargeLoader />;
    } else {
      return (
        <EmptyResult imageUrl={DoctorImage} message="No Appointments Found" />
      );
    }
  };

  return <div className="w-[700px] mx-auto">{showContent()}</div>;
}

export default page;
