import fetch from "node-fetch";

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function exchangeGoogleCode(code: string) {
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", process.env.GOOGLE_CLIENT_ID!);        // PRIVATE côté serveur
  params.append("client_secret", process.env.GOOGLE_CLIENT_SECRET!); // PRIVATE côté serveur
  params.append("redirect_uri", process.env.NEXT_PUBLIC_REDIRECT_URI!); // PUBLIC Redirect URI
  params.append("grant_type", "authorization_code");

  console.log("[exchangeGoogleCode] Params Sent:", Object.fromEntries(params));

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  console.log("[exchangeGoogleCode] Response Status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[exchangeGoogleCode] Error Body:", errorText);
    throw new Error(`Failed to exchange code with Google: ${response.status}`);
  }

  const data = await response.json() as GoogleTokenResponse;

  return {
    accessToken: data.access_token,
    idToken: data.id_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}