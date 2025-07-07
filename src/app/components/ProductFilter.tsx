"use client";

import { useState } from "react";
import { ProductFilterOptions } from "@/app/types/products";

type Props = {
  onFilterChange: (filter: ProductFilterOptions) => void;
};

export default function ProductFilter({ onFilterChange }: Props) {
  const [filter, setFilter] = useState<ProductFilterOptions>({
    minPrice: undefined,
    maxPrice: undefined,
    minPopularityScore: undefined,
  });

  const handleChange = (key: keyof ProductFilterOptions, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
  };

  const applyFilter = () => {
    const adjustedFilter: ProductFilterOptions = {
      ...filter,
      minPopularityScore: filter.minPopularityScore
        ? Number(filter.minPopularityScore) / 5
        : undefined,
    };
    onFilterChange(adjustedFilter);
  };

  const clearFilter = () => {
    const emptyFilter = {
      minPrice: undefined,
      maxPrice: undefined,
      minPopularityScore: undefined,
    };
    setFilter(emptyFilter);
    onFilterChange(emptyFilter);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      <input
        type="number"
        min={0}
        placeholder="Min Price"
        value={filter.minPrice ?? ""}
        onChange={(e) => handleChange("minPrice", e.target.value)}
        className="border p-3 rounded w-32 placeholder:text-gray-400"
      />
      <input
        type="number"
        min={0}
        placeholder="Max Price"
        value={filter.maxPrice ?? ""}
        onChange={(e) => handleChange("maxPrice", e.target.value)}
        className="border p-3 rounded w-32 placeholder:text-gray-400"
      />

      <input
        type="number"
        min={0}
        max={5}
        step={0.1}
        placeholder="Min Popularity"
        value={filter.minPopularityScore ?? ""}
        onChange={(e) => handleChange("minPopularityScore", e.target.value)}
        className="border p-3 rounded w-40 placeholder:text-gray-400"
      />

      <button
        type="button"
        onClick={applyFilter}
        className="bg-yellow-600 text-white px-6 py-3 rounded hover:bg-yellow-700 transition"
      >
        Filter
      </button>

      <button
        type="button"
        onClick={clearFilter}
        className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500 transition"
      >
        Clear
      </button>
    </div>
  );
}
