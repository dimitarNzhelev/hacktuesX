"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

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
import { Button } from "~/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import { updateProjectNameDesc, updateProjectWebsiteUrl } from "../../actions";
import {
  UpdateProjectInput,
  updateProjectSchema,
  UpdateWebsiteUrlInput,
  updateWebsiteUrlSchema,
} from "./schemas";

export function UpdateProjectDialog({
  children,
  teamId,
  name,
  description,
}: React.PropsWithChildren<{
  teamId: string;
  name: string;
  description: string;
}>) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      teamId,
      name,
      description,
    },
  });

  const { toast } = useToast();

  const updateProjectMutation = useMutation({
    mutationFn: async (data: UpdateProjectInput) => {
      const res = await updateProjectNameDesc(data);
      if (!res.success) {
        throw new Error(res.message);
      }
    },
    onSuccess: () => {
      toast({
        title: "Промените са запазени",
        description: "Успешно обновихте проекта",
      });
    },
    onError: (error) => {
      toast({
        title: "Нещо се обърка",
        description: error.message,
      });
    },
  });

  async function handleSubmit(data: UpdateProjectInput) {
    await updateProjectMutation.mutateAsync(data);
    form.reset(
      {
        teamId: data.teamId,
        name: data.name,
        description: data.description,
      },
      {
        keepDirty: false,
      },
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Проект</DialogTitle>
              <DialogDescription>
                Редактирайте името и описанието на Вашия проект.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Име</FormLabel>
                    <FormControl>
                      <Input placeholder="Име" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Описание</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Описанието на вашия проект..."
                        rows={10} //  ДЕСЕТОТО ЮБИЛЕЙНО ИЗДАНИЕ!!!
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                Запази
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateWebsiteUrlDialog({
  children,
  websiteUrl,
  teamId,
}: React.PropsWithChildren<{ websiteUrl?: string; teamId: string }>) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateWebsiteUrlSchema),
    defaultValues: {
      websiteUrl: websiteUrl,
      teamId,
    },
  });

  const { toast } = useToast();

  const updateWebsiteUrlMutation = useMutation({
    mutationFn: async (data: UpdateWebsiteUrlInput) => {
      const res = await updateProjectWebsiteUrl(data);
      if (!res.success) {
        throw new Error(res.message);
      }
    },
    onSuccess: () => {
      toast({
        title: "Промените са запазени",
        description: "Успешно обновихте линка към демото",
      });
    },
    onError: (error) => {
      toast({
        title: "Нещо се обърка",
        description: error.message,
      });
    },
  });

  async function handleSubmit(data: UpdateWebsiteUrlInput) {
    await updateWebsiteUrlMutation.mutateAsync(data);
    form.reset(
      {
        teamId: data.teamId,
        websiteUrl: data.websiteUrl,
      },
      {
        keepDirty: false,
      },
    );
    form.setValue("websiteUrl", data.websiteUrl, {
      shouldDirty: false,
      shouldTouch: false,
    });
    setOpen(false);
  }

  const willDelete = !form.watch("websiteUrl");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Линк към демо</DialogTitle>
              <DialogDescription>
                Връзка към хостната версия или видео демонстрация на Вашия
                проект.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Линк</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://demo.hacktues.bg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <WebsiteUrlConfirmationDialog
                willDelete={willDelete}
                onClick={form.handleSubmit(handleSubmit)}
              >
                <Button
                  type={willDelete ? "button" : "submit"}
                  disabled={
                    form.formState.isSubmitting || !form.formState.isDirty
                  }
                >
                  Запази
                </Button>
              </WebsiteUrlConfirmationDialog>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function WebsiteUrlConfirmationDialog({
  children,
  willDelete,
  onClick,
}: React.PropsWithChildren<{ willDelete: boolean; onClick: () => void }>) {
  if (!willDelete) {
    return children;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Сигурни ли сте?</AlertDialogTitle>
          <AlertDialogDescription>
            Наистина ли искате да премахнете линка към демото на Вашия проект?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Назад</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            Преманхи линка
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
