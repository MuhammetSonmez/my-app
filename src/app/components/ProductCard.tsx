"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/app/types/products";

type ColorKey = "yellow" | "white" | "rose";

type Props = {
  product: Product;
};

const colors: { name: string; key: ColorKey; hex: string }[] = [
  { name: "Yellow Gold", key: "yellow", hex: "#E6CA97" },
  { name: "White Gold", key: "white", hex: "#D9D9D9" },
  { name: "Rose Gold", key: "rose", hex: "#E1A4A9" },
];

export default function ProductCard({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState<ColorKey>("yellow");


  function StarFull() {
    return (
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="#ECD9B0"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.034 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.299-3.974z" />
      </svg>
    );
  }

  function StarPartial({ fillPercent }: { fillPercent: number }) {
    return (
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-300"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <defs>
          <linearGradient id="grad">
            <stop offset={`${fillPercent * 100}%`} stopColor="gold" />
            <stop offset={`${fillPercent * 100}%`} stopColor="lightgray" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad)"
          stroke="currentColor"
          strokeWidth="1"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.034 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.299-3.974z"
        />
      </svg>
    );
  }

  function StarEmpty() {
    return (
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.034 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.299-3.974z" />
      </svg>
    );
  }

  function Stars({ score }: { score: number }) {
    const rating = score * 5;

    return (
      <div className="flex mt-2">
        {[0, 1, 2, 3, 4].map((i) => {
          const starValue = i + 1;
          if (rating >= starValue) {
            return <StarFull key={i} />;
          } else if (rating > i && rating < starValue) {
            const fillPercent = rating - i;
            return <StarPartial key={i} fillPercent={fillPercent} />;
          } else {
            return <StarEmpty key={i} />;
          }
        })}
        <p className="avenir-book-14 ml-2">{rating.toFixed(2)}/5</p>
      </div>
    );
  }


  return (
    <div className="rounded-2xl p-4 bg-white max-w-sm">
      <div className="relative w-full h-[220px]">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="rounded-3xl object-cover"
        />
      </div>

      <h2 className="mt-4 montserrat-medium-15">{product.name}</h2>
      <p className="montserrat-regular-15">${product.price} USD</p>

      <div className="flex gap-4 mt-3">
        {colors.map(({ name, key, hex }) => (
          <button
            key={key}
            aria-label={name}
            onClick={() => setSelectedColor(key)}
            className={`w-6 h-6 rounded-full transition-all ${
              selectedColor === key
                ? "outline outline-1 outline-black outline-offset-3"
                : ""
            }`}
            style={{ backgroundColor: hex }}
            type="button"
          />
        ))}
      </div>
      <p className="avenir-book-12 mt-3">
        {colors.find((color) => color.key === selectedColor)?.name}
      </p>
      <Stars score={product.popularityScore} />
    </div>
  );
}
