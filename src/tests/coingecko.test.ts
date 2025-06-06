import { afterEach, vi, it, expect } from "vitest";
import { getPrice } from "../utils/coingecko";

afterEach(() => {
  vi.restoreAllMocks();
});

it("maps CoinGecko response", async () => {
  const mockFetch: typeof fetch = vi.fn(async () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ ethereum: { usd: 123 } })
    })
  ) as unknown as typeof fetch;

  vi.stubGlobal("fetch", mockFetch);

  const prices = await getPrice(["ethereum"]);
  expect(prices.ethereum.usd).toBe(123);
});