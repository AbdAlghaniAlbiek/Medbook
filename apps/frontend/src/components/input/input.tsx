'use client';

import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Input as InputComp } from '../ui/input';
import { ChangeEvent } from 'react';
import {
  IActualWidthScreenSizes,
  useActualWidth,
} from '@/hooks/use-actual-width';
import { LabelLocated } from '../shared/input';

type InputType = 'text' | 'email' | 'password' | 'number';
export interface IInput {
  id: string;
  labelLocated?: LabelLocated;
  label: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  type?: InputType;
  defaultValue?: string;
}
export function Input({
  id,
  label,
  onChange,
  value,
  labelLocated = 'above',
  placeholder = 'Type here',
  type = 'text',
  defaultValue,
  width,
  largeScreenWidth,
  smallScreenWidth,
}: IInput & IActualWidthScreenSizes) {
  const defaultInputValue = defaultValue ? { defaultValue } : {};
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });
  const inputWidth = width ? { style: { width: actualWidth } } : {};

  return (
    <div
      className={cn(
        'flex',
        labelLocated === 'aside'
          ? 'flex-row gap-1 items-center'
          : 'flex-col gap-1',
      )}
    >
      <Label htmlFor={id}>{label}</Label>
      <InputComp
        {...inputWidth}
        {...defaultInputValue}
        type={type as any}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
