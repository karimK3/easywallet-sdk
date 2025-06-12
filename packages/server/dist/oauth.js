import fetch from "node-fetch";
export async function exchangeGoogleCode(code) {
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", process.env.GOOGLE_CLIENT_ID); // PRIVATE côté serveur
    params.append("client_secret", process.env.GOOGLE_CLIENT_SECRET); // PRIVATE côté serveur
    params.append("redirect_uri", process.env.NEXT_PUBLIC_REDIRECT_URI); // PUBLIC Redirect URI
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
    const data = await response.json();
    return {
        accessToken: data.access_token,
        idToken: data.id_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
    };
}
//# sourceMappingURL=oauth.js.map