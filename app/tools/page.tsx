"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAllTools, getAllCategories } from "@/lib/utils";

// Import all tools page components
import ToolsHeroSection from "@/components/tools/ToolsHeroSection";
import CategoryPillsBar from "@/components/tools/CategoryPillsBar";
import ToolsGridSection from "@/components/tools/ToolsGridSection";
import ToolsCTASection from "@/components/tools/ToolsCTASection";

function ToolsContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || "";
  
  const allTools = getAllTools();
  const categories = getAllCategories();
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "popular" | "newest">("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let tools = [...allTools];

    // Filter by search
    if (searchTerm) {
      tools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          categories.find((c) => c.slug === tool.category)?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      tools = tools.filter((tool) => tool.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "name":
        tools.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
        tools.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case "newest":
        tools.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return tools;
  }, [allTools, searchTerm, selectedCategory, sortBy, categories]);

  // Handler functions
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
  };

  const handleSortChange = (sort: 'popular' | 'name' | 'newest') => {
    setSortBy(sort);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <ToolsHeroSection
        totalTools={allTools.length}
        totalCategories={categories.length}
        popularTools={allTools.filter((t) => t.isPopular).length}
        newTools={allTools.filter((t) => t.isNew).length}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        urlQuery={urlQuery}
        filteredToolsCount={filteredTools.length}
      />

      {/* Category Pills Bar */}
      <CategoryPillsBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Tools Grid Section */}
      <ToolsGridSection
        tools={filteredTools}
        categories={categories}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      {/* CTA Section */}
      <ToolsCTASection />
    </div>
  );
}

export default function AllToolsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading tools...</p>
        </div>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  );
}
