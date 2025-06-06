export interface TokenInfo {
    /** ERC-20 contract */
    address: string;
    /** Human-readable symbol (DAI, USDT…) */
    symbol: string;
    /** Coingecko ID */
    coingeckoId: string;
    /** decimals() value on-chain */
    decimals: number;
  }
  
  export const TOKENS: TokenInfo[] = [
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",  // DAI
      symbol: "DAI",
      coingeckoId: "dai",
      decimals: 18,
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",  // USDT
      symbol: "USDT",
      coingeckoId: "tether",
      decimals: 6,
    },
  ];