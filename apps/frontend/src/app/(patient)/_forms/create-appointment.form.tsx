import {
  FormFields,
  FormTextArea,
} from "@/components/forms-components/forms-components";
import { FormField } from "@/components/ui/form";
import {
  AppointmentCreateDto,
  AppointmentCreateProps,
} from "@/fetch/appointments/appointment.dto";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@repo/db";
import { AppointmentSchema, ErrorResponse } from "@repo/shared";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useAppointmentFetch } from "@/fetch/appointments/appointment.fetch";
import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import { toast } from "sonner";

interface ICreateAppointment {
  doctor: User;
}
function CreateAppointment({ doctor }: ICreateAppointment) {
  const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { useCreateAppointment } = useAppointmentFetch("Patient");
  const appointmentCreateMutation = useCreateAppointment(0);

  const createAppointmentForm = useForm<AppointmentCreateDto>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      patientPhone: auth.phoneNumber ?? "",
      assignedToId: doctor.id,
      date: new Date().toISOString(),
      time: dayjs(new Date(), "HH:MM").toString(),
      patientEmail: auth.email,
      patientName: auth.name,
    },
  });

  const [errors, setErrors] = useState<
    { [k in AppointmentCreateProps]: string[] } | undefined
  >(undefined);

  const onSubmit = (data: AppointmentCreateDto) => {
    setIsButtonDisabled(true);
    appointmentCreateMutation.mutateAsync(
      {
        patientPhone: auth.phoneNumber ?? "",
        assignedToId: doctor.id,
        date: new Date().toISOString(),
        time: dayjs(new Date(), "HH:MM").toString(),
        patientEmail: auth.email!,
        patientName: auth.name!,
        reason: data.reason,
      },
      {
        onSuccess(data, variables, onMutateResult, context) {
          setIsButtonDisabled(false);
          toast.success("You assigned an appointment to this doctor");
        },
        onError(error, variables, onMutateResult, context) {
          setIsButtonDisabled(false);
          if (
            error instanceof HttpError &&
            error.fullMessage instanceof ErrorResponse
          ) {
            setErrors(
              (error as HttpError<ErrorResponse>).fullMessage.error as any
            );
          }
        },
      }
    );
  };

  return (
    <div>
      <FormFields
        form={createAppointmentForm}
        buttonProps={{
          buttonStretch: "w-fit",
          content: "Submit",
          isDisabled: isButtonDisabled,
        }}
        gapY="gap-y-3"
        onSubmit={onSubmit}
        fields={[
          () => (
            <FormTextArea
              key="reason"
              name="reason"
              control={createAppointmentForm.control}
              required={true}
              errors={errors?.reason}
              textArea={{
                placeholder: "Write your reason",
                label: "Reason",
                height: 100,
                maxHeight: 150,
              }}
            />
          ),
        ]}
      />
    </div>
  );
}

export default CreateAppointment;
