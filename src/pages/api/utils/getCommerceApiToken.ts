import bcrypt from "bcryptjs";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

const clientId = process.env.NAVER_CLIENT_ID!;
const clientSecret = process.env.NAVER_CLIENT_SECRET!;

export async function getCommerceApiToken(): Promise<TokenResponse> {
  const timestamp = Date.now();
  const password = `${clientId}_${timestamp}`;
  const hashed = await bcrypt.hash(password, clientSecret);
  return {
    access_token: Buffer.from(hashed, "utf-8").toString("base64"),
    expires_in: 60 * 60 * 24, // 24 hours
    token_type: "Bearer",
  };
}
