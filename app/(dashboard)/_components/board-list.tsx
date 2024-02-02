"use client";

interface IBoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

import React from "react";
import EmptySearch from "./empty-search";
import EmptyFav from "./empty-fav";
import EmptyBoard from "./empty-board";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardCard from "./board-card";
import NewBoardBtn from "./new-board-btn";

export default function BoardList({ orgId, query }: IBoardListProps) {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorites Boards" : "Team Boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardBtn orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return <EmptySearch />;
  }
  if (!data.length && query.favorites) {
    return <EmptyFav />;
  }
  if (!data.length) {
    return <EmptyBoard />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorites Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardBtn orgId={orgId} />
        {data.map((e) => (
          <BoardCard
            key={e._id}
            authorId={e.authorId}
            authorName={e.authorName}
            title={e.title}
            createdAt={e._creationTime}
            id={e._id}
            isFav={e.isFav}
            imageUrl={e.imageUrl}
            orgId={e.orgId}
          />
        ))}
      </div>
    </div>
  );
}
