"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { LogOutIcon, User } from "lucide-react";

import { IfAnyHTFeatureOn } from "~/app/_integrations/components";
import { NotificationsPopover } from "~/app/_notifications/_components/notifications-popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import { SignInButton, SignOutButton } from "../buttons";
import { DesktopNavigation, MobileNavigation } from "../navigation-server";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { getHeaderData } from "./actions";

export const Header = () => {
  const MAX_OPACITY = 0.7;

  const { scrollY } = useScroll();
  const { data: headerData } = useHeaderData();

  return (
    <animated.header
      style={{
        // @ts-ignore because it works, even though the types don't let me pass variables
        "--header-bg-opacity": scrollY
          .to([0, 100], [0, MAX_OPACITY])
          .to((x) => Math.min(x, MAX_OPACITY)),
      }}
      className="sticky top-0 z-40 flex items-center gap-6 bg-background/[var(--header-bg-opacity)] px-6 py-6 backdrop-blur-md md:py-4"
    >
      <Link
        href="#main-content"
        className="absolute left-1 top-1 z-50 -translate-y-[130%] bg-background/90 p-1 font-semibold ring-offset-background transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Към съдържанието
      </Link>
      <Link
        href="/"
        className="rounded-sm text-center font-llpixel text-2xl text-brand ring-offset-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Hack TUES <span className="text-sand">X</span>
      </Link>
      <DesktopNavigation className="hidden md:block" />
      <div className="w-full flex-1" />
      {headerData &&
        headerData.notifications !== null &&
        headerData.participant && (
          <NotificationsPopover
            notifications={headerData.notifications}
            participant={headerData.participant}
          />
        )}
      {headerData && headerData.avatarName !== null && (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:ring-offset-3 hidden rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden rounded-full focus:bg-white/0 md:inline-flex"
                    asChild
                  >
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback className="uppercase">
                        {headerData.avatarName.at(0) ?? <User />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{headerData.avatarName}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="hidden items-center sm:block md:max-w-[12rem]">
            <DropdownMenuLabel className="text-wrap justify-center text-ellipsis py-3 text-center">
              Здравейте, {headerData.avatarName}
            </DropdownMenuLabel>
            <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
              <Link href="/profile" className="w-full py-3 text-center">
                Моят Профил
              </Link>
            </DropdownMenuItem>
            {headerData.participant && headerData.participant.team != null && (
              <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
                <Link href="/teams/myteam" className="w-full py-3 text-center">
                  Моят отбор
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="default"
                      variant="ghost"
                      className="focus:bg-current/10 hover:bg-current/10 hidden h-full w-full px-0 py-2 md:inline-flex"
                      asChild
                    >
                      <SignOutButton>
                        <div className="hover:bg-current/10 flex items-center focus:bg-current">
                          <LogOutIcon className="scale-90 text-center text-destructive" />
                          <p className="focus:bg-current/10 hover:bg-current/10 ml-2 text-center text-destructive">
                            Изход
                          </p>
                        </div>
                      </SignOutButton>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Изход</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {headerData && headerData.avatarName === null && (
        <div className="hidden gap-2 md:flex">
          <IfAnyHTFeatureOn outOf={["register-alumni", "register-students"]}>
            <Button variant="secondary" asChild>
              <Link href="/signup">Регистрация</Link>
            </Button>
          </IfAnyHTFeatureOn>
          <IfAnyHTFeatureOn outOf={["signin-alumni", "signin-students"]}>
            <Button asChild>
              <SignInButton>
                <Link
                  href="/login"
                  tabIndex={-1}
                  className="pointer-events-none"
                >
                  Вход
                </Link>
              </SignInButton>
            </Button>
          </IfAnyHTFeatureOn>
        </div>
      )}
      <MobileNavigation className="md:hidden" />
    </animated.header>
  );
};

export function useHeaderData() {
  return useQuery({
    queryKey: ["header"],
    queryFn: () => getHeaderData(),
    refetchInterval: 1000 * 60 * 2,
  });
}
