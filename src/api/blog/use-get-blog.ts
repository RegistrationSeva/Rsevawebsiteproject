import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common/client";
import { SingleBlogResponse } from "./types";

type Response = SingleBlogResponse;
type Variables = {
  id: string;
};

export const useBlog = createQuery<Response, Variables, AxiosError>({
  queryKey: ["blog", Date.now()],
  fetcher: async (variables) => {
    const response = await client.get(`blogs/slug/${variables.id}`);
    return response.data;
  },
});
