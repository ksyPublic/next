import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

import { getCommerceApiToken } from "./utils/getCommerceApiToken";
import getCategoryList, { CategoryResponse } from "./utils/getCategoryList";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoryResponse | { message: string }>
): Promise<void> {
  try {
    const { access_token: accessToken } = await getCommerceApiToken();
    const categoryList = await getCategoryList(accessToken);
    res.status(200).json(categoryList);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
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
