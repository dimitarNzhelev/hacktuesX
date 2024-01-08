import { isParticipantStudent } from "~/app/participants/service";
import DisqualifyParticipantComponent from "../components/DisqualifyParticipantComponent";
import { AdminOrNotFound } from "../components/server";
import TableData from "../components/TableData";
import { getParticipantsAdmin } from "./service";

export default async function AdminParticipantList() {
  const participants = await getParticipantsAdmin();

  const preparedParticipants = participants.map((participant) => {
    try {
      const fullName = formatNick(participant);
      return {
        ...participant,
        label: fullName,
        value: `${fullName.toLowerCase()}`,
      };
    } catch (error) {
      console.error("Error in map function:", error);
    }
  });

  return (
    <>
      <AdminOrNotFound />
      <h1 className="text-xl font-bold">Участници</h1>
      <DisqualifyParticipantComponent participants={preparedParticipants} />
      <TableData data={participants} />
    </>
  );
}

const formatNick = (user: any) => {
  if (isParticipantStudent(user)) {
    return `${user.firstName} ${user.lastName} (${user.grade}${user.parallel})`;
  } else {
    return `${user.firstName} ${user.lastName} (ТУЕС'${user.grade})`;
  }
};
