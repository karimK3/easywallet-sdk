import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export function createJwt(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "24h",
    });
}
export function getSession(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return payload;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=session.js.map