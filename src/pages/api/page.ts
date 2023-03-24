// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import token from "./token";
import type { NextApiRequest, NextApiResponse } from "next";

// import bcrypt from "bcrypt";

// const clientId = "1Ivjse7awZyZ9MGUHNKMEe";
// const clientSecret = "$2a$04$5w3FV/1i2PWVhYQyFrRtAO";
// const timestamp = 1643961623299;
// // 밑줄로 연결하여 password 생성
// const password = `${clientId}_${timestamp}`;
// // bcrypt 해싱
// const hashed = bcrypt.hashSync(password, clientSecret);
// // base64 인코딩
// console.log(Buffer.from(hashed, "utf-8").toString("base64"));

type Data = {
  name: string;
};

const options = {
  method: "POST",
  hostname: "api.commerce.naver.com",
  port: null,
  path: "/external/v1/products/search",
  headers: {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  },
};

export default function Page() {
  const AccessToken = token;
  console.log("????", AccessToken);
  const response = axios
    .post("https://api.commerce.naver.com/external/v1/products/search", {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res); // 에러코드같은거 보려고 일부로 넣는 편이다.
    })
    .catch((error) => {
      console.log("error in request", error);
    });
  return {
    datas: response,
  };
}
