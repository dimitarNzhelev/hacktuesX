"use client";

import { Crown } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/app/components/ui/alert-dialog";
import { getTeamMembers, makeCaptain } from "../(full-layout)/teams/actions";
import { getParticipantFromSession } from "../participants/service";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function MakeCaptainComponent({
  participant,
  member,
}: {
  member: Exclude<Awaited<ReturnType<typeof getTeamMembers>>[number], null>;
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>;
}) {
  const { toast } = useToast();
  const handleClick = async () => {
    const { success } = await makeCaptain(participant?.id, member.id);
    if (success) {
      window.location.reload();
    } else {
      toast({
        title: "Неуспешен опит",
        description: "Моля опитайте отново след мъничко.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 p-2 opacity-70 hover:cursor-pointer hover:bg-teal-500">
          <Crown />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-4/5 rounded-3xl sm:w-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Сигурни ли сте, че искате да направите този участник капитан?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Това действие не може да бъде върнато назад.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отказ</AlertDialogCancel>
          <AlertDialogAction className="destructive" onClick={handleClick}>
            Направи капитан
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
