import { Appointment as AppointmentModel, AppointmentStatus } from "@repo/db";
import { PersonStanding, SatelliteDish, Timer } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookingImage from "@/assets/images/booking.png";
import dayjs from "dayjs";
import StackPanel from "@/components/ui/stack-panel";
import { useAppointmentFetch } from "@/fetch/appointments/appointment.fetch";
import { Button } from "@/components/ui/button";
import {
  ButtonDialog,
  ButtonPopover,
} from "@/components/buttons-popups/buttons-popups";

interface IAppointmentProps {
  appointment: AppointmentModel;
  refetch: any;
}
function Appointment({ appointment, refetch }: IAppointmentProps) {
  const { useConfirmAppointment, useRejectAppointment } =
    useAppointmentFetch("Doctor");
  const confirmAppointmentMutation = useConfirmAppointment(appointment.id);
  const rejectAppointmentMutation = useRejectAppointment(appointment.id);

  const onAccept = () => {
    confirmAppointmentMutation.mutateAsync(
      {},
      {
        onSuccess(data, variables, onMutateResult, context) {
          refetch();
        },
      }
    );
  };

  const onReject = () => {
    rejectAppointmentMutation.mutateAsync(
      {},
      {
        onSuccess(data, variables, onMutateResult, context) {
          refetch();
        },
      }
    );
  };

  const statusText = (status: AppointmentStatus) => {
    switch (status) {
      case "Pending":
        return <span className="text-yellow-500">{status}</span>;
        break;
      case "Accepted":
        return <span className="text-green-500">{status}</span>;
        break;
      case "Rejected":
        return <span className="text-red-500">{status}</span>;
        break;

      default:
        break;
    }
  };

  return (
    <div className="border rounded-xl flex flex-row gap-4 p-4 bg-white shadow-md">
      <div className="p-5 rounded-full border self-center">
        <Image
          width={60}
          height={60}
          src={BookingImage}
          alt=""
          className="w-fit"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <PersonStanding size={20} />
          <p>Patient: {appointment.patientName}</p>
        </div>

        <div className="flex gap-2 items-center">
          <Timer size={20} />
          <p>
            Date: {dayjs(appointment.date).format("DD-MM-YYYY")} -{" "}
            {appointment.time}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <SatelliteDish size={20} />
          <p>Status: {statusText(appointment.status!)}</p>
        </div>

        <div className="flex flex-row gap-3 items-center mt-4">
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={onAccept}
          >
            Accept
          </Button>
          <Button className="bg-red-500 hover:bg-red-600" onClick={onReject}>
            Reject
          </Button>
          <ButtonPopover
            actionStatus={{ status: "Read" }}
            popoverProps={{
              content: <div>{appointment.reason}</div>,
            }}
            buttonProps={{ content: "Reason" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Appointment;
