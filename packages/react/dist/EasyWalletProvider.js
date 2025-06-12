"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const EasyWalletContext = createContext(undefined);
export function EasyWalletProvider({ googleClientId, redirectUri, rpcUrl, alchemyApiKey, children, }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [address, setAddress] = useState(undefined);
    const [balances, setBalances] = useState(undefined);
    const login = () => {
        const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        url.searchParams.append("client_id", googleClientId); // <-- PUBLIC Client ID
        url.searchParams.append("redirect_uri", redirectUri); // <-- PUBLIC Redirect URI
        url.searchParams.append("response_type", "code");
        url.searchParams.append("scope", "email profile openid");
        window.location.href = url.toString();
    };
    const logout = () => {
        setIsAuthenticated(false);
        setAddress(undefined);
        setBalances(undefined);
        window.location.href = "/";
    };
    return (_jsx(EasyWalletContext.Provider, { value: {
            isAuthenticated,
            address,
            balances,
            login,
            logout,
        }, children: children }));
}
export function useEasyWallet() {
    const context = useContext(EasyWalletContext);
    if (!context) {
        throw new Error("useEasyWallet must be used within an EasyWalletProvider");
    }
    return context;
}
//# sourceMappingURL=EasyWalletProvider.js.map