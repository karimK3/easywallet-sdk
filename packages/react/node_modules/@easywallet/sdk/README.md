# 🧠 EasyWallet Core SDK


[![npm](https://img.shields.io/npm/v/@easywallet/sdk?color=%2360a5fa&label=npm%20version)](https://www.npmjs.com/package/@easywallet/sdk)
[![npm](https://img.shields.io/npm/dw/@easywallet/sdk?color=%2390caf9&label=downloads)](https://www.npmjs.com/package/@easywallet/sdk)
[![GitHub stars](https://img.shields.io/github/stars/karimK3/easywallet?style=social)](https://github.com/karimK3/easywallet)


The **core engine** behind EasyWallet — a lightweight, server-ready SDK that fetches wallet data such as balances, NFTs, token prices, and handles combined authentication using Google OAuth and Ethereum wallets.

---

## 🚀 Features

- 💰 **Token Balances** — Get real-time ETH and ERC‑20 balances (USDC, DAI, USDT, etc.)
- 🎨 **NFT Fetching** — Retrieve NFTs owned by a wallet address
- 💵 **Market Prices** — Access current token prices (USD)
- 🔐 **Authentication** — Google + Ethereum (SIWE) login in one step
- ⚡ **Fast & Lightweight** — No heavy dependencies, server-first design

---

## 📦 Installation

```bash
npm install @easywallet/core
# or
pnpm add @easywallet/core
```

---

## 🛠️ Usage

```ts
import {
  getTokenBalances,
  getNFTs,
  getTokenPrice,
  signInWithGoogleAndWallet
} from '@easywallet/core';

const balances = await getTokenBalances('0xUserWalletAddress');
const nfts = await getNFTs('0xUserWalletAddress');
const daiPrice = await getTokenPrice('0x6B175474E89094C44Da98b954EedeAC495271d0F');

const session = await signInWithGoogleAndWallet({
  walletAddress: '0xUserWalletAddress',
  walletProvider: window.ethereum,
  idToken: 'google-oauth-id-token'
});
```

---

## 📚 API Reference

### `getTokenBalances(address: string)`
Returns the ETH and ERC‑20 balances of a wallet.

### `getNFTs(address: string)`
Lists NFTs owned by the address.

### `getTokenPrice(tokenAddress: string)`
Returns the current USD price of a token.

### `signInWithGoogleAndWallet({ walletAddress, walletProvider, idToken })`
Authenticates the user using both Google and Ethereum wallet signature (SIWE).

#### Parameters

| Name            | Type     | Description                             |
|-----------------|----------|-----------------------------------------|
| `walletAddress` | `string` | The user's Ethereum address             |
| `walletProvider`| `any`    | Injected provider (e.g. MetaMask)       |
| `idToken`       | `string` | Google OAuth ID token (JWT)             |

#### Returns

A verified **EasyWallet session object**, signed via SIWE.

---

## 🧩 Part of the EasyWallet SDK Suite

This package is part of the [EasyWallet SDK](https://github.com/easywallet/easywallet-sdk):

- [`@easywallet/core`](https://www.npmjs.com/package/@easywallet/core) – you are here.
- [`@easywallet/react`](https://www.npmjs.com/package/@easywallet/react) – React UI components.
- [`@easywallet/server`](https://www.npmjs.com/package/@easywallet/server) – Google OAuth2 + SIWE backend integration.

---

## 🪪 License

MIT License © 2025 [EasyWallet](https://easywallet.io)
