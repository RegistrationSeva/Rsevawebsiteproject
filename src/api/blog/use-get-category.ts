import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common/client";
import { CategoryResponse } from "./types";

type Variables = {
  page?: number;
  search?: string;
  limit?: number;
  sortBy?: string;
};

export const useCategories = createQuery<
  CategoryResponse,
  Variables,
  AxiosError
>({
  queryKey: ["categories"],
  fetcher: async (variables) => {
    const params = new URLSearchParams();
    if (variables.page) params.append("page", variables.page.toString());
    if (variables.search) params.append("search", variables.search);
    if (variables.limit) params.append("limit", variables.limit.toString());
    if (variables.sortBy) params.append("sortBy", variables.sortBy);

    const response = await client.get(`categories?${params.toString()}`);
    return response.data;
  },
});
