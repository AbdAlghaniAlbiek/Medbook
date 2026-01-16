import React from 'react';
import {
  Card as CardComp,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  IActualWidthScreenSizes,
  useActualWidth,
} from '@/hooks/use-actual-width';
import { cn } from '@/lib/utils';

interface ICard {
  header?: {
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
  };
  children: any;
  footer?: string | React.ReactNode;
}
export function Card({
  footer,
  header,
  children,
  largeScreenWidth,
  smallScreenWidth,
  width,
}: ICard & IActualWidthScreenSizes) {
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });
  const cardWidth = width ? { style: { width: actualWidth } } : {};

  return (
    <CardComp {...cardWidth} className={cn(width ? 'w-fit' : 'w-full')}>
      {header && (header?.title || header?.description) && (
        <CardHeader>
          {header?.title && <CardTitle>{header?.title}</CardTitle>}
          {header?.description && (
            <CardDescription>{header?.description}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardComp>
  );
}
