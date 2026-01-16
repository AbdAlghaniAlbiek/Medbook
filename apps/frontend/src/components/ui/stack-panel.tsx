'use client';

import React from 'react';
import { cn } from './../../lib/utils';
import {
  AlignItems,
  Direction,
  Gap,
  JustifyContent,
  Wrapping,
} from '../shared/flex-props';

interface IStackPanelProps {
  children: React.ReactNode;
  direction: Direction;
  gap: Gap;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  wrapping?: Wrapping;
}

function StackPanel({
  children,
  direction,
  gap,
  alignItems = 'items-center',
  justifyContent = 'justify-start',
  wrapping = 'flex-wrap',
}: IStackPanelProps) {
  return (
    <div
      className={cn(
        'flex w-full',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gap,
        alignItems,
        justifyContent,
        wrapping,
      )}
    >
      {children}
    </div>
  );
}

export default StackPanel;
