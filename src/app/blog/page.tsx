"use client";

import React, { useEffect } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { SearchHeader } from "@/components/blog/SearchHeader";
import { Pagination } from "@/components/blog/Pagination";
import { useBlogs } from "@/api/blog/use-get-blogs";
import { useCategories } from "@/api/blog/use-get-category";
import { useDebounce } from "@/lib/utils";
import type { Category } from "@/api/blog/types";

const POSTS_PER_PAGE = 10;

export default function Blog() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch categories
  const { data: categoriesData } = useCategories({
    variables: {
      limit: 100, // Fetch all categories
      sortBy: "name", // Sort by name
    },
  });

  console.log("Categories Response:", categoriesData); // Debug log

  // Transform categories for dropdown
  const categories = React.useMemo(() => {
    const apiCategories = categoriesData?.data?.categories || [];
    return [
      { value: "all", label: "All Categories" },
      ...apiCategories.map((cat: Category) => ({
        value: cat.id, // Use id as the value
        label: cat.name,
      })),
    ];
  }, [categoriesData]);

  const { data, isLoading, error } = useBlogs({
    variables: {
      limit: 9,
      page: currentPage,
      search: debouncedSearch || undefined,
      categoryId: selectedCategory === "all" ? undefined : selectedCategory,
      status: "published",
    },
  });

  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.totalPages || 1;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SearchHeader
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-2xl mb-4" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <SearchHeader
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-red-500">
            Error loading blogs. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <BlogCard
              key={post.id}
              post={{
                id: post.id,
                title: post.title,
                category: post.category.name,
                date: new Date(post.date).toLocaleDateString(),
                image: post.coverImage,
                excerpt: `By ${post.author.name}`, // Using author name as excerpt
                readTime: `${post.views} views`, // Using views instead of read time
              }}
            />
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No articles found matching your criteria.
            </p>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
