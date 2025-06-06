# EasyWallet SDK

🚀 **Google + Wallet (SIWE) Web3 Authentication SDK**  
Secure, gasless, and easy to integrate in your React/Next.js app.

[![npm version](https://img.shields.io/npm/v/@easywallet/core.svg)](https://www.npmjs.com/package/@easywallet/core)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Key Features

- **Google OAuth 2.0** integration (login with Google).
- **SIWE (Sign-In With Ethereum)** support for wallet-based authentication.
- **JWT session management** (cookie-based, secure, gasless).
- **React Hook**: `useEasyWallet()` for instant integration.
- **TypeScript**-ready, production-quality code.

---

## 🚀 Installation

Install from npm (or yarn, pnpm):

```bash
npm install @easywallet/core
# or
yarn add @easywallet/core
# or
pnpm add @easywallet/core
```

---

## ⚡ Quick Start

### 1. Initialize EasyWallet in your React/Next.js app

```tsx
import { initEasyWallet, useEasyWallet } from '@easywallet/core';

// In a top-level component (e.g. _app.tsx or a Context provider)
useEffect(() => {
  initEasyWallet({
    googleClientId: 'YOUR_GOOGLE_CLIENT_ID',
    redirectUri: 'https://your-domain.com/api/auth/callback',
  });
}, []);
```

### 2. Add a login button

```tsx
import React from 'react';
import { useEasyWallet } from '@easywallet/core';

export default function LoginButton() {
  const { login, isConnected, address, logout } = useEasyWallet();

  if (!isConnected) {
    return (
      <button onClick={login}>
        Login with Google + Wallet
      </button>
    );
  }

  return (
    <div>
      <p>Connected address: {address}</p>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
```

### 3. Create the Next.js API route

Your Next.js project needs an API endpoint to handle Google OAuth callback and SIWE. Add a file:

```
/pages/api/auth/callback.ts
```

Paste this minimal example:

```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleGoogleCallback, handleSiwe } from '@easywallet/core/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send('Missing code');

    // 1. Handle Google OAuth
    const session = await handleGoogleCallback({
      code: code as string,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectUri: 'https://your-domain.com/api/auth/callback',
    });

    // 2. Generate a SIWE message
    const { message: siweMessage, nonce } = await handleSiwe.getMessage({
      address: session.ethAddress,
      statement: 'Sign this message to log in to EasyWallet',
      uri: 'https://your-domain.com',
      version: '1',
      chainId: 1
    });

    // TODO: Send siweMessage to client for signing (example app should handle this).
    // For simplicity, we redirect back with the nonce.
    res.redirect(`/verify?nonce=${encodeURIComponent(nonce)}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
```

> **Note:** You will need to implement the front-end page `/verify` that performs the SIWE signature and finalizes login. See the full docs below.

---

## 📖 Documentation & Examples

🔗 **Live Demo & CodeSandbox**:  
https://codesandbox.io/s/easywallet-core-example

🔗 **Full Documentation**:  
https://docs.easywallet.dev

---

## 📝 Configuration

1. Create a Google OAuth 2.0 Client ID in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).  
   - Set Authorized redirect URI to:  
     ```
     https://your-domain.com/api/auth/callback
     ```
2. In your Next.js project, create a file at the root named `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   NEXTAUTH_URL=https://your-domain.com
   ```
3. Install `@easywallet/core` and follow the Quick Start above.

---

## 🤔 FAQ / Troubleshooting

**Q: “Error: invalid_grant” when handling Google callback**  
- Ensure your `redirectUri` matches exactly the Authorized redirect URI in Google Console.  
- Check that `GOOGLE_CLIENT_SECRET` is correct.

**Q: SIWE signature fails or “Nonce is invalid”**  
- Make sure you store the nonce from `handleSiwe.getMessage` in a cookie or session before redirect.  
- Verify that the `origin` you pass to SIWE matches your frontend’s origin (`https://your-domain.com`).

**Q: Wallet is not detected / user has no MetaMask**  
- The SDK falls back to a simple SIWE popup.  
- For mobile (non-MetaMask), consider using the Passkey-Auth addon (coming soon).

---

## 📦 Package Contents

- **`initEasyWallet(opts)`** — Initialize SDK with Google Client ID and redirect URI.  
- **`useEasyWallet()`** — React hook: returns `{ login(), logout(), isConnected, address }`.  
- **`handleGoogleCallback()`** — Server-side helper to exchange `code` for user session.  
- **`handleSiwe.getMessage()`** — Generate SIWE message.  
- **`handleSiwe.verifyMessage()`** — Verify SIWE signature and create JWT cookie.

---

## 💡 How It Works

1. **Frontend** calls `initEasyWallet({ googleClientId, redirectUri })`.  
2. User clicks **Login** → Google OAuth flow starts.  
3. Google redirects to your Next.js API route `/api/auth/callback`.  
4. Server uses `handleGoogleCallback()` to get user’s Ethereum address.  
5. Server calls `handleSiwe.getMessage()` → returns a SIWE message + nonce.  
6. Frontend prompts user to sign SIWE (MetaMask or injected wallet).  
7. Signed message → server calls `handleSiwe.verifyMessage()` → issues a JWT cookie.  
8. User is now authenticated; you can call `useEasyWallet().address` to get their address.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing & Support

- **Issues**: https://github.com/your-org/easywallet-sdk/issues  
- **Discussions/Questions**: Join our [Discord](https://discord.gg/your-invite)  
- **Pull Requests**: Welcome! Please follow the [Contributing Guide](CONTRIBUTING.md).
