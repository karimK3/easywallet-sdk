# EasyWallet Core SDK

[![npm](https://img.shields.io/npm/v/@easywallet/sdk?color=%2360a5fa&label=npm%20version)](https://www.npmjs.com/package/@easywallet/sdk)
[![npm](https://img.shields.io/npm/dw/@easywallet/sdk?color=%2390caf9&label=downloads)](https://www.npmjs.com/package/@easywallet/sdk)
[![GitHub stars](https://img.shields.io/github/stars/karimK3/easywallet?style=social)](https://github.com/karimK3/easywallet)

Core SDK for EasyWallet. Provides API methods to fetch user balances, NFTs, and wallet information from your server or app.

## Features

- 💰 **Token Balances** — Get real-time ETH and ERC-20 balances.
- 🎨 **NFT Support** — Fetch NFTs held by the user.
- 💵 **Token Prices** — Retrieve token market prices.
- ⚡ **Lightweight and Fast** — Minimal dependencies, server-side ready.

## Installation

```bash
npm install @easywallet/sdk
# or
pnpm add @easywallet/sdk
```

## Usage

```typescript
import { getTokenBalances, getNFTs } from '@easywallet/sdk';

const balances = await getTokenBalances('0xUserWalletAddress');
const nfts = await getNFTs('0xUserWalletAddress');
```

## API Methods

- `getTokenBalances(address: string)` — Returns token balances.
- `getNFTs(address: string)` — Returns NFTs owned by the address.
- `getTokenPrice(tokenAddress: string)` — Fetch current token price (optional).

## License

MIT License © 2025 EasyWallet
