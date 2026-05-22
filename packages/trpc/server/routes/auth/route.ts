import { userService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  regUserViaEmailPassInputModel,
  regUserViaEmailPassOutputModel,
  loginUserViaEmailPassInputModel,
  loginUserViaEmailPassOutputModel,
  getmeInputModel,
  getmeOutputModel
} from "./model";

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

      const { id } = await userService.regUserViaEmailPass({fullName, email, password});

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

      const { id, fullName, email, emailVerified, refreshTokens, accesstoken } = await userService.loginUserViaEmailPass({email, password});

      return { id };
    }),

  getMe: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getMe"),
        tags: TAGS
      }
    })
    .input(getmeInputModel)
    .output(getmeOutputModel)
    .query(async ({ input }) => {
      const { id } = input;

      const user = await userService.getMe(id);

      return user;
    })
});