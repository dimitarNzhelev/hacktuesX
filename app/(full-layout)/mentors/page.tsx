import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { getTeamById } from "~/app/(full-layout)/teams/service";
import Mentor from "~/app/components/MentorCard/Mentor";
import { getParticipantFromSession } from "~/app/participants/service";
import { getAllMentors } from "./service";

export const metadata: Metadata = {
  title: "Ментори",
  description: "Менторите на Hack TUES X",
};

export default async function MentorsPage() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("show-mentors")) {
    notFound();
  }

  const participant = await getParticipantFromSession();
  const participantTeam = await getTeamById(participant?.team.id ?? "");
  const mentors = await getAllMentors();
  mentors.push(mentors[0]);
  mentors.push(mentors[0]);
  mentors.push(mentors[0]);
  mentors.push(mentors[0]);
  mentors.push(mentors[0]);
  mentors.push(mentors[0]);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mb-4 text-2xl font-semibold">Ментори:</h1>
      <div className="inline-grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mentors.map((mentor) => (
          <Mentor
            key={mentor.id}
            mentor={mentor}
            participant={participant}
            participantTeam={participantTeam}
            isMentorTaken={mentor.team !== null}
          />
        ))}
      </div>
    </div>
  );
}
