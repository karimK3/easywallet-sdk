"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ethers } from "ethers";
export function TokenGating() {
    const [threshold, setThreshold] = useState("0");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const checkBalance = async () => {
        setLoading(true);
        setResult(null);
        try {
            // 1️ Appel à /api/auth/me pour récupérer l’adresse
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (!data.loggedIn || !data.address) {
                throw new Error("Vous n’êtes pas connecté");
            }
            const walletAddress = data.address;
            // 2️ Création du provider Alchemy
            const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
            // 3️ Lecture du solde DAI
            const daiContractAddress = process.env.DAI_CONTRACT_ADDRESS;
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
            }
            else {
                setResult(`❌ Votre solde DAI (${daiBalance.toFixed(2)}) est inférieur à ${thresholdNum} DAI.`);
            }
        }
        catch (err) {
            setResult(`Erreur : ${err.message}`);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-md mx-auto", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Token\u2010Gating : Acc\u00E8s r\u00E9serv\u00E9" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-1", children: "Seuil DAI (ex. 100)" }), _jsx("input", { type: "number", min: "0", step: "0.01", value: threshold, onChange: (e) => setThreshold(e.target.value), className: "w-full p-2 border rounded", placeholder: "Entrez un montant en DAI" })] }), _jsx("button", { onClick: checkBalance, disabled: loading, className: "w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50", children: loading ? "Vérification…" : "Vérifier mon solde DAI" }), result && _jsx("p", { className: "mt-4", children: result })] }));
}
//# sourceMappingURL=TokenGating.js.map