import React, { PropsWithChildren, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Dialog as DialogComp,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ButtonSize, ButtonVariant } from "../shared/button-props";
import { SheetPlacement } from "../shared/sheet-props";
import { useScreenSize } from "@/hooks/use-screen-size";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface IDialogProps extends PropsWithChildren {
  title: string;
  description?: string;
  children: any;
  isOpen?: boolean; // must be state
  width: number;
  smallScreenWidth?: number;
  largeScreenWidth?: number;
  // buttonProps: {
  //   variant?: ButtonVariant;
  //   size?: ButtonSize;
  //   content: string | React.ReactNode;
  // };
  closeButton?: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    content: string;
    onClose?: () => void;
  };
}

function Dialog({
  // buttonProps: { content, size = 'default', variant = 'default' },
  children,
  isOpen = false,
  title,
  description,
  largeScreenWidth,
  smallScreenWidth,
  width = 425,
  closeButton,
}: IDialogProps) {
  const screenSize = useScreenSize();
  const [actualWidth, setActualWidth] = useState<number>(width);

  if (screenSize === "sm") {
    setActualWidth(smallScreenWidth ?? width);
  } else if (screenSize === "md") {
    setActualWidth(width);
  } else if (screenSize === "lg") {
    setActualWidth(largeScreenWidth ?? width);
  }

  return (
    <DialogComp open={isOpen}>
      {/* <DialogTrigger>
        <Button variant={variant} size={size}>
          {content}
        </Button>
      </DialogTrigger> */}
      <DialogContent style={{ width: actualWidth }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}

        {closeButton && (
          <DialogFooter>
            <DialogClose>
              <Button
                variant={closeButton.variant ?? "default"}
                size={closeButton.size ?? "default"}
                onClick={closeButton.onClose}
              >
                {closeButton.content}
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </DialogComp>
  );
}

export default Dialog;
