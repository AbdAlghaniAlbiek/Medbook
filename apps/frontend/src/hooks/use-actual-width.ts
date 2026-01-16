'use client';

import { useEffect, useState } from 'react';
// import { useScreenSize } from './use-screen-size';
import { BreakPoint, useScreenSize } from 'use-screen-size';

export interface IActualWidthScreenSizes {
  width?: number;
  largeScreenWidth?: number;
  smallScreenWidth?: number;
}

export function useActualWidth({
  largeScreenWidth,
  smallScreenWidth,
  width = 0,
}: IActualWidthScreenSizes) {
  const screenSize = useScreenSize();

  const [actualWidth, setActualWidth] = useState<number>(width);

  if (screenSize.screen === BreakPoint.m) {
    setActualWidth(width);
  } else if (screenSize.screen === BreakPoint.l) {
    setActualWidth(largeScreenWidth ?? width);
  } else if (screenSize.screen === BreakPoint.s) {
    setActualWidth(smallScreenWidth ?? width);
  }

  return { actualWidth };
}
