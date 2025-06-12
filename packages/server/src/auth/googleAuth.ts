import fetch from "node-fetch";

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
}

interface GoogleUserInfo {
  email: string;
  name: string;
  picture: string;
}

export async function googleOAuthToken(code: string) {
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", process.env.GOOGLE_CLIENT_ID!);         // ✅ PRIVATE
  params.append("client_secret", process.env.GOOGLE_CLIENT_SECRET!); // ✅ PRIVATE
  params.append("redirect_uri", process.env.NEXT_PUBLIC_REDIRECT_URI!); // ✅ PUBLIC, REDIRECT
  params.append("grant_type", "authorization_code");

  console.log("[googleOAuthToken] Params Sent:", Object.fromEntries(params));

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  console.log("[googleOAuthToken] Response Status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[googleOAuthToken] Error Body:", errorText);
    throw new Error(`Failed to exchange code with Google: ${response.status}`);
  }

  const data = (await response.json()) as GoogleTokenResponse;

  return {
    accessToken: data.access_token,
    idToken: data.id_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[getGoogleUserInfo] Error Body:", errorText);
    throw new Error(`Failed to fetch user info from Google: ${response.status}`);
  }

  const data = (await response.json()) as GoogleUserInfo;

  return {
    email: data.email,
    name: data.name,
    picture: data.picture,
  };
}