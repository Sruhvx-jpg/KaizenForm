import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { createContext } from "./context";
import { verifyAccTok } from "../../utils/jwtUtils";
import { redis } from "../../utils/initRedis"

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});



const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

const fixedWindowRateLimiter = tRPCContext.middleware(async ({ ctx, next }: any) => {
  const ip = ctx.req.headers.get("x-forwarded-for")?.split(",")[0]!

  const key = `FWRL:${ip}`
  const curr = await redis.incr(key)

  if (curr === 1) {
    await redis.expire(key, 60)
  }

  if (curr > 5) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests. Try again later.",
    });
  }

  return next();
})

const authMiddleware = tRPCContext.middleware(async ({ ctx, next }: any) => {
  const authHeader = ctx.req.headers.authorization;

  if (!authHeader) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authorization header missing"
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid authorization format"
    });
  }

  try {
    const payload = verifyAccTok(token);

    return next({
      ctx: {
        ...ctx,
        user: payload
      }
    });
  } catch {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid or expired access token"
    });
  }
});

export const router = tRPCContext.router;

export const publicProcedure =
  tRPCContext.procedure;

export const protectedProcedure =
  tRPCContext.procedure
    .use(fixedWindowRateLimiter)
    .use(authMiddleware);