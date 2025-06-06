import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { ethers } from "ethers";
  import { getPrice } from "../utils/coingecko";
  import { TOKENS } from "../utils/tokens";
  
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
    login(): void;
    logout(): Promise<void>;
    refresh(): Promise<void>;
  };
  
  const Ctx = createContext<EasyWalletContext | undefined>(undefined);
  
  export const EasyWalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setAuth] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [balances, setBalances] = useState<Balances | null>(null);
  
    /** Vérifie la session via l’API interne */
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
  
    /** Récupère l’addresse + balances depuis la blockchain */
    const refresh = useCallback(async () => {
      if (!isAuthenticated) return;
  
      try {
        // 1. Adresse depuis MetaMask (déjà connectée après login)
        const [addr] = await (window as any).ethereum.request({ method: "eth_accounts" });
        setAddress(addr);
  
        // 2. Provider RPC (URL publique passée en env)
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
        const rawEth = await provider.getBalance(addr);
        const eth = parseFloat(ethers.formatEther(rawEth));
  
        // 3. Tokens ERC-20 (connus)
        const tokenBalances: {
          symbol: string;
          amount: number;
          valueUsd: number;
          coingeckoId: string;        // ← on le stocke aussi
        }[] = [];

        for (const { address: tokenAddr, symbol, decimals, coingeckoId } of TOKENS) {
          const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];
          const c = new ethers.Contract(tokenAddr, ERC20_ABI, provider);

          const raw = await c.balanceOf(addr);
          const amount = parseFloat(ethers.formatUnits(raw, decimals));

          tokenBalances.push({ symbol, amount, valueUsd: 0, coingeckoId });   // ← ajouté
        }

        // 4. Prix USD
        const prices = await getPrice([
          "ethereum",
          ...TOKENS.map(t => t.coingeckoId),
        ]);
        
        const ethUsd = Number(prices.ethereum ?? 0);
        let total = eth * ethUsd;
        
        tokenBalances.forEach(t => {
          const p = Number(prices[t.coingeckoId] ?? 0);
          t.valueUsd = t.amount * p;
          total += t.valueUsd;
        });
  
        // TODO : fetch NFT count via Alchemy
        const nfts = 0;
  
        setBalances({ eth, tokens: tokenBalances, nfts, totalUsd: total });
      } catch (err) {
        console.error("[EasyWallet] refresh error:", err);
      }
    }, [isAuthenticated]);
  
    /** Login → redirection Google */
    const login = () => {
      window.location.href = "/api/auth/google";
    };
  
    /** Logout */
    const logout = async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      await checkSession();
    };
  
    // Vérifie la session au montage
    useEffect(() => {
      checkSession();
    }, []);
  
    // Rafraîchit les balances dès qu’on est authentifié
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