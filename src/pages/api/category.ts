// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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
  name: string
}

export default function AccessToken(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return (
    res.status(200).json
    // Buffer.from(hashed, "utf-8").toString("base64")
  )
}
