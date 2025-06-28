import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchHeaderProps {
  searchQuery: string;
  selectedCategory: string;
  categories: { value: string; label: string }[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function SearchHeader({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: SearchHeaderProps) {
  return (
    <div className="relative bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--primary)_0%,var(--secondary)_100%)] opacity-90" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zm0-30h-4V0h2v4h4v2h-4v4h-2V6h-4V4h4V0zM6 34H2v-4h2v4h4v2H4v4H2v-4H0v-2h2v-4zm0-30H2V0h2v4h4v2H4v4H2V6H0V4h2V0zM18 17h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zm0-17h-4V0h2v4h4v2h-4v4h-2V6h-4V4h4V0zM54 17h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zm0-17h-4V0h2v4h4v2h-4v4h-2V6h-4V4h4V0zM42 51h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zm0-30h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zM12 51H8v-4h2v4h4v2H8v4H6v-4H2v-2h4v-4zm0-30H8v-4h2v4h4v2H8v4H6v-4H2v-2h4v-4zM30 51h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zm0-30h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Explore Our Blog
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Expert insights and comprehensive guides on business registration,
            taxation, and trademark services to help you succeed
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-full pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 focus-visible:ring-white/30"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <select
              className="h-12 md:w-[200px] rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/30 focus:ring-white/20 transition-colors"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              {categories.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                  className="text-primary bg-background"
                >
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
