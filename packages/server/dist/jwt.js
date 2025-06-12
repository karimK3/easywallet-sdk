import jwt from "jsonwebtoken";
export function createJwt(payload, secret, expiresIn = 604800) {
    const options = {
        expiresIn,
    };
    return jwt.sign(payload, secret, options);
}
export function verifyJwt(token, secret) {
    return jwt.verify(token, secret);
}
//# sourceMappingURL=jwt.js.map