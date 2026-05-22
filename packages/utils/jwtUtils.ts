import jwt from "jsonwebtoken"
import "dotenv/config";

type payload = {
    sub: string
}

const generateRefTok = (payload: payload) => {
    return jwt.sign({...payload, type: "refresh"}, process.env.JWT_REFRESH_SECRET!, {expiresIn: "15m"})
}

const generateAccTok = (payload: payload) => {
    return jwt.sign({...payload, type: "access"}, process.env.JWT_ACCESS_SECRET!, {expiresIn: "30d"})
}

const verifyAccTok = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};

const verifyRefTok = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};

export {
    generateAccTok,
    generateRefTok,
    verifyAccTok,
    verifyRefTok
}