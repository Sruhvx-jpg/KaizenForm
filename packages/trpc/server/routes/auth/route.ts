import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { userService } from "../../services";
import { publicProcedure, protectedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  regUserViaEmailPassInputModel,
  regUserViaEmailPassOutputModel,
  loginUserViaEmailPassInputModel,
  loginUserViaEmailPassOutputModel,
  getmeOutputModel,
  getmeInputModel,
  refreshAccessTokenOutputModel,
  refreshAccessTokenInputputModel
} from "./model";
import { verifyAccTok } from "../../../../utils/jwtUtils"
import z from "zod"

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  regUserViaEmailPass: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/regUserViaEmailPass"),
        tags: TAGS
      }
    })
    .input(regUserViaEmailPassInputModel)
    .output(regUserViaEmailPassOutputModel)
    .mutation(async ({ input }) => {
      const { fullName, email, password } = input;

      const { id } = await userService.regUserViaEmailPass({
        fullName,
        email,
        password
      });

      return { id };
    }),

  loginUserViaEmailPass: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/loginUserViaEmailPass"),
        tags: TAGS
      }
    })
    .input(loginUserViaEmailPassInputModel)
    .output(loginUserViaEmailPassOutputModel)
    .mutation(async ({ input, ctx }) => {
      const result = await userService.loginUserViaEmailPass(input);

      ctx.res.setHeader("Set-Cookie", [
        `accessToken=${result.accessToken}; HttpOnly; Path=/; SameSite=Lax`,
        `refreshToken=${result.refreshToken}; HttpOnly; Path=/; SameSite=Lax`
      ]);

      return {
        id: result.id,
        fullName: result.fullName,
        email: result.email,
        emailVerified: result.emailVerified
      };
    }),

  getMe: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getMe"),
        tags: TAGS
      }
    })
    .output(getmeOutputModel)
    .query(async ({ ctx }) => {
      const cookies = ctx.req.headers.cookie;

      if (!cookies) {
        throw new Error("No cookies found");
      }

      const accessToken = cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];

      if (!accessToken) {
        throw new Error("Access token missing");
      }

      const payload = verifyAccTok(accessToken);

      return await userService.getMe(payload.sub);
    }),


  refreshAccessToken: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/refreshAccessToken"),
        tags: TAGS
      }
    })
    .input(refreshAccessTokenInputputModel)
    .output(refreshAccessTokenOutputModel)
    .mutation(async ({ ctx }) => {
      const cookies = ctx.req.headers.cookie;

      if (!cookies) {
        throw new Error("No cookies found");
      }

      const refreshToken = cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("refreshToken="))
        ?.split("=")[1];

      if (!refreshToken) {
        throw new Error("Refresh token missing")
      }

      const newAccessToken =
        await userService.refreshAccessToken(refreshToken);

      ctx.res.setHeader("Set-Cookie", [
        `accessToken=${newAccessToken}; HttpOnly; Path=/; SameSite=Lax`
      ])

      return {
        success: true
      }
    })


});