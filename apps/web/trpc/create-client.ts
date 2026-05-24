import { httpLink, httpBatchStreamLink } from "@repo/trpc/client";
import superjson from "superjson";
import { env } from "~/env.js";

interface CreateTRPCHttpBatchClientClientOpts {
  enableStreaming?: boolean;
}

export const createTRPCHttpBatchClientClient = (opts?: CreateTRPCHttpBatchClientClientOpts) => {
  const c = opts?.enableStreaming ? httpBatchStreamLink : httpLink;
  const apiUrl = env.NEXT_PUBLIC_API_URL
    ? `${env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/trpc`
    : "/trpc";

  return c({
    url: apiUrl,
    transformer: superjson,
    fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    },
  });
};
