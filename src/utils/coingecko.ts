export async function getPrice(
    ids: string[]
  ): Promise<Record<string, { usd: number; eur: number }>> {
    const query = ids.join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${query}&vs_currencies=usd,eur`
    );
    if (!res.ok) {
      throw new Error(`Coingecko API error: ${res.status}`);
    }
    return await res.json();
  }