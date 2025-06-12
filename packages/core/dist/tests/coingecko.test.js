import { test, expect } from 'vitest';
import { getPrice } from "../src/utils/coingecko";
test("getPrice returns a number for bitcoin", async () => {
    const data = await getPrice(["bitcoin"]);
    expect(typeof data.bitcoin.usd).toBe("number");
});
//# sourceMappingURL=coingecko.test.js.map