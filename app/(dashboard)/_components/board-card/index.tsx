"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import moment from "moment";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface IBoardCardProps {
  title: string;
  id: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFav: boolean;
}

export default function BoardCard({
  title,
  id,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  isFav,
  orgId,
}: IBoardCardProps) {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = moment(createdAt).fromNow();
  const { mutate: onFav, pending: favPending } = useApiMutation(
    api.board.favorite
  );
  const { mutate: unFav, pending: unFavPending } = useApiMutation(
    api.board.unFavorite
  );

  const toggleFav = () => {
    if (isFav) {
      unFav({ id }).catch(() => toast.error("Failed to Un Favorite"));
    } else {
      onFav({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fill" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFav={isFav}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFav}
          disabled={favPending || unFavPending}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
