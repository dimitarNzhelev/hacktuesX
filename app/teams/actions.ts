"use server";

import { and, eq } from "drizzle-orm";
import { zact } from "zact/server";
import { z } from "zod";

import {
  invitations,
  joinRequests,
  notifications,
  particpants,
  teams,
} from "~/app/db/schema";
import { getServerSideGrowthBook } from "../_integrations/growthbook";
import { db } from "../db";
import {
  getParticipantById,
  getParticipantFromSession,
} from "../participants/service";

export async function deleteMyTeam() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-details")) {
    return {
      success: false,
      error: "Изтриването на отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();

  if (!participant) {
    return { success: false, error: "Не си влязъл като участник" };
  }
  if (!participant.team.isCaptain || !participant.team.id) {
    return {
      success: false,
      error: "Само капитанът на този отбор може да го изтрие",
    };
  }

  try {
    await db
      .delete(joinRequests)
      .where(eq(joinRequests.teamId, participant.team.id));
    // await db.delete(notifications).where(eq(notifications.));
    await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.teamId, participant.team.id));

    await db
      .delete(teams)
      .where(eq(teams.id, participant?.team.id))
      .returning();
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

// FIXME: use zact
export async function askToJoinTeam(teamIdToJoin: string) {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error: "Присъединяването към отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false, error: "Не си влязъл като участник" };
  }
  if (participant.team.id) {
    return { success: false, error: "Вече си в отбор" };
  }

  try {
    const res = await db
      .insert(joinRequests)
      .values({
        userId: participant.id,
        teamId: teamIdToJoin,
      })
      .returning();

    console.log(res[0]);

    const captain = await db
      .select()
      .from(particpants)
      .where(
        and(
          eq(particpants.isCaptain, true),
          eq(particpants.teamId, teamIdToJoin),
        ),
      );

    await db.insert(notifications).values({
      targetUserId: captain[0].id,
      referenceId: res[0].id,
      type: "ask_join",
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

export const inviteToTeam = zact(
  z.object({
    invitedParticipantId: z.number(),
    teamId: z.string(),
  }),
)(async ({ invitedParticipantId, teamId }) => {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error: "Поканването на участници в отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();
  if (!participant) {
    return { success: false, error: "Не си влязъл като участник" };
  }
  if (!participant.team.isCaptain || participant.team.id != teamId) {
    return {
      success: false,
      error: "Само капитана на този отбор може да кани участници",
    };
  }

  const invitedParticipant = await getParticipantById(invitedParticipantId);
  if (
    !invitedParticipant ||
    invitedParticipant.team.id !== null ||
    !invitedParticipant.isLookingForTeam
  ) {
    return { success: false, error: "Този участник не може да бъде поканен" };
  }

  try {
    const res = await db
      .insert(invitations)
      .values({
        invitedParticipantId: invitedParticipant.id,
        senderParticipantId: participant.id,
        teamId,
      })
      .returning();

    await db.insert(notifications).values({
      targetUserId: invitedParticipantId,
      referenceId: res[0].id,
      type: "invitation",
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
});

// XXX: do we need this? can we fetch in the server component?
/** @deprecated */
export const checkStateJoinRequests = zact(
  z.object({
    targetTeamId: z.string(),
  }),
)(async ({ targetTeamId }) => {
  const participant = await getParticipantFromSession();
  if (!participant) {
    return false;
  }

  try {
    const res = await db
      .select()
      .from(joinRequests)
      .where(
        and(
          eq(joinRequests.userId, participant?.id),
          eq(joinRequests.teamId, targetTeamId),
        ),
      );
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
});

// FIXME: use zact
export async function removeTeamMember(memberId: number) {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("update-team-members")) {
    return {
      success: false,
      error:
        "Премахването на участници от отбори не е позволено по това време.",
    };
  }

  const participant = await getParticipantFromSession();
  if (!participant?.id) {
    return { success: false, message: "Unauthenticated" };
  }
  const member = await getParticipantById(memberId);
  if (!member?.team.id) {
    return { success: false, message: "The member is not part of this team" };
  }
  if (participant.team.isCaptain && participant.team.id == member.team.id) {
    const res = await db
      .update(particpants)
      .set({ teamId: null, isCaptain: false })
      .where(eq(particpants.id, memberId));
    console.log(res);
    if (res) {
      return { success: true };
    }
    return { success: false, message: "Failed to remove team member" };
  }
  return { success: false, message: "You are not a team captain" };
}

// FIXME: do we need this? can we fetch in the server component?
export async function getTeamMembers(teamId: string) {
  const res = await db
    .select()
    .from(particpants)
    .where(eq(particpants.teamId, teamId));
  console.log(res);
  return res;
}