"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEasyWallet } from "../hooks/useEasyWallet";
export function LogoutButton() {
    const { logout } = useEasyWallet(); // <-- utilise logout()
    return (_jsx("button", { onClick: logout, className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition", children: "Logout" }));
}
//# sourceMappingURL=LogoutButton.js.map