import React from "react";
type Balances = {
    eth: number;
    tokens: {
        symbol: string;
        amount: number;
        valueUsd: number;
    }[];
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
export declare const EasyWalletProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useEasyWallet: () => EasyWalletContext;
export {};
//# sourceMappingURL=useEasyWallet.d.ts.map