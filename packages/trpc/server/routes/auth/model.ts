import { z } from "zod"

const regUserViaEmailPassInputModel = z.object({
    fullName: z.string().describe("fullName of user"),
    email: z.string().describe("email of the user"),
    password: z.string().describe("password of user")
})

const regUserViaEmailPassOutputModel = z.object({
    id: z.string().describe("id of registered user")
})

const loginUserViaEmailPassInputModel = z.object({
    email: z.string().describe("email of the user"),
    password: z.string().describe("password of user")
})

const loginUserViaEmailPassOutputModel = z.object({
    id: z.string().describe("user id")
})

const getmeInputModel = z.object({
    id: z.string().describe("user id")
})

const getmeOutputModel = z.object({
    id: z.string().describe("user id"),
    fullName: z.string().describe("fullName of user"),
    email: z.string().describe("email of the user"),
})

export {
    regUserViaEmailPassInputModel,
    regUserViaEmailPassOutputModel,
    loginUserViaEmailPassInputModel,
    loginUserViaEmailPassOutputModel,
    getmeInputModel,
    getmeOutputModel
}