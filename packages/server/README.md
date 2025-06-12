# 🛡️ EasyWallet Server SDK

[![npm](https://img.shields.io/npm/v/@easywallet/server?color=%2360a5fa&label=npm%20version)](https://www.npmjs.com/package/@easywallet/server)
[![npm](https://img.shields.io/npm/dw/@easywallet/server?color=%2390caf9&label=downloads)](https://www.npmjs.com/package/@easywallet/server)
[![GitHub stars](https://img.shields.io/github/stars/karimK3/easywallet?style=social)](https://github.com/karimK3/easywallet)

Server-side SDK for EasyWallet. Provides authentication with Google OAuth and Wallet (SIWE) on the backend.

The **backend SDK** for EasyWallet, enabling secure authentication via **Google OAuth 2.0 + Ethereum wallet signature (SIWE)** in Node.js and serverless environments.

---

## 🚀 Features

- 🔐 **OAuth 2.0 Authentication** — Sign in with Google
- 🦊 **SIWE (Sign-In With Ethereum)** — Authenticate Ethereum wallets
- 🔑 **JWT Token Management** — Issue and verify secure sessions
- ⚙️ **Works with Next.js API Routes** — Drop-in support for modern apps

---

## 📦 Installation

```bash
pnpm add @easywallet/server
# or
npm install @easywallet/server
```

---

## 🛠️ Usage (Next.js App Router)

```ts
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { loginHandler } from "@easywallet/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return loginHandler(body); // internally handles SIWE + JWT session
}
```

---

## 🔐 Environment Variables

| Variable            | Description                          |
|---------------------|--------------------------------------|
| `GOOGLE_CLIENT_ID`  | Your Google OAuth Client ID          |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret   |
| `JWT_SECRET`        | Secret key for signing JWT sessions  |

---

## 🧩 Part of the EasyWallet SDK Suite

This package is part of the [EasyWallet SDK](https://github.com/easywallet/easywallet-core):

- [`@easywallet/core`](https://www.npmjs.com/package/@easywallet/core) – Logic for token balances, NFTs, prices, and auth orchestration
- [`@easywallet/react`](https://www.npmjs.com/package/@easywallet/react) – React UI components for wallet connection and session handling
- [`@easywallet/server`](https://www.npmjs.com/package/@easywallet/server) – this package

---

## 🪪 License

MIT License © 2025 [EasyWallet](https://easywallet.io)
