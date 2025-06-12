export interface PriceData {
    [id: string]: { usd: number };
  }
  
  /**
   * Fetches current USD prices for given Coingecko IDs.
   * @param ids Array of Coingecko token IDs
   * @returns Promise resolving to an object mapping IDs to USD prices
   */
  export async function getPrice(ids: string[]): Promise<PriceData> {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Coingecko API error: ${res.status}`);
    }
    const data = (await res.json()) as PriceData;
    return data;
  }