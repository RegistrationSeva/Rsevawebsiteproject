import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common/client";
import { BlogResponse } from "./types";

type Response = BlogResponse;
type Variables = {
  page?: number;
  search?: string;
  category?: string;
  status?: string;
  categoryId?: string;
  limit?: number;
};

export const useBlogs = createQuery<Response, Variables, AxiosError>({
  queryKey: ["blogs"],
  fetcher: async (variables) => {
    const params = new URLSearchParams();
    if (variables.page) params.append("page", variables.page.toString());
    if (variables.search) params.append("search", variables.search);
    if (variables.category) params.append("category", variables.category);

    const response = await client.get(`blogs?${params.toString()}`);
    return response.data;
  },
});
