// packages/server/src/siwe.ts

import { SiweMessage } from "siwe";

export function generateSiweMessage(address: string, domain: string, statement: string) {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: domain,
    version: "1",
    chainId: 1,
    nonce: Math.random().toString(36).substring(2, 15),
  });

  return message.prepareMessage();
}

export async function verifySiweSignature(message: string, signature: string) {
  const siwe = new SiweMessage(message);
  const fields = await siwe.verify({ signature });
  return fields.success;
}