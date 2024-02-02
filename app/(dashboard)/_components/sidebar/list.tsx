"use client";

import { useOrganizationList } from "@clerk/nextjs";
import Item from "./item";

export default function List() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) {
    return null;
  }
  return (
    <ul className="space-y-4">
      {userMemberships.data.map((e) => (
        <Item
          key={e.organization.id}
          id={e.organization.id}
          name={e.organization.name}
          url={e.organization.imageUrl}
        />
      ))}
    </ul>
  );
}
