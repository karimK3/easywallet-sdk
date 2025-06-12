import type { NextApiRequest, NextApiResponse } from "next";
import { googleOAuthToken, getGoogleUserInfo } from "../auth/googleAuth";
import { verifySiweSignature } from "../auth/siweAuth";
import { createJwt } from "../auth/session";

export async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { code, siweMessage, signature } = req.body as {
    code: string;
    siweMessage: string;
    signature: string;
  };

  try {
    // 1. Google auth token
    const { accessToken } = await googleOAuthToken(code);
    const userInfo = await getGoogleUserInfo(accessToken);

    // 2. Verify SIWE signature
    const isValid = await verifySiweSignature(siweMessage, signature);
    if (!isValid) return res.status(401).json({ error: "invalid_siwe_signature" });

    // 3. Create JWT
    const jwt = createJwt({
      email: userInfo.email,
      address: extractAddressFromSiwe(siweMessage),
    });

    // 4. Set cookie + respond
    res.setHeader(
      "Set-Cookie",
      `easywallet_jwt=${jwt}; Path=/; HttpOnly; SameSite=Lax; Secure`
    );

    return res.status(200).json({
      user: {
        email: userInfo.email,
        address: extractAddressFromSiwe(siweMessage),
      },
      jwt,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(400).json({ error: "login_failed" });
  }
}

// Util: naïve SIWE address extractor
function extractAddressFromSiwe(message: string): string {
  const lines = message.split("\n");
  return lines.find((l) => l.startsWith("0x"))?.trim() ?? "0x";
}