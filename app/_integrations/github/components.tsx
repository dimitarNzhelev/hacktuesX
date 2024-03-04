/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4WHBH61657q
 */
import { PropsWithChildren, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Github,
  Globe,
  Hourglass,
  Lock,
  MoreHorizontal,
  Plus,
  XIcon,
} from "lucide-react";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import { Input } from "~/app/components/ui/input";
import { ScrollArea } from "~/app/components/ui/scroll-area";
import { Skeleton } from "~/app/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/components/ui/tooltip";
import {
  useAddRepo,
  useGithubInstallationPopup,
  useGithubRepos,
  useRemoveRepo,
} from "./hooks";

export function GitHubRepoDialog({ children }: PropsWithChildren<{}>) {
  const [open, setOpen] = useState(false);
  const { data } = useGithubRepos();

  const hasInstallations = data?.length !== 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90vmin]">
        {hasInstallations ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Github /> Управление на GitHub хранилища
              </DialogTitle>
            </DialogHeader>
            <GitHubReposList />
            <DialogFooter>
              <Button
                type="submit"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Готово
              </Button>
            </DialogFooter>
          </>
        ) : (
          <GitHubInstallContent />
        )}
      </DialogContent>
    </Dialog>
  );
}

function GitHubInstallContent() {
  const openPopup = useGithubInstallationPopup();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-center text-2xl font-semibold">
        Свържете Вашия GitHub
      </h1>
      <p className="text-center text-muted-foreground">
        Нямате свързан GitHub профил. Инсталирайте приложението, за да добавите
        хранилища.
      </p>
      <Button onClick={openPopup} size="lg">
        <Github className="mr-2 h-5 w-5" /> Свържи GitHub
      </Button>
    </div>
  );
}

function GitHubReposList() {
  const { data } = useGithubRepos();
  const openPopup = useGithubInstallationPopup();

  if (data?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Input placeholder="Търсене на хранилище" className="mb-4" />
      <ScrollArea className="h-[300px] overflow-y-auto">
        <div className="flex flex-col rounded-lg border">
          {data ? (
            data.map((repo) => (
              <RepoListItem
                key={repo.githubId}
                left={
                  <>
                    <Link
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <strong className="flex items-center gap-1 text-base font-semibold">
                        {repo.isPrivate ? (
                          <Lock className="h-4 w-4 flex-shrink-0 text-gray-50" />
                        ) : (
                          <Globe className="h-4 w-4 flex-shrink-0 text-gray-50" />
                        )}
                        {repo.name}
                      </strong>
                    </Link>
                    {repo.isPrivate && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Това хранилище е частно.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </>
                }
                right={
                  !repo.id ? (
                    <AddRepoButton
                      repoGithubId={repo.githubId}
                      installationId={repo.installationId}
                      isPrivate={repo.isPrivate}
                    />
                  ) : (
                    <RemoveRepoButton repoId={repo.id} />
                  )
                }
              />
            ))
          ) : (
            <RepoListItemSkeleton />
          )}
        </div>
      </ScrollArea>
      <div className="px-3 py-1">
        <p className="text-sm">
          Не намирате хранилището си?
          <Button
            variant="link"
            size="sm"
            className="p-0 ps-1"
            onClick={openPopup}
          >
            Променете разрешенията.
          </Button>
        </p>
      </div>
    </div>
  );
}

function RepoListItem(props: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b p-4 last:border-none">
      <div className="flex items-center gap-2">{props.left}</div>
      <div className="flex items-center">{props.right}</div>
    </div>
  );
}

export const RepoListItemSkeleton = () =>
  Array.from({ length: 4 }).map((_, i) => (
    <RepoListItem
      key={i}
      left={<Skeleton className="h-5 w-[250px]" />}
      right={<Skeleton className="h-9 w-[100px]" />}
    />
  ));

const AddRepoButtonUi = (props: {
  onClick?: () => void;
  isLoading: boolean;
}) => (
  <Button onClick={props.onClick} disabled={props.isLoading} size="sm">
    {props.isLoading ? (
      <MoreHorizontal className="mr-1 h-4 w-4 animate-pulse" />
    ) : (
      <Plus className="mr-1 h-4 w-4" />
    )}{" "}
    Добави
  </Button>
);

export function AddRepoButton(props: {
  repoGithubId: number;
  installationId: number;
  isPrivate: boolean;
}) {
  const addRepo = useAddRepo(props);
  return !props.isPrivate ? (
    <AddRepoButtonUi
      onClick={() => addRepo.mutate()}
      isLoading={addRepo.isPending}
    />
  ) : (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <AddRepoButtonUi isLoading={addRepo.isPending} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Това хранилище е частно</AlertDialogTitle>
          <AlertDialogDescription>
            Не можете да участвате с частни хранилища. Ако продължите, то
            автоматично ще бъде променено на{" "}
            <em className="italic">„Публично“.</em>{" "}
            <strong className="font-bold">
              Това ще го направи видимо от всички!
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Назад</AlertDialogCancel>
          <AlertDialogAction onClick={() => addRepo.mutate()}>
            Направи публично
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function RemoveRepoButton(props: { repoId: number }) {
  const removeRepos = useRemoveRepo(props);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={removeRepos.isPending} variant="ghost" size="icon">
          {removeRepos.isPending ? (
            <Hourglass className="h-4 w-4 animate-pulse" />
          ) : (
            <XIcon className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Сигурни ли сте?</AlertDialogTitle>
          <AlertDialogDescription>
            Наистина ли искате да премахнете това хранилище? Отбор, който няма
            хранилище след края на работното време няма да бъде допуснат до
            полуфинал.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Назад</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeRepos.mutate()}>
            Премахни
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
