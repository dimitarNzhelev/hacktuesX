import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { slugify } from "transliteration";

import { db } from "../db";
import { particpants, projects, teams } from "../db/schema";
import { getParticipantById } from "../participants/service";

export async function getConfirmedTeams() {
  return db.query.teams.findMany({
    with: {
      members: true,
      project: true,
    },
  });
  // .select({
  //   id: teams.id,
  //   name: teams.name,
  //   description: teams.description,
  //   mentorId: teams.mentorId,
  //   projectId: teams.projectId,
  //   isAlumni: teams.isAlumni,
  //   members: {
  //     particiapntId: particpants.id,
  //     firstName: particpants.firstName,
  //     lastName: particpants.lastName,
  //     grade: particpants.grade,
  //     parallel: particpants.parallel,
  //     technologies: particpants.technologies,
  //   },
  //   project: {
  //     id: projects.id,
  //     name: projects.name,
  //     technologies: projects.technologies,
  //   },
  // })
  // .from(teams)
  // .leftJoin(particpants, eq(particpants.teamId, teams.id))
  // .leftJoin(projects, eq(teams.projectId, projects.id));
}

export async function getTeamById(id: string) {
  const results = await db.select().from(teams).where(eq(teams.id, id));
  return results.at(0) ?? null;
}

export async function createTeam(team: {
  name: string;
  description: string;
  captainId: number;
  isAlumni: boolean;
}) {
  const captain = await getParticipantById(team.captainId);
  // TODO: verify if name is ok
  const results = await db
    .insert(teams)
    .values({
      id: slugify(team.name),
      technologies: captain?.technologies || "",
      ...team,
    })
    .returning({ id: teams.id });
  const insertedTeam = results.at(0);
  invariant(insertedTeam, "Failed to create team");
  await db
    .update(particpants)
    .set({
      isCaptain: true,
      teamId: insertedTeam.id,
    })
    .where(eq(particpants.userId, team.captainId));
  return insertedTeam;
}
