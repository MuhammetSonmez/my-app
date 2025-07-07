"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Product, ProductFilterOptions } from "@/app/types/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductFilter from "./ProductFilter";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProductFilterOptions>({});

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);

    const query = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, String(value));
      }
    });

    fetch("/api/v1/products?" + query.toString())
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error("Ürün verisi alınamadı:", err))
      .finally(() => setLoading(false));
  }, [filter]);

  const scroll = (dir: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const isSmallScreen = window.innerWidth < 768;

    const cardsToScroll = isSmallScreen ? 1 : 2;
    const cardWidth = isSmallScreen ? containerWidth - 32 : 270;
    const gap = isSmallScreen ? 16 : 20;

    const scrollAmount = (cardWidth + gap) * cardsToScroll;

    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div>
      <div className="mt-10">
        <ProductFilter onFilterChange={setFilter} />
      </div>

      <h1 className="avenir-book-45 text-center pt-10 mb-10">Product List</h1>

      <div className="relative lg:w-[1248px] mx-auto">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 sm:-left-6 md:-left-10 top-1/2 -translate-y-[200%] z-20 rounded-full p-2 text-gray-700 hover:text-black transition-colors duration-200"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 sm:-right-6 md:-right-10 top-1/2 -translate-y-[200%] z-20 rounded-full p-2 text-gray-700 hover:text-black transition-colors duration-200"
        >
          <ChevronRight className="w-8 h-8" />
        </button>



        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth gap-4 sm:gap-5 lg:gap-20 px-6 snap-x snap-mandatory custom-scrollbar ml-6 sm:ml-0"
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className="snap-start flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[calc(50vw-2rem)] md:w-[280px] lg:w-[250px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
