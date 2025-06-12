"use client";

import { useEasyWallet } from "../hooks/useEasyWallet";

export function LogoutButton() {
  const { logout } = useEasyWallet(); // <-- utilise logout()

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}