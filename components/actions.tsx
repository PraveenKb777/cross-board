"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

interface IActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

export default function Actions({
  children,
  id,
  title,
  side,
  sideOffset,
}: IActionsProps) {
  const { onOpen } = useRenameModal();
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const { mutate, pending } = useApiMutation(api.board.remove);

  const onDeletePress = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete Board"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className=" p-3 cursor-pointer">
          <Link2 className="h-4 w-4 m-2" />
          Copy board Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className=" p-3 cursor-pointer"
        >
          <Pencil className="h-4 w-4 m-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete Board?"
          description="Delete board and its content"
          disabled={pending}
          onConfirm={onDeletePress}
        >
          <Button
            variant={"ghost"}
            className=" p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 m-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
