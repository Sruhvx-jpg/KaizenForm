import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { createContext } from "./context";
import { verifyAccTok } from "../../utils/jwtUtils";

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

const rateLimitStore = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

const rateLimitMiddleware = tRPCContext.middleware(async ({ ctx, path, next }: any) => {
  const ip =
    ctx.req.headers["x-forwarded-for"]?.toString() ||
    ctx.req.socket.remoteAddress ||
    "unknown";

  const key = `${ip}:${path}`;
  const now = Date.now();

  const existing = rateLimitStore.get(key);

  if (!existing) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    });

    return next();
  }

  if (now > existing.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    });

    return next();
  }

  if (existing.count >= MAX_REQUESTS) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Rate limit exceeded"
    });
  }

  existing.count += 1;

  return next();
});

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
    .use(rateLimitMiddleware)
    .use(authMiddleware);