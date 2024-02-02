"use client";

import Hint from "@/app/(dashboard)/_components/sidebar/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface IToolBtnProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export default function ToolBtn({
  icon: Icon,
  isActive,
  isDisabled,
  label,
  onClick,
}: IToolBtnProps) {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={"icon"}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
}
