import React, { PropsWithChildren, useState } from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet as SheetComp,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ButtonSize, ButtonVariant } from "../shared/button-props";
import { SheetPlacement } from "../shared/sheet-props";
import { useScreenSize } from "@/hooks/use-screen-size";

interface ISheetProps extends PropsWithChildren {
  title: string;
  description?: string;
  placement?: SheetPlacement;
  children: any;
  isOpen?: boolean;
  width: number;
  smallScreenWidth?: number;
  largeScreenWidth?: number;
  buttonProps: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    content: string | React.ReactNode;
  };
}

function Sheet({
  buttonProps: { content, size = "default", variant = "default" },
  children,
  isOpen = false,
  title,
  description,
  placement = "right",
  largeScreenWidth,
  smallScreenWidth,
  width = 425,
}: ISheetProps) {
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
    <SheetComp open={isOpen}>
      <SheetTrigger>
        <Button variant={variant} size={size}>
          {content}
        </Button>
      </SheetTrigger>
      <SheetContent style={{ width: actualWidth }} side={placement}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}

          <div className="pt-6">{children}</div>
        </SheetHeader>
      </SheetContent>
    </SheetComp>
  );
}

export default Sheet;
