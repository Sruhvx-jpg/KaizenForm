import z from "zod";

 const regUserViaEmailPassInput = z.object({
    fullName: z.string().describe("fullName of user"),
    email: z.string().describe("email of the user"),
    password: z.string().describe("password of user")
})

type regUserViaEmailPassInputType = z.infer<typeof regUserViaEmailPassInput>;

const loginUserViaEmailPassInput = z.object({
  email: z.email(),
  password: z.string().min(8)
});

type loginUserViaEmailPassInputType = z.infer<typeof loginUserViaEmailPassInput>;

export {
  regUserViaEmailPassInput,
  type regUserViaEmailPassInputType,
  loginUserViaEmailPassInput,
  type loginUserViaEmailPassInputType
}