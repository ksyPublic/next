import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError, AxiosResponse } from "axios";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

const commerceApiUrl = "https://api.commerce.naver.com/external";

const clientId: string | undefined = process.env.NAVER_CLIENT_ID;
const clientSecret: string | undefined = process.env.NAVER_CLIENT_SECRET;

async function getCommerceApiToken(): Promise<TokenResponse> {
  if (!clientId || !clientSecret) {
    throw new Error("Missing environment variables");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Naver-Client-Id": clientId,
    "X-Naver-Client-Secret": clientSecret,
  };

  const response: AxiosResponse<TokenResponse> = await axios.post(
    `${commerceApiUrl}/token`,
    params,
    {
      headers,
    }
  );

  return response.data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse>
) {
  try {
    const token = await getCommerceApiToken();
    res.status(200).json(token);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        res.status(axiosError.response.status).json(axiosError.response.data);
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
