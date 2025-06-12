export async function signInWithGoogleAndWallet(params: {
    code: string;
    siweMessage: string;
    signature: string;
  }) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || "login_failed");
    }
  
    const { user, jwt } = await res.json();
    return { user, jwt };
  }