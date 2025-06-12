"use client";

import { useEasyWallet } from "../hooks/useEasyWallet";

export function LoginButton() {
  const { login } = useEasyWallet();  // <-- utilise login()

  return (
    <button
      onClick={login}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Login
    </button>
  );
}