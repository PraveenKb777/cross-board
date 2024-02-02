import Image from "next/image";
import React from "react";

export default function EmptySearch() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src={"/empty-search.png"}
        alt="Empty Search"
        height={140}
        width={140}
      />
      <h2 className="text-2xl font-semibold mt-6">No Result Found!</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Try searching Something else !!
      </p>
    </div>
  );
}
