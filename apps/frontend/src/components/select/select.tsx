"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Select as SelectComp,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { LabelLocated } from "../shared/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

export interface ISelectItem {
  content: any;
  value: string; // Accept object as stringify object
}
interface ISelectGroup {
  items: ISelectItem[];
  label?: string;
}
export interface ISelectProps {
  width?: number;
  placeholder: string;
  defaultValue?: string;
  groups: ISelectGroup[];
  value: string | undefined;
  isLoading?: boolean;
  label?: string;
  labelLocated?: LabelLocated;
  disabled: boolean;
  onValueChange: (value: string) => void;
}
export function Select({
  groups,
  placeholder,
  width,
  defaultValue,
  onValueChange,
  value,
  isLoading = false,
  label,
  disabled,
  labelLocated = "above",
}: ISelectProps) {
  const defaultSelectValue = defaultValue ? { defaultValue } : {};
  const selectWidth = width ? { style: { width } } : {};

  return (
    <div
      className={cn(
        "flex relative w-fit",
        labelLocated === "aside"
          ? "flex-row gap-1 items-center"
          : "flex-col gap-1"
      )}
    >
      <div className="flex flex-row gap-3">
        {label && <Label>{label}</Label>}

        {isLoading && (
          <Spinner
            // className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            size={"extraSmall"}
          />
        )}
      </div>
      <SelectComp
        disabled={disabled}
        onValueChange={onValueChange}
        value={value}
        {...defaultSelectValue}
      >
        <SelectTrigger {...selectWidth} className="w-fit">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-fit">
          {groups.map((group, i) => (
            <SelectGroup key={i}>
              {group?.label && <SelectLabel>{group.label}</SelectLabel>}
              {group.items.map((item, j) => (
                <SelectItem key={j} value={item.value}>
                  {item.content}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </SelectComp>
    </div>
  );
}
