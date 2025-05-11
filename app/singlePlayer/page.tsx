"use client";

import React from "react";
import CategoryList from "@/components/category-list";

export default function Rooms() {
  const handleFilterChange = (filters: { categories: string[] }) => {
    console.log("Selected filters:", filters);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Single Player Page</h1>
      <CategoryList onFilterChange={handleFilterChange} />
      <p>kingkangkung</p>
    </div>
  );
}
