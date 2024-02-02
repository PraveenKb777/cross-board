"use client";

import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import Hint from "./hint";

interface IItemProps {
  id: string;
  url: string;
  name: string;
}

export default function Item({ id, url, name }: IItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" sideOffset={18} align="start">
        <Image
          src={url}
          alt={name}
          fill
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-60 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
}
