import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    VERCEL_ENV: z
      .enum(["development", "preview", "production"])
      .optional()
      .default("development"),

    POSTGRES_URL: z.string().url(),
    EMAIL_FROM: z.string().email(),

    DISCORD_BOT_ID: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    DISCORD_GUILD_ID: z.string(),

    NEXTAUTH_SECRET: z.string(),

    R2_ACCOUNT_ID: z.string(),
    R2_ACCESS_URL: z.string(),
    S3_UPLOAD_KEY: z.string(),
    S3_UPLOAD_SECRET: z.string(),
    S3_UPLOAD_BUCKET: z.string(),

    PARTICIPANT_ROLE: z.string(),
    MEMBER_ROLE: z.string(),
    MENTOR_ROLE: z.string(),
    ALUMNI_ROLE: z.string(),

    GMAIL_CLIENT_ID: z.string(),
    GMAIL_REFRESH_TOKEN: z.string(),
    GMAIL_CLIENT_SECRET: z.string(),
    GMAIL_REDIRECT_URI: z.string(),

    GITHUB_WEBHOOK_SECRET: z.string(),
    GITHUB_APP_ID: z.string(),
    GITHUB_PRIVATE_KEY: z.string(),
    // GITHUB_CLIENT_ID: z.string(),

    // TODO: rename
    HOSTNAME: z.string(),
  },
  // XXX: While defining both the client and server schemas in a single file
  //      provides the best developer experience, it also means that your validation
  //      schemas for the server variables will be shipped to the client. If you
  //      consider the **names** of your variables sensitive, you should split your
  //      schemas into two files.
  client: {
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: z.string().url(),
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z.string(),
    NEXT_PUBLIC_GITHUB_APP_SLUG: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  //   runtimeEnv: {
  //     ...
  //   },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GROWTHBOOK_API_HOST:
      process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY:
      process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    NEXT_PUBLIC_GITHUB_APP_SLUG: process.env.NEXT_PUBLIC_GITHUB_APP_SLUG,
  },
});
