"use client";

import React from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { SearchHeader } from "@/components/blog/SearchHeader";
import { Pagination } from "@/components/blog/Pagination";
import { useBlogs } from "@/api/blog/use-get-blogs";
import { useCategories } from "@/api/blog/use-get-category";
import { useDebounce } from "@/lib/utils";
import type { Category } from "@/api/blog/types";

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch categories
  const { data: categoriesData } = useCategories({
    variables: {
      limit: 100,
      sortBy: "name",
    },
  });

  // Transform categories for dropdown
  const categories = React.useMemo(() => {
    const apiCategories = categoriesData?.data?.categories || [];
    return [
      { value: "all", label: "All Categories" },
      ...apiCategories.map((cat: Category) => ({
        value: cat.id,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-white rounded-2xl mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-6 w-20 bg-gray-200 rounded-full" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-red-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Blogs
              </h3>
              <p className="text-red-600">
                We encountered an error while loading the blogs. Please try
                again later.
              </p>
            </div>
          </div>
        ) : (
          <>
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
                    excerpt: `By ${post.author.name}`,
                    readTime: `${post.views} views`,
                    slug: post?.slug,
                  }}
                />
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Articles Found
                  </h3>
                  <p className="text-gray-600">
                    We couldn&apos;t find any articles matching your search
                    criteria. Try adjusting your filters or search terms.
                  </p>
                </div>
              </div>
            )}

            {blogs.length > 0 && (
              <div className="mt-16">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Introductory Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Registration SEVA Blog
          </h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Welcome to the Registration SEVA blog, your trusted source for comprehensive insights, expert guidance, and the latest updates on business registration, trademark protection, GST compliance, and entrepreneurship in India. Our mission is to empower entrepreneurs, startups, and established businesses with the knowledge and resources they need to navigate the complex landscape of business compliance and legal requirements.
            </p>
            <p>
              Whether you&apos;re planning to start a new business, protect your brand with trademark registration, understand GST regulations, or ensure your company remains compliant with statutory requirements, our blog offers in-depth articles, practical guides, and actionable tips written by industry experts. We cover a wide range of topics including business incorporation, intellectual property rights, tax compliance, licensing requirements, and much more.
            </p>
            <p>
              Stay informed about the latest changes in business regulations, government policies, and compliance deadlines. Our team regularly publishes detailed guides on various business structures like Private Limited Companies, Limited Liability Partnerships (LLPs), One Person Companies (OPCs), and Sole Proprietorships. We also provide step-by-step tutorials on essential business services such as MSME registration, Import Export Code (IEC), FSSAI licensing, ISO certification, and digital signature certificates.
            </p>
            <p>
              Explore our diverse collection of articles organized by categories to easily find the information you need. Use our search functionality to discover specific topics, or browse through our latest posts to stay updated with current business trends and regulatory changes. Our goal is to simplify complex legal and compliance matters, making it easier for you to focus on growing your business while staying compliant with all regulatory requirements.
            </p>
            <p>
              Join thousands of entrepreneurs and business owners who trust Registration SEVA for reliable, up-to-date information on business compliance and registration services. Subscribe to our blog to receive regular updates, expert insights, and exclusive tips delivered straight to your inbox. Let us be your partner in building a successful and compliant business in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
