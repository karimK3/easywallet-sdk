import jwt from "jsonwebtoken";
interface JwtPayload {
    address: string;
    email: string;
}
export declare function createJwt(payload: JwtPayload): string;
export declare function getSession(token: string): string | jwt.JwtPayload | null;
export {};
//# sourceMappingURL=session.d.ts.map