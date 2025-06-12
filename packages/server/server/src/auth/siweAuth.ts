import { ethers } from "ethers";

/**
 * Verify a SIWE (Sign-In With Ethereum) message signature manually.
 * @param message - The SIWE message as a string.
 * @param signature - The signature to verify.
 * @returns `true` if the signature is valid, `false` otherwise.
 */
export async function verifySiweSignature(message: string, signature: string): Promise<boolean> {
  try {
    // Vérification brute : le message est un simple string à signer EIP-191
    const recoveredAddress = ethers.verifyMessage(message, signature);

    // On parse manuellement le SIWE Message
    const parsed = parseSiweMessage(message);

    if (!parsed.address || recoveredAddress.toLowerCase() !== parsed.address.toLowerCase()) {
      console.error("Signature invalid: recovered address does not match SIWE address");
      return false;
    }

    // 👉 Ici, on pourrait rajouter encore plus de vérifications (domain, nonce, issuedAt...)

    return true;
  } catch (err) {
    console.error("Failed to verify SIWE signature:", err);
    return false;
  }
}

/**
 * Parse a SIWE message into its object fields.
 * Very naive parser — only for simple structured SIWE messages.
 */
function parseSiweMessage(message: string) {
  const lines = message.split("\n").map((l) => l.trim());
  const parsed: any = {};

  for (const line of lines) {
    if (line.startsWith("0x") && line.length === 42) {
      parsed.address = line;
    } else if (line.startsWith("URI:")) {
      parsed.uri = line.replace("URI:", "").trim();
    } else if (line.startsWith("Version:")) {
      parsed.version = line.replace("Version:", "").trim();
    } else if (line.startsWith("Chain ID:")) {
      parsed.chainId = line.replace("Chain ID:", "").trim();
    } else if (line.startsWith("Nonce:")) {
      parsed.nonce = line.replace("Nonce:", "").trim();
    } else if (line.startsWith("Issued At:")) {
      parsed.issuedAt = line.replace("Issued At:", "").trim();
    }
  }

  return parsed;
}