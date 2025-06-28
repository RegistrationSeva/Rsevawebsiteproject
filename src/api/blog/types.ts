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
};

type Author = {
  id: string;
  name: string;
  email: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};
