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
export declare function EasyWalletProvider({ googleClientId, redirectUri, rpcUrl, alchemyApiKey, children, }: EasyWalletProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useEasyWallet(): WalletState;
export {};
//# sourceMappingURL=EasyWalletProvider.d.ts.map