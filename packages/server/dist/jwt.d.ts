import jwt from "jsonwebtoken";
export declare function createJwt(payload: object, secret: jwt.Secret, expiresIn?: number): string;
export declare function verifyJwt(token: string, secret: jwt.Secret): string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map