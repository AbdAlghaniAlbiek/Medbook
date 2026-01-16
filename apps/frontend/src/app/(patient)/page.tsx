"use client";

import { useDoctorsFetch } from "@/fetch/doctors/doctors.fetch";
import React, { useEffect, useState } from "react";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { DoctorSpecialty, User } from "@repo/db";
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
import Doctor from "./_components/doctor";
import { cn } from "@/lib/utils";
import { Select } from "@/components/select/select";

function page() {
  const [specialty, setSpecialty] = useQueryState<DoctorSpecialty>(
    "specialty",
    parseAsStringEnum<DoctorSpecialty>(
      Object.values(DoctorSpecialty)
    ).withDefault(DoctorSpecialty.General)
  );

  const [page, setPage] = useState(1);
  const [limit, _] = useState(20);

  const { useGetPaginatedDoctors } = useDoctorsFetch();
  const { data, error, isError, isLoading, refetch } = useGetPaginatedDoctors(
    {
      filter: { specialty } as any,
      order: { field: "createdAt", direction: "asc" },
      pagination: { page, limit },
    },
    true
  );

  useEffect(() => {
    if (isError)
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
          <Select
            disabled={false}
            label="Specialty"
            placeholder="Select Specialty"
            value={specialty}
            onValueChange={(val: string) => {
              setSpecialty(val as DoctorSpecialty);
              refetch();
            }}
            groups={[
              {
                items: Object.values(DoctorSpecialty).map((role) => ({
                  content: role,
                  value: role,
                })),
              },
            ]}
          />

          <div className="flex flex-row mx-auto gap-6 mt-4">
            <div className="flex flex-col gap-2">
              {new Array(pages).fill(0).map((_, i) => (
                <div
                  key={i}
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
              {data.entities.map((doctor) => (
                <Doctor key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      );
    } else if (isLoading) {
      return <LargeLoader />;
    } else {
      return (
        <div>
          <Select
            disabled={false}
            label="Specialty"
            placeholder="Select Specialty"
            value={specialty}
            onValueChange={(val: string) =>
              setSpecialty(val as DoctorSpecialty)
            }
            groups={[
              {
                items: Object.values(DoctorSpecialty).map((role) => ({
                  content: role,
                  value: role,
                })),
              },
            ]}
          />
          <EmptyResult imageUrl={DoctorImage} message="No Doctors Found" />
        </div>
      );
    }
  };

  return <div className="w-[700px] mx-auto">{showContent()}</div>;
}

export default page;
