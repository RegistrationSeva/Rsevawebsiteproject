export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image?: string;
  excerpt?: string;
  readTime?: string;
  slug?: string;
}

export interface BlogCategory {
  value: string;
  label: string;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: {
    blogs: {
      id: string;
      title: string;
      author: {
        id: string;
        name: string;
        email: string;
      };
      category: {
        id: string;
        name: string;
        slug: string;
      };
      date: string;
      status: "published" | "draft" | "archived";
      views: number;
      coverImage: string;
      featured: boolean;
    }[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
}
