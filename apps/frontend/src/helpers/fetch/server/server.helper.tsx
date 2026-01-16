"use client";
import { Spinner } from "@/components/ui/spinner";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HttpError } from "../../errors/exceptions/http.exception";
import { ErrorResponse } from "@repo/shared";

export function errorValidationInputToast(shadcnUiToast: any, err: any) {
  console.log(err);
  shadcnUiToast({
    className: "p-4 pb-6",
    duration: Infinity,
    title: "Details:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(err)}</code>
      </pre>
    ),
  });
}

export function errorToast(err: HttpError<ErrorResponse | string> | null) {
  if (!!err) {
    toast.error("Failed", {
      description:
        err.fullMessage instanceof ErrorResponse
          ? "Input Validation  Error"
          : err.fullMessage,
      className: "rounded-md",
    });
  } else {
    toast.error("Unknown error");
  }
}

export function successToast(description: string) {
  toast.success("Success", {
    description,
    className: "rounded-md",
  });
}

type TLoadingToast = {
  message: string;
  buttonActionProps?: { label?: string; action: () => void };
};
export function loadingToast({ message, buttonActionProps }: TLoadingToast) {
  return toast.info(message, {
    ...(buttonActionProps && {
      action: {
        label: buttonActionProps.label ?? "cancel",
        onClick: buttonActionProps.action,
      },
    }),
    closeButton: true,
    duration: Infinity,
    icon: <Spinner color={`#509CE7`} size={"extraSmall"} />,
    className: "rounded-md",
  }) as number;
}

export function checkIfCashedData<T>(
  queryClient: QueryClient,
  modelNameAsPlural: string,
  page: number
) {
  return queryClient.getQueryData<T[]>(
    page !== 0 ? [modelNameAsPlural, page] : [modelNameAsPlural]
  );
}
