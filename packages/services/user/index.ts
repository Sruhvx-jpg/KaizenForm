import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user"
import { refreshTokens } from "@repo/database/models/refereshToken"
import { regUserViaEmailPassInputType, regUserViaEmailPassInput, loginUserViaEmailPassInput, loginUserViaEmailPassInputType } from "./model";
import apiErr from "../../utils/api-error"
import { hashIT, comparePass } from "../../utils/hashIT"
import { generateAccTok, generateRefTok } from "../../utils/jwtUtils"
// ++++++++++++++++++++++++++++++++++++++++++++++USER AUTH FLOW++++++++++++++++++++++++++++++++++++++++++++++++++++
// 1. Exported Class UserService to services/indexe.ts, and then exported it's instance as userService
// 2. Vannila auth  -> register + login + get user
// 3. google oauth flow 


class UserService {
  private async getUserByEmail(email: string) {
    try {
      const res = await db.select().from(usersTable).where(eq(usersTable.email, email))

      if (!res || res.length == 0) {
        return null
      } else {
        return res[0]
      }
    } catch (error) {
      console.log("fetUserByEmail ERROR:", error)
      throw error
    }
  }

  private async getUserById(userId: string) {
    const res = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!res.length) {
      return null;
    }

    return res[0];
  }


  // register service
  public async regUserViaEmailPass(payload: regUserViaEmailPassInputType): Promise<{ id: string }> {
    try {
      const { fullName, email, password } = await regUserViaEmailPassInput.parseAsync(payload)

      const isEmail = await this.getUserByEmail(email)
      if (isEmail) throw apiErr.dataAlreadyExist()

      const hashedPassword = await hashIT(password)

      const result = await db
        .insert(usersTable)
        .values({ fullName, email, password: hashedPassword })
        .returning({ id: usersTable.id })

      if (!result || result.length == 0 || !result[0]?.id) throw apiErr.unknownErr("-----------error whilest creating user------------")

      return { id: result[0]?.id }
    } catch (error) {
      console.log("++++ register service error ++++")
      throw error
    }
  }

  //login service
  public async loginUserViaEmailPass(payload: loginUserViaEmailPassInputType) {
    try {
      const { email, password } =
        await loginUserViaEmailPassInput.parseAsync(payload);

      const user = await this.getUserByEmail(email);

      if (!user) {
        throw apiErr.unauthorizedAccess();
      }

      const isPasswordValid = await comparePass(
        password,
        user.password
      );

      if (!isPasswordValid) {
        throw apiErr.unauthorizedAccess();
      }

      const accessToken = generateAccTok({ sub: user.id })
      const refreshToken = generateRefTok({ sub: user.id })

      await db.insert(refreshTokens).values({ userId: user.id, token: refreshToken })

      const sanitizedUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        emailVerified: user.emailVerified,
      };
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        emailVerified: user.emailVerified,
        accessToken,
        refreshToken
      };
    } catch (error) {
      console.log("++++ login service error ++++");
      throw error;
    }
  }

  //getme service
  public async getMe(userId: string) {
    try {
      if (!userId) {
        throw apiErr.unauthorizedAccess();
      }

      const user = await this.getUserById(userId);

      if (!user) {
        throw apiErr.dataNotFound("User not found");
      }

      return user;
    } catch (error) {
      console.log("++++ get me service error ++++");
      throw error;
    }
  }
}

export default UserService