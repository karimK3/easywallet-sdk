# 🧰 EasyWallet SDK

The official SDK suite for **EasyWallet** — a modular toolkit to integrate **Google OAuth + Ethereum (SIWE)** authentication and wallet utilities into your Web3 apps, both frontend and backend.

---

## 🔥 What is EasyWallet?

**EasyWallet** combines traditional authentication (Google OAuth 2.0) with **Web3 identity** (Ethereum wallets + SIWE) into a seamless developer experience — and ships with ready-to-use SDKs for every layer of your app.

This repository includes the **core packages** of the EasyWallet platform:

- 🧠 `@easywallet/core` — Fetch token balances, NFTs, and perform hybrid auth
- 🛡️ `@easywallet/server` — Google + Wallet auth handler for Node.js/Next.js APIs
- ⚛️ `@easywallet/react` — Plug-and-play React components and hooks

---

## 📦 Packages

| Package | Description |
|--------|-------------|
| [`@easywallet/core`](./packages/core) | Core logic: balances, NFTs, auth orchestration |
| [`@easywallet/react`](./packages/react) | React provider, login/logout buttons, hooks |
| [`@easywallet/server`](./packages/server) | Server-side login (Google + SIWE + JWT) |

All packages are published to [npm](https://www.npmjs.com/org/easywallet) under the `@easywallet` scope.

---

## 📦 Installation (example)

```bash
pnpm add @easywallet/core @easywallet/react @easywallet/server
```

---

## 🛠️ Use Cases

- 🪪 Authenticate users with **Google + Wallet** (SIWE)
- 🎨 Build React UIs with **auth hooks & token gating**
- 🧾 Access **ETH, ERC-20, NFT** balances with simple SDK calls
- 🪙 Query **live token prices** (USD)
- ✅ Integrate in **Next.js, Node.js, Express**, or your own stack

---

## 🔁 Publishing & Versioning

This monorepo uses **PNPM workspaces** and is designed for **automated publishing** with GitHub Actions and (optionally) [`changesets`](https://github.com/changesets/changesets) to manage version bumps and changelogs.

---

## 🛣️ Roadmap

- [x] Public release of `@easywallet/core`, `react`, and `server`
- [ ] Add `@easywallet/webauthn` (Passkey login add-on)
- [ ] Add `@easywallet/multichain` (Base, Polygon, BNB)
- [ ] Add `@easywallet/onramp` (MoonPay / Transak integration)
- [ ] Auto-sync from private monorepo to public SDK repo

---

## 🙌 Contributing

Pull requests are welcome! Please open an issue first if you're unsure.  
We follow [semantic versioning](https://semver.org/) and recommend small, focused PRs.

---

## 📜 License

MIT License © 2025 [EasyWallet](https://easywallet.io)
