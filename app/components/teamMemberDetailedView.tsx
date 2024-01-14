"use client";

import { Team } from "../(full-layout)/teams/service";
import {
  getParticipantFromSession,
  Participant,
} from "../participants/service";
import { cn } from "../utils";
import Crown from "./Crown";
import MakeCaptainComponent from "./makeCaptainComponent";
import RemoveMemberComponent from "./RemoveMemberComponent";

type ReducedTeamMember = Pick<Participant, "firstName" | "lastName" | "id"> & {
  isCaptain: boolean;
};
type ReducedParticipant =
  | (Pick<Participant, "id"> & {
      team: Pick<Team, "id"> & {
        isCaptain: boolean;
      };
    })
  | null;
type ReducedTeam = Pick<Team, "id">;

export default function TeamMemberDetailedView({
  member,
  participant,
  team,
}: {
  member: ReducedTeamMember;
  participant: ReducedParticipant;
  team: ReducedTeam;
}) {
  const colors = [
    "bg-red-700",
    "bg-green-700",
    "bg-orange-700",
    "bg-yellow-700",
    "bg-emerald-700",
    "bg-cyan-700",
    "bg-sky-700",
    "bg-indigo-700",
    "bg-violet-700",
    "bg-purple-700",
  ];

  return (
    <div className="mx-3 flex flex-col items-center justify-center align-middle sm:mx-8">
      <div
        className={cn(
          `z-32 relative ml-auto mr-auto flex h-14 w-14 items-center justify-center rounded-full sm:h-32 sm:w-32 ${
            colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
          } text-center`,
        )}
      >
        {member.isCaptain && (
          <div className="absolute inset-0 flex -translate-y-[60%]  items-center justify-center">
            <Crown className=" h-4 w-8 sm:h-10 sm:w-20" />
          </div>
        )}

        <h1 className="p-2 text-3xl sm:text-6xl">
          {member.firstName?.charAt(0).toUpperCase()}
        </h1>
      </div>
      {participant?.id == member.id && !participant.team.isCaptain && (
        <div className="flex items-center justify-center">
          <RemoveMemberComponent memberToRemove={member} remove={false} />
        </div>
      )}
      {participant?.team.isCaptain &&
      participant.team.id === team.id &&
      participant.id !== member.id ? (
        <div className="flex items-center justify-center">
          <RemoveMemberComponent memberToRemove={member} remove={true} />
          <MakeCaptainComponent participant={participant} member={member} />
        </div>
      ) : (
        member?.isCaptain && <div className="m-1 h-10 w-8" />
      )}
    </div>
  );
}
