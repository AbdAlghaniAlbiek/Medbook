'use client';

import { Ellipsis, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Fragment } from 'react';

type DropDownActionStatusType = 'Delete' | 'Other';

interface IDropDownItem {
  icon?: React.ReactNode;
  label: string;
  action: () => void;
  status: DropDownActionStatusType;
}
interface IDropDownGroup {
  items: IDropDownItem[];
}
interface IDropDownProps {
  groups: IDropDownGroup[];
}
export function DropDown({ groups }: IDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {groups.map((group, i) => (
          <Fragment key={i}>
            <DropdownMenuRadioGroup>
              {group.items.map((item, j) =>
                item.status === 'Other' ? (
                  <DropdownMenuItem key={j}>
                    <div onClick={item.action} className="flex flex-row gap-2">
                      {item.icon && item.icon}
                      <span>{item.label}</span>
                    </div>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem key={j}>
                    <div onClick={item.action} className="flex flex-row gap-2">
                      <Trash2 color="#ef4444" />
                      <span className="text-red-500">{item.label}</span>
                    </div>
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuRadioGroup>
            {groups.length > 1 && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
