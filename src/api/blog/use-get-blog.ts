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

// Server-side function for metadata generation
export async function getBlog({ id }: { id: string }): Promise<Response | null> {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await client.get(`blogs/slug/${id}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    // Return null instead of throwing error to allow graceful fallback
    return null;
  }
}
