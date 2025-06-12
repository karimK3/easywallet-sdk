import jwt, { SignOptions } from "jsonwebtoken";

export function createJwt(payload: object, secret: jwt.Secret, expiresIn: number = 604800) {
  const options: SignOptions = {
    expiresIn,
  };
  return jwt.sign(payload, secret, options);
}

export function verifyJwt(token: string, secret: jwt.Secret) {
  return jwt.verify(token, secret);
}