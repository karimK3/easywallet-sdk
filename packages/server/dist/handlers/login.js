import { googleOAuthToken, getGoogleUserInfo } from "../auth/googleAuth";
import { verifySiweSignature } from "../auth/siweAuth";
import { createJwt } from "../auth/session";
export async function loginHandler(req, res) {
    if (req.method !== "POST")
        return res.status(405).end("Method not allowed");
    const { code, siweMessage, signature } = req.body;
    try {
        // 1. Google auth token
        const { accessToken } = await googleOAuthToken(code);
        const userInfo = await getGoogleUserInfo(accessToken);
        // 2. Verify SIWE signature
        const isValid = await verifySiweSignature(siweMessage, signature);
        if (!isValid)
            return res.status(401).json({ error: "invalid_siwe_signature" });
        // 3. Create JWT
        const jwt = createJwt({
            email: userInfo.email,
            address: extractAddressFromSiwe(siweMessage),
        });
        // 4. Set cookie + respond
        res.setHeader("Set-Cookie", `easywallet_jwt=${jwt}; Path=/; HttpOnly; SameSite=Lax; Secure`);
        return res.status(200).json({
            user: {
                email: userInfo.email,
                address: extractAddressFromSiwe(siweMessage),
            },
            jwt,
        });
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(400).json({ error: "login_failed" });
    }
}
// Util: naïve SIWE address extractor
function extractAddressFromSiwe(message) {
    var _a, _b;
    const lines = message.split("\n");
    return (_b = (_a = lines.find((l) => l.startsWith("0x"))) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "0x";
}
//# sourceMappingURL=login.js.map