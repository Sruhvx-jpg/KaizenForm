import { userService } from "../../services";
import { publicProcedure, protectedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  regUserViaEmailPassInputModel,
  regUserViaEmailPassOutputModel,
  loginUserViaEmailPassInputModel,
  loginUserViaEmailPassOutputModel,
  getmeOutputModel
} from "./model";
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
    .mutation(async ({ input }) => {
      const { email, password } = input;

      return await userService.loginUserViaEmailPass({
        email,
        password
      });
    }),

  getMe: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getMe"),
        tags: TAGS
      }
    })
    .input(z.void())
    .output(getmeOutputModel)
    .query(async ({ ctx }: any) => {
      return await userService.getMe(ctx.user.sub);
    })
});