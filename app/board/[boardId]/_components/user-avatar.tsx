interface IUserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

import Hint from "@/app/(dashboard)/_components/sidebar/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export default function UserAvatar({
  borderColor,
  fallback,
  name,
  src,
}: IUserAvatarProps) {
  return (
    <Hint label={name || "Anonymous"} side="bottom" sideOffset={10}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}
