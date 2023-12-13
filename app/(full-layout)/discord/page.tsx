import { cookies } from "next/headers";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

import { signInRedirect } from "~/app/api/auth/session";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { env } from "~/app/env.mjs";
import { DiscordLoadingLink } from "./_components/discord-loading-link";

export default async function DiscordPage() {
  const userCookies = cookies();
  if (userCookies.has("next-auth.session-token")) {
    const response = await fetch(`${env.NEXTAUTH_URL}api/checkAuthentication`, {
      credentials: "include",
      headers: {
        cookie: `next-auth.session-token=${userCookies.get(
          "next-auth.session-token",
        )?.value}`,
      },
    });

    const { hasConnectedDiscord } = (await response.json()).body;
    return hasConnectedDiscord ? (
      <Card className="mt-20 p-5">
        <div className="max-w-lg items-center justify-center text-center">
          <h1 className="scroll-m-20 pb-2 font-htags text-3xl font-semibold tracking-tight first:mt-0">
            Успешно свързахте своя Discord профил!
          </h1>
          <Separator />
          <p className="text-center text-sm leading-7 [&:not(:first-child)]:mt-6">
            Можете да премахнете своя Discord профил от{" "}
            <span className="font-llpixel">Hack&nbsp;TUES&nbsp;X</span>.
          </p>
          <div className="py-2" />
          <DiscordLoadingLink href="/api/discord/remove" variant="destructive">
            <XIcon className="mr-2 inline-block h-4 w-4" /> Премахни Discord
          </DiscordLoadingLink>
        </div>
      </Card>
    ) : (
      <Card className="mt-20 p-5">
        <div className="max-w-lg items-center justify-center text-center">
          <h2 className="scroll-m-20 border-b pb-2 font-htags text-3xl font-semibold tracking-tight first:mt-0">
            Още малко остава!
          </h2>
          <h2 className="text-center text-lg leading-7 [&:not(:first-child)]:mt-6">
            Свържете своя Discord профил и станете част от Discord сървъра на{" "}
            <span className="font-llpixel">Hack&nbsp;TUES&nbsp;X</span>!
          </h2>
          <div className="pb-6 pt-12">
            <DiscordLoadingLink
              href="/api/discord"
              className="bg-blue-500 text-white hover:bg-blue-500/90"
              size="lg"
            >
              <FaDiscord className="mr-2 h-5 w-5" />
              Свържи Discord
            </DiscordLoadingLink>
          </div>
          <div className="py-6">
            <Separator />
          </div>
          <p className="text-sm text-muted-foreground">
            През Discord ще се осъществява комуникацията с вашия отбор. Ако
            нямате регистрация в Discord, е необходимо да се регистрирате за да
            участвате в{" "}
            <span className="font-llpixel">Hack&nbsp;TUES&nbsp;X</span>.
          </p>
        </div>
      </Card>
    );
  }
  signInRedirect();
}