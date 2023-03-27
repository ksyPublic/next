import axios from "axios";

type Category = {
  categoryId: number;
  categoryName: string;
  parentCategoryId: number;
};

export type CategoryResponse = {
  categories: Category[];
};

const baseUrl = "https://api.commerce.naver.com/external/v1";

export default async function getCategoryList(
  accessToken: string
): Promise<CategoryResponse> {
  const response = await axios.get<CategoryResponse>(`${baseUrl}/categories`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
