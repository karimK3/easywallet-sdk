"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEasyWallet } from "../hooks/useEasyWallet";
export function LoginButton() {
    const { login } = useEasyWallet(); // <-- utilise login()
    return (_jsx("button", { onClick: login, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition", children: "Login" }));
}
//# sourceMappingURL=LoginButton.js.map