export type BlogResponse = {
  success: boolean;
  message: string;
  data: {
    blogs: Blog[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
};

type Blog = {
  id: string;
  title: string;
  author: Author;
  category: Category;
  date: string; // ISO Date string
  status: "published" | "draft" | "archived"; // Adjust as needed
  views: number;
  coverImage: string;
  featured: boolean;
  content?: string;
  createdAt: string;
  updatedAt: string;
};

type Author = {
  id: string;
  name: string;
  email: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  postCount?: number;
};

export type CategoryResponse = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
};

export type SingleBlogResponse = {
  success: boolean;
  message: string;
  data: {
    blog: Blog;
  };
};
