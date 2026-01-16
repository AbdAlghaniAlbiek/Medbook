"use client";

import { cn } from "@/lib/utils";
import { Ellipsis, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import React, { Fragment, memo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { LogicError } from "@/helpers/errors/exceptions/login.exception";
import { SheetPlacement } from "../shared/sheet-props";
import {
  ButtonDirection,
  ButtonSize,
  RoundedButton,
} from "../shared/button-props";
import {
  IActualWidthScreenSizes,
  useActualWidth,
} from "@/hooks/use-actual-width";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type ActionStatusType = "Create" | "Update" | "Read" | "Other"; // Don't use delete

interface ActionStatus {
  status: ActionStatusType;
  otherIcon?: React.ReactNode;
  otherBgHoverColor?: string;
  otherBgColor?: string;
}

const showIcon = (actionStatus: ActionStatus, width?: number) => {
  const iconWidth = width ? { style: { width, height: width } } : {};

  switch (actionStatus.status) {
    case "Create": {
      return <Plus {...iconWidth} />;
    }
    case "Update": {
      return <Pencil {...iconWidth} />;
    }
    // case 'Delete': { return <Trash2 /> }
    case "Read": {
      return <Eye {...iconWidth} />;
    }
    case "Other": {
      return actionStatus.otherIcon;
    }
  }
};

const chooseColor = (actionStatus: ActionStatus) => {
  switch (actionStatus.status) {
    case "Create": {
      return "bg-blue-500";
    }
    case "Update": {
      return "bg-green-500";
    }
    // case 'Delete': { return 'bg-red-500' }
    case "Read": {
      return "bg-orange-500";
    }
    case "Other": {
      return actionStatus.otherBgColor;
      // return `bg-[--${actionStatus.otherBgColor}]`;
    }
  }
};

const chooseHoverColor = (actionStatus: ActionStatus) => {
  switch (actionStatus.status) {
    case "Create": {
      return "hover:bg-blue-600";
    }
    case "Update": {
      return "hover:bg-green-600";
    }
    // case 'Delete': { return 'bg-red-500' }
    case "Read": {
      return "hover:bg-orange-600";
    }
    case "Other": {
      return actionStatus.otherBgHoverColor;
      // return `hover:bg-[--${actionStatus.otherBgHoverColor}]`;
    }
  }
};

interface IButtonProps {
  iconWidth?: number;
  content?: string;
  size?: ButtonSize;
  rounded?: RoundedButton;
  contentDirection?: ButtonDirection;
}

interface ISharedButtonProps {
  props?: IButtonProps & IActualWidthScreenSizes;
  actionStatus: ActionStatus;
  onClick?: () => void;
}
export function ShredButton({
  actionStatus,
  props,
  onClick,
}: ISharedButtonProps) {
  const { actualWidth: actualButtonWidth } = useActualWidth({
    width: props?.width ?? 0,
    largeScreenWidth: props?.largeScreenWidth,
    smallScreenWidth: props?.smallScreenWidth,
  });
  const buttonProps =
    props?.width || actionStatus.status === "Other"
      ? {
          style: {
            ...(props?.width && {
              width: actualButtonWidth,
              height: actualButtonWidth,
            }),
            // ...(actionStatus.status === 'Other' && {
            //   [`--${actionStatus?.otherBgColor}`]: actionStatus?.otherBgColor,
            //   [`--${actionStatus?.otherBgHoverColor}`]:
            //     actionStatus?.otherBgHoverColor,
            // }),
          },
        }
      : {};
  const buttonClickEvent = onClick ? { onClick } : {};

  return (
    <Button
      size={props?.size ?? "default"}
      className={cn(
        chooseColor(actionStatus),
        chooseHoverColor(actionStatus),
        props?.rounded ?? "rounded-md",
        props?.contentDirection === "vertical" ? "flex-col" : "flex row",
        "gap-2"
      )}
      {...buttonProps}
      {...buttonClickEvent}
    >
      {showIcon(actionStatus, props?.iconWidth)}
      {props?.content ? <p>{props?.content}</p> : null}
    </Button>
  );
}

export interface IButtonSheetProps {
  actionStatus: ActionStatus;
  buttonProps?: IButtonProps & IActualWidthScreenSizes;
  sheetProps: {
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    content: React.ReactNode;
  } & IActualWidthScreenSizes;
}
export function ButtonSheet({
  actionStatus,
  buttonProps,
  sheetProps: {
    title,
    description,
    content,
    width = 400,
    largeScreenWidth,
    smallScreenWidth,
  },
}: IButtonSheetProps) {
  if (
    actionStatus.status === "Other" &&
    (!actionStatus.otherIcon ||
      !actionStatus.otherBgColor ||
      !actionStatus.otherBgHoverColor)
  ) {
    throw new LogicError(
      `You need to pass the icon, background and hovering-background when "other" status is selected`
    );
  }

  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShredButton props={buttonProps} actionStatus={actionStatus} />
      </SheetTrigger>
      <SheetContent
        style={{ width, maxWidth: width }}
        className="overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <div className="pt-6">{content}</div>
      </SheetContent>
    </Sheet>
  );
}

export interface IButtonDialogProps {
  actionStatus: ActionStatus;
  buttonProps?: IButtonProps & IActualWidthScreenSizes;
  dialogProps: {
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    content: React.ReactNode;
    maxHeight?: number;
  } & IActualWidthScreenSizes;
}
export function ButtonDialog({
  actionStatus,
  buttonProps,
  dialogProps: {
    content,
    description,
    title,
    largeScreenWidth,
    smallScreenWidth,
    width = 425,
    maxHeight = 600,
  },
}: IButtonDialogProps) {
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ShredButton props={buttonProps} actionStatus={actionStatus} />
      </DialogTrigger>
      <DialogContent style={{ width, maxWidth: width, maxHeight }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}

        {/* <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export interface IButtonPopoverProps {
  actionStatus: ActionStatus;
  buttonProps?: IButtonProps & IActualWidthScreenSizes;
  popoverProps: {
    content: React.ReactNode;
  };
}
export function ButtonPopover({
  actionStatus,
  buttonProps,
  popoverProps: { content },
}: IButtonPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {ShredButton({ actionStatus, props: buttonProps })}
      </PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
}

export interface IButtonGoToPageProps {
  actionStatus: ActionStatus;
  buttonProps?: IButtonProps & IActualWidthScreenSizes;
  goToPageFunction: () => void;
}
export function ButtonGoToPage({
  actionStatus,
  buttonProps,
  goToPageFunction,
}: IButtonGoToPageProps) {
  return (
    <ShredButton
      actionStatus={actionStatus}
      props={buttonProps}
      onClick={goToPageFunction}
    />
  );
}

interface IDeleteSharedButtonProps {
  props?: IButtonProps & IActualWidthScreenSizes;
}
// Delete Button Popover and AlertDialog
export function DeleteSharedButton({ props }: IDeleteSharedButtonProps) {
  const iconWidth = props?.iconWidth
    ? {
        style: {
          width: props?.iconWidth,
          height: props?.iconWidth,
        },
      }
    : {};
  const { actualWidth: actualButtonWidth } = useActualWidth({
    width: props?.width ?? 0,
    largeScreenWidth: props?.largeScreenWidth,
    smallScreenWidth: props?.smallScreenWidth,
  });
  const buttonWidth = props?.width
    ? { style: { width: actualButtonWidth, height: actualButtonWidth } }
    : {};

  return (
    <Button
      size={props?.size ?? "default"}
      className={cn(
        "bg-red-500 hover:bg-red-600",
        props?.rounded ?? "rounded-md",
        props?.contentDirection === "vertical" ? "flex-col" : "flex row",
        "gap-2"
      )}
      {...buttonWidth}
    >
      <Trash2 {...iconWidth} />
      {props?.content && <p>{props?.content}</p>}
    </Button>
  );
}

export interface IDeleteButtonPopoverProps {
  message: string;
  confirmButtonText?: string;
  buttonProps?: IButtonProps & IActualWidthScreenSizes;
  deleteEntityAction: () => void;
}
export function DeleteButtonPopover({
  deleteEntityAction,
  message,
  buttonProps,
  confirmButtonText = "confirm",
}: IDeleteButtonPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {DeleteSharedButton({ props: buttonProps })}
      </PopoverTrigger>
      <PopoverContent className="mt-1">
        <div className="flex flex-col gap-2">
          {message}
          <Button
            className={cn(
              "h-[30px] w-fit bg-red-500 p-2 text-[12px] hover:bg-red-600",
              buttonProps?.rounded ?? "rounded-md"
            )}
            onClick={deleteEntityAction}
          >
            {confirmButtonText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface IDeleteButtonAlertDialogProps {
  buttonProps?: IButtonProps & IActualWidthScreenSizes;
  dialogProps: {
    title: string;
    description: string | React.ReactNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    deleteEntityAction: () => void;
  } & IActualWidthScreenSizes;
}
export function DeleteButtonAlertDialog({
  buttonProps,
  dialogProps: {
    confirmButtonText = "Continue",
    title,
    description,
    deleteEntityAction,
    cancelButtonText = "Cancel",
    width = 425,
    largeScreenWidth,
    smallScreenWidth,
  },
}: IDeleteButtonAlertDialogProps) {
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {DeleteSharedButton({ props: buttonProps })}
      </AlertDialogTrigger>
      <AlertDialogContent style={{ width: actualWidth }}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button size={"sm"} variant={"outline"}>
              {cancelButtonText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              size={"sm"}
              className="bg-red-500 hover:bg-red-600"
              onClick={deleteEntityAction}
            >
              {confirmButtonText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
