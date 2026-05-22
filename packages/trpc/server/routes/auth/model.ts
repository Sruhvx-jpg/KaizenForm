import { z } from "zod";

const regUserViaEmailPassInputModel = z.object({
  fullName: z.string().describe("fullName of user"),
  email: z.string().email().describe("email of user"),
  password: z.string().describe("password of user")
});

const regUserViaEmailPassOutputModel = z.object({
  id: z.string().describe("id of registered user")
});

const loginUserViaEmailPassInputModel = z.object({
  email: z.string().email().describe("email of user"),
  password: z.string().describe("password of user")
});

const loginUserViaEmailPassOutputModel = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  accessToken: z.string(),
  refreshToken: z.string()
});

const getmeOutputModel = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  emailVerified: z.boolean()
});

export {
  regUserViaEmailPassInputModel,
  regUserViaEmailPassOutputModel,
  loginUserViaEmailPassInputModel,
  loginUserViaEmailPassOutputModel,
  getmeOutputModel
};