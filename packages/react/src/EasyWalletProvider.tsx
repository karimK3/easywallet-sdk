"use client";

import { createContext, useContext, useState } from "react";

interface EasyWalletProviderProps {
  googleClientId: string;
  redirectUri: string;
  rpcUrl: string;
  alchemyApiKey: string;
  children: React.ReactNode;
}

interface WalletState {
  isAuthenticated: boolean;
  address?: string;
  balances?: {
    eth: number;
    totalUsd: number;
  };
  login: () => void;
  logout: () => void;
}

const EasyWalletContext = createContext<WalletState | undefined>(undefined);

export function EasyWalletProvider({
  googleClientId,
  redirectUri,
  rpcUrl,
  alchemyApiKey,
  children,
}: EasyWalletProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balances, setBalances] = useState<WalletState["balances"] | undefined>(undefined);

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

  return (
    <EasyWalletContext.Provider
      value={{
        isAuthenticated,
        address,
        balances,
        login,
        logout,
      }}
    >
      {children}
    </EasyWalletContext.Provider>
  );
}

export function useEasyWallet() {
  const context = useContext(EasyWalletContext);
  if (!context) {
    throw new Error("useEasyWallet must be used within an EasyWalletProvider");
  }
  return context;
}

