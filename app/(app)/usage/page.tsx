"use server";

import { NotLoggedIn } from "@/components/ErrorDisplay";
import { Stats } from "@/components/Stats";
import { getAuthSession } from "@/utils/auth";
import { getUsage } from "@/utils/redis/usage";

export default async function Usage() {
  const session = await getAuthSession();
  if (!session?.user) return <NotLoggedIn></NotLoggedIn>;

  const usage = await getUsage({ email: session.user.email });

  return (
    <div className="max-w-3xl bg-white">
      <Stats
        stats={[
          {
            name: "OpenAI API Calls",
            value: usage?.openaiCalls || 0,
          },
          {
            name: "OpenAI Tokens Used",
            value: usage?.openaiTokensUsed || 0,
          },
        ]}
      />
    </div>
  );
}