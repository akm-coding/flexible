import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage";
import { getUserProjects } from "@/lib/actions";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function UserProfile({ params }: Props) {
  const result = (await getUserProjects(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user) {
    return <p className="no-result-text">Failed to fetch user info</p>;
  }

  return <ProfilePage user={result?.user} />;
}
