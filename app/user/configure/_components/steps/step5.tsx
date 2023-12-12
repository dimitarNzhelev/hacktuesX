"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  ALUMNI_GRADES,
  ALUMNI_PARALLELS,
  EXTENDED_ALUMNI_GRADES,
  EXTENDED_ALUMNI_PARALLELS,
  REGULAR_ALUMNI_PARALLELS,
} from "~/app/_elsys/grades-parallels";
import { SignOutButton } from "~/app/components/buttons";
import { Button, buttonVariants } from "~/app/components/ui/button";
import { Card, CardContent } from "~/app/components/ui/card";
import { Checkbox } from "~/app/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/app/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import { Input } from "~/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
import { Textarea } from "~/app/components/ui/textarea";
import { cn } from "~/app/utils";
import { alumniStep5Schema } from "../../schemas";
import { NextStepButton, PrevStepButton, StepButtons } from "../step-buttonts";

type AlumniStep5Data = z.infer<typeof alumniStep5Schema>;

// TODO: add more info about whats in the form in its name
export const AlumniStep5 = ({
  email,
  initialData,
  onNext,
  onPrev,
  className,
  isAlumni,
}: {
  email: string;
  initialData: Partial<AlumniStep5Data>;
  onNext: (data: AlumniStep5Data) => void;
  onPrev: () => void;
  className?: string;
  isAlumni: boolean;
}) => {
  const form = useForm<AlumniStep5Data>({
    resolver: zodResolver(alumniStep5Schema),
    defaultValues: initialData,
  });

  return (
    <section
      className={cn(
        "flex w-full max-w-xl flex-col items-center gap-2",
        className,
      )}
    >
      <h2 className="text-center text-2xl font-extrabold">
        Персонализирайте профила си!
      </h2>
      <Card className="block w-full p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    На каква нетехнологична тема бихте искали да разработвате
                    проект на хакатон?
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Коя е любимата ви тема или подтема от всички изминали
                    издания на{" "}
                    <span className="font-llpixel font-medium">
                      Hack&nbsp;TUES
                    </span>
                    ?
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <StepButtons
              left={<PrevStepButton onClick={onPrev} />}
              right={
                // TODO: maybe add a loading state and extract the button to a component
                <NextStepButton
                  isLoading={form.formState.isSubmitting}
                  isLastStep={true}
                />
              }
            />
          </form>
        </Form>
      </Card>
    </section>
  );
};

function Step1Header({ email }: { email: string }) {
  return (
    <div className="p-6 text-center">
      <p className="text-muted-foreground">
        Влезли сте като <span className="font-semibold underline">{email}</span>
        .
      </p>
      <div className="py-1" />
      <Button asChild variant="destructive" className="gap-2" size="sm">
        <SignOutButton>
          <LogOutIcon className="h-4 w-4" /> Изход
        </SignOutButton>
      </Button>
    </div>
  );
}
