"use client";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const AuthPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = process.env.CAFE24_CLIENT_ID;
  const secretKey = process.env.CAFE24_CLIENT_SECRET;

  const handleAuth = async () => {
    const redirectUri = `${window.location.origin}/auth`;
    const authUrl = `https://mall.cafe24api.com/api/v2/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read_product`;

    window.location.href = authUrl;
  };

  const handleRedirect = async () => {
    const code = searchParams.get("code");
    const redirectUri = `${window.location.origin}/auth`;
    const redirectUrl = `https://mall.cafe24api.com/api/v2/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${secretKey}&redirect_uri=${redirectUri}`;

    const response = await axios.post(redirectUrl);
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    localStorage.setItem("cafe24_access_token", accessToken);
    localStorage.setItem("cafe24_refresh_token", refreshToken);

    // TODO: access_token과 refresh_token을 이용하여 CAFE24 API에 요청하는 코드 작성
  };

  if (searchParams.get("code")) {
    handleRedirect();
  }

  return (
    <div>
      <h1>CAFE24 Redirect URI(s) 받기</h1>
      <button onClick={handleAuth}>CAFE24 인증하기</button>
    </div>
  );
};

export default AuthPage;
