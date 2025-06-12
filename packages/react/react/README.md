# ⚛️ EasyWallet React SDK

[![npm](https://img.shields.io/npm/v/@easywallet/react?color=%2360a5fa&label=npm%20version)](https://www.npmjs.com/package/@easywallet/react)
[![npm](https://img.shields.io/npm/dw/@easywallet/react?color=%2390caf9&label=downloads)](https://www.npmjs.com/package/@easywallet/react)
[![GitHub stars](https://img.shields.io/github/stars/karimK3/easywallet?style=social)](https://github.com/karimK3/easywallet)

A powerful React SDK to authenticate users with **Google OAuth + Ethereum wallets**, manage sessions, and enable token-gated experiences — with just a few lines of code.

---

## ✨ Features

- ⚛️ **React Hooks** — Use `useEasyWallet()` to access login/logout/session state
- 🔐 **Google + Wallet Authentication** — Hybrid Web2/Web3 onboarding
- 🧩 **Plug-and-Play Components** — Drop-in buttons and token gating wrapper
- 🌐 **Next.js Ready** — Built for the App Router & modern React Server Components
- 🔑 **JWT Session Management** — Secure, backend-compatible authentication flow

---

## 📦 Installation

```bash
pnpm add @easywallet/react
# or
npm install @easywallet/react
```

---

## 🔧 Usage

### Basic Setup

Wrap your app with the provider:

```tsx
import {
  EasyWalletProvider,
  useEasyWallet,
  LoginButton,
  LogoutButton,
  TokenGating,
} from "@easywallet/react";

export default function App() {
  return (
    <EasyWalletProvider
      googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI!}
      rpcUrl={process.env.NEXT_PUBLIC_RPC_URL!}
      alchemyApiKey={process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!}
    >
      <Main />
    </EasyWalletProvider>
  );
}
```

### Using the Hook

```tsx
function AuthStatus() {
  const { login, logout, isAuthenticated, user } = useEasyWallet();

  return isAuthenticated ? (
    <>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <button onClick={login}>Login with EasyWallet</button>
  );
}
```

---

## 🧱 Exports

```ts
// Top-level exports
export { EasyWalletProvider } from "./EasyWalletProvider";
export { useEasyWallet } from "./hooks/useEasyWallet";
export { LoginButton } from "./components/LoginButton";
export { LogoutButton } from "./components/LogoutButton";
export { TokenGating } from "./components/TokenGating";
```

---

## ✅ Requirements

- **React** 18+
- **Next.js** 13+ (App Router recommended)
- **ENV variables required**:
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
  - `NEXT_PUBLIC_REDIRECT_URI`
  - `NEXT_PUBLIC_RPC_URL`
  - `NEXT_PUBLIC_ALCHEMY_API_KEY`

---

## 🧩 Part of the EasyWallet SDK Suite

This package is part of the [EasyWallet SDK](https://github.com/easywallet/easywallet-sdk):

- [`@easywallet/core`](https://www.npmjs.com/package/@easywallet/core) – Logic for balances, NFTs, auth orchestration
- [`@easywallet/react`](https://www.npmjs.com/package/@easywallet/react) – you are here
- [`@easywallet/server`](https://www.npmjs.com/package/@easywallet/server) – Google + Wallet login backend logic

---

## 📄 License

MIT License © 2025 [EasyWallet](https://easywallet.io)
