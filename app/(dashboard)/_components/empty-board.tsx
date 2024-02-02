"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
export default function EmptyBoard() {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();
  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization?.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board Created Successfully");
        router.push(`/board/${id}`);
        // todo board redirect
      })
      .catch((e) => toast.error("Failed to create board"));
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/note.png"} alt="Empty Search" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create Your First board</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          Create Board
        </Button>
      </div>
    </div>
  );
}
