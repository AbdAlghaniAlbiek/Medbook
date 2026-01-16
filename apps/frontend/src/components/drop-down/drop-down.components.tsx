'use client';

import { Dialog } from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { SheetPlacement } from '../shared/sheet-props';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  IActualWidthScreenSizes,
  useActualWidth,
} from '@/hooks/use-actual-width';
import { Button } from '../ui/button';

interface IDialogDropDown {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  createUpdateEntityForm: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export function DialogDropDown({
  createUpdateEntityForm,
  description,
  title,
  isOpen,
  setIsOpen,
  width = 425,
  largeScreenWidth,
  smallScreenWidth,
}: IDialogDropDown & IActualWidthScreenSizes) {
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent style={{ width: actualWidth }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {createUpdateEntityForm}
      </DialogContent>
    </Dialog>
  );
}

interface ISheetDropDown {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  createUpdateEntityForm: React.ReactNode;
  placement?: SheetPlacement;
}
export function SheetDropDown({
  createUpdateEntityForm,
  description,
  title,
  isOpen,
  placement = 'right',
  width = 400,
  smallScreenWidth,
  largeScreenWidth,
}: ISheetDropDown & IActualWidthScreenSizes) {
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });

  return (
    <Sheet open={isOpen}>
      <SheetContent side={placement} style={{ width: actualWidth }}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <div className="pt-6">{createUpdateEntityForm}</div>
      </SheetContent>
    </Sheet>
  );
}

// Note:
// If you want to pass data (like "id" for deleting an item) you need to define a state contains that id
// and when you click on the button to open up the alert-dialog you need to change two state (setIsOpen(true) & setItemId(val))
// and when you click on confirm make delete operation using that state
type TAlertDialogDropDropDown = Omit<
  IDialogDropDown,
  'createUpdateEntityForm' | 'description'
> & {
  deleteEntityAction: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  description: string | React.ReactNode;
};
export function DeleteAlertDialogDropDown({
  deleteEntityAction,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Continue',
  description,
  title,
  setIsOpen,
  largeScreenWidth,
  smallScreenWidth,
  width = 425,
  isOpen,
}: TAlertDialogDropDropDown & IActualWidthScreenSizes) {
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent style={{ width: actualWidth }}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button size={'sm'} variant={'outline'}>
              {cancelButtonText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              size={'sm'}
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
