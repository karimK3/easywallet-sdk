"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import {
  getPrice,
  TOKENS,
  TokenInfo,
  signInWithGoogleAndWallet,
} from "@easywallet/core";

type Balances = {
  eth: number;
  tokens: { symbol: string; amount: number; valueUsd: number }[];
  nfts: number;
  totalUsd: number;
};

type EasyWalletContext = {
  isAuthenticated: boolean;
  loading: boolean;
  address: string | null;
  balances: Balances | null;
  login(): Promise<void>;
  logout(): Promise<void>;
  refresh(): Promise<void>;
};

const Ctx = createContext<EasyWalletContext | undefined>(undefined);

export const EasyWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuth] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balances, setBalances] = useState<Balances | null>(null);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const { loggedIn } = (await res.json()) as { loggedIn: boolean };
      setAuth(loggedIn);
      if (!loggedIn) {
        setAddress(null);
        setBalances(null);
      }
    } catch {
      setAuth(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const [addr] = await (window as any).ethereum.request({ method: "eth_accounts" });
      setAddress(addr);

      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      const rawEth = await provider.getBalance(addr);
      const eth = parseFloat(ethers.formatEther(rawEth));

      const tokenBalances: {
        symbol: string;
        amount: number;
        valueUsd: number;
        coingeckoId: string;
      }[] = [];

      for (const { address: tokenAddr, symbol, decimals, coingeckoId } of TOKENS) {
        const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];
        const c = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
        const raw = await c.balanceOf(addr);
        const amount = parseFloat(ethers.formatUnits(raw, decimals));
        tokenBalances.push({ symbol, amount, valueUsd: 0, coingeckoId });
      }

      const prices = await getPrice(["ethereum", ...TOKENS.map((t: TokenInfo) => t.coingeckoId)]);
      const ethUsd = Number(prices.ethereum ?? 0);
      let total = eth * ethUsd;

      tokenBalances.forEach(t => {
        const p = Number(prices[t.coingeckoId] ?? 0);
        t.valueUsd = t.amount * p;
        total += t.valueUsd;
      });

      const nfts = 0;

      setBalances({ eth, tokens: tokenBalances, nfts, totalUsd: total });
    } catch (err) {
      console.error("[EasyWallet] refresh error:", err);
    }
  }, [isAuthenticated]);

  const login = useCallback(async () => {
    try {
      // 🔐 OAuth code (dev temporaire → remplacé par vrai code plus tard)
      const code = "fake_google_code";

      const [addr] = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const siweMessage = `Sign in to EasyWallet\n${addr}`;
      const signature = await (window as any).ethereum.request({
        method: "personal_sign",
        params: [siweMessage, addr],
      });

      await signInWithGoogleAndWallet({ code, siweMessage, signature });

      await checkSession();
      await refresh();
    } catch (err) {
      console.error("[EasyWallet] login error:", err);
    }
  }, [checkSession, refresh]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await checkSession();
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) refresh();
  }, [isAuthenticated, refresh]);

  return (
    <Ctx.Provider
      value={{
        isAuthenticated,
        loading,
        address,
        balances,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useEasyWallet = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEasyWallet must be used inside EasyWalletProvider");
  return ctx;
};