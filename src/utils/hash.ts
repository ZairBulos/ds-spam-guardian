import crypto from "crypto";

export const hashContent = (content: string): string => {
  return crypto.createHash("sha256").update(content).digest("hex");
};
