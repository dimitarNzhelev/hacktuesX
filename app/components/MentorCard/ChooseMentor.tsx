"use client";

import { chooseTeamMentor } from "~/app/(full-layout)/mentors/actions";
import { Button } from "../ui/button";

export default function ChooseMentor({
  mentorId,
  teamId,
}: {
  mentorId: number;
  teamId: string;
}) {
  const handleMentorChoose = async () => {
    const res = await chooseTeamMentor(mentorId, teamId);
    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <Button onClick={() => handleMentorChoose()} className="w-full text-black">
      Избери ментор
    </Button>
  );
}
