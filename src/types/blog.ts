export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content?: string;
}

export interface BlogCategory {
  value: string;
  label: string;
}
