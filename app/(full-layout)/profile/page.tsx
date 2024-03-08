import { Metadata } from "next";
import { redirect } from "next/navigation";

import ProfileInfo from "~/app/(full-layout)/profile/_components/profile-info";
import { signInRedirect } from "~/app/api/auth/session";
import { getParticipantFromSession } from "~/app/participants/service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Профил",
  description: "Профил на участника в Hack TUES X",
  openGraph: {
    title: "Профил",
    description: "Профил на участника в Hack TUES X",
  },
};

export default async function ProfilePage() {
  const participant = await getParticipantFromSession();
  if (!participant) {
    signInRedirect();
  }
  if (participant.isDisqualified) {
    redirect("/");
  }
  return <ProfileInfo participant={participant} />;
}
