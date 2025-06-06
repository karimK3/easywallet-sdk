# EasyWallet SDK

EasyWallet SDK is a plug-and-play JavaScript/TypeScript library for fast and secure Web3 authentication using Google OAuth combined with Sign-In with Ethereum (SIWE). Designed to be simple, gas-less, and developer-friendly.

## Features

- ✨ **Hybrid Authentication**: Google OAuth 2.0 + SIWE.
- 📈 **Real-time Token Balances**: Fetch ERC-20, ERC-721 assets.
- 🏦 **NFT Previews**: Visualize user NFTs instantly.
- 🚀 **Quick Setup**: Add authentication in minutes.
- 📅 **Gas-less**: Auth is fully off-chain.
- 💡 **Extensible**: Hooks and components ready to customize.

## Installation

```bash
npm install @easywallet/core
```

or

```bash
yarn add @easywallet/core
```

## Quick Start

### 1. Setup Provider

Wrap your app with `EasyWalletProvider`:

```tsx
// app/layout.tsx
"use client";
import { EasyWalletProvider } from "@easywallet/core";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EasyWalletProvider>
          {children}
        </EasyWalletProvider>
      </body>
    </html>
  );
}
```

### 2. Use EasyWallet Hook

```tsx
import { useEasyWallet } from "@easywallet/core";

export default function Dashboard() {
  const { user, connect, disconnect, tokens, nfts } = useEasyWallet();

  return (
    <div>
      {!user ? (
        <button onClick={connect}>Sign In</button>
      ) : (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={disconnect}>Sign Out</button>

          <h2>Your Tokens:</h2>
          {tokens.map((token) => (
            <div key={token.address}>{token.symbol}: {token.balance}</div>
          ))}

          <h2>Your NFTs:</h2>
          {nfts.map((nft) => (
            <div key={nft.tokenId}>{nft.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Documentation

For complete setup, configuration options, and advanced use cases, check the [Documentation](https://github.com/KarimK3/easywallet-sdk).

## License

MIT License.

---

Built with ❤️ by [Karim Koriche](https://github.com/KarimK3).