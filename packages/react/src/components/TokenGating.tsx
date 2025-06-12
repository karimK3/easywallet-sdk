"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ethers } from "ethers";

type ApiMeResponse = {
  loggedIn: boolean;
  address?: string;
};

export function TokenGating() {
  const [threshold, setThreshold] = useState<string>("0");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkBalance = async () => {
    setLoading(true);
    setResult(null);
    try {
      // 1️ Appel à /api/auth/me pour récupérer l’adresse
      const res = await fetch("/api/auth/me");
      const data: ApiMeResponse = await res.json();
      if (!data.loggedIn || !data.address) {
        throw new Error("Vous n’êtes pas connecté");
      }
      const walletAddress = data.address;

      // 2️ Création du provider Alchemy
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

      // 3️ Lecture du solde DAI
      const daiContractAddress = process.env.DAI_CONTRACT_ADDRESS!;
      const ERC20_ABI = [
        "function balanceOf(address) view returns (uint256)",
        "function decimals() view returns (uint8)",
      ];
      const daiContract = new ethers.Contract(daiContractAddress, ERC20_ABI, provider);
      const daiDecimals = await daiContract.decimals();
      const rawDAI = await daiContract.balanceOf(walletAddress);
      const daiBalance = parseFloat(ethers.formatUnits(rawDAI, daiDecimals));

      // 4️ Comparaison avec le seuil
      const thresholdNum = parseFloat(threshold);
      if (isNaN(thresholdNum) || thresholdNum < 0) {
        throw new Error("Seuil invalide");
      }

      if (daiBalance >= thresholdNum) {
        setResult(`✅ Vous détenez ${daiBalance.toFixed(2)} DAI (≥ ${thresholdNum} DAI). Accès autorisé.`);
      } else {
        setResult(`❌ Votre solde DAI (${daiBalance.toFixed(2)}) est inférieur à ${thresholdNum} DAI.`);
      }
    } catch (err: any) {
      setResult(`Erreur : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Token‐Gating : Accès réservé</h2>
      <div className="mb-4">
        <label className="block mb-1">Seuil DAI (ex. 100)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Entrez un montant en DAI"
        />
      </div>
      <button
        onClick={checkBalance}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Vérification…" : "Vérifier mon solde DAI"}
      </button>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
}