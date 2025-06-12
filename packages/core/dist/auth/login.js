export async function signInWithGoogleAndWallet(params) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err === null || err === void 0 ? void 0 : err.error) || "login_failed");
    }
    const { user, jwt } = await res.json();
    return { user, jwt };
}
//# sourceMappingURL=login.js.map