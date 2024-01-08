"use server";

import { z } from "zod";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { zact } from "~/app/_zact/server";
import { getParticipantFromSession } from "~/app/participants/service";
import { createTeam } from "../service";

export const createTeamAction = zact(
  z.object({
    name: z
      .string()
      .trim()
      .max(30)
      .refine(
        (v) => v.toLocaleLowerCase().replaceAll(" ", "") !== "falsepositive",
      ),
    description: z.string(),
  }),
)(async (input) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("create-team")) {
    return {
      success: false,
      error: "Създаването на отбори не е позволено по това време.",
    } as const;
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    // TODO: да извадим съобщенията в отделен файл
    return {
      success: false,
      error: "Не сте влезли в своя Hack TUES X акаунт.",
    } as const;
  }

  let isAlumni = false;
  if (participant.grade && parseInt(participant.grade) > 12) {
    isAlumni = true;
  }

  if (participant.team.id !== null) {
    return {
      success: false,
      error: "Вече си имате отбор, не ви ли харесва?",
    } as const;
  }
  try {
    const team = await createTeam({
      name: input.name,
      description: input.description,
      captainId: participant.id,
      isAlumni: isAlumni,
    });
    return { success: true, team } as const;
  } catch (e) {
    return {
      success: false,
      error:
        "Възнинкна грешка, ако смятате, че нещо не е наред, свържете се с нас!",
    } as const;
  }
});

export const checkUserCanCreateTeam = async () => {
  const participant = await getParticipantFromSession();
  if (!participant || participant.team.id || participant.isDisqualified) {
    return { isEligableToCreateTeam: false };
  }
  return { isEligableToCreateTeam: true };
};
