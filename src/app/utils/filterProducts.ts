import { Product, ProductFilterOptions } from "@/app/types/products";

export function filterProducts(products: Product[], filters: ProductFilterOptions): Product[] {
  return products.filter((product) => {
    const {
      minPrice,
      maxPrice,
      minPopularityScore,
    } = filters;

    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    if (minPopularityScore !== undefined && product.popularityScore < minPopularityScore) return false;

    return true;
  });
}
