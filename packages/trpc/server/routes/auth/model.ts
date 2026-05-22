import { success, z } from "zod";

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
  emailVerified: z.any(),
});

const getmeOutputModel = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
});

const getmeInputModel = z.object({
    accessToken: z.string().describe("access token of the user")
})

const refreshAccessTokenOutputModel = z.object({
    success: z.boolean().describe("flag for refresh access token endpoint")
})

const refreshAccessTokenInputputModel = z.object({
    refreshtoken: z.string().describe("refresh token")
})


export {
  regUserViaEmailPassInputModel,
  regUserViaEmailPassOutputModel,
  loginUserViaEmailPassInputModel,
  loginUserViaEmailPassOutputModel,
  getmeOutputModel,
  getmeInputModel,
  refreshAccessTokenOutputModel,
  refreshAccessTokenInputputModel
};