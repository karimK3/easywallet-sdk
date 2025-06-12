export interface PriceData {
    [id: string]: {
        usd: number;
    };
}
/**
 * Fetches current USD prices for given Coingecko IDs.
 * @param ids Array of Coingecko token IDs
 * @returns Promise resolving to an object mapping IDs to USD prices
 */
export declare function getPrice(ids: string[]): Promise<PriceData>;
//# sourceMappingURL=coingecko.d.ts.map