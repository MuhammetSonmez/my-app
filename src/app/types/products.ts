
export type Product = {
    name: string,
    popularityScore: number,
    weight: number,
    price: number,
    images: {
        yellow: string,
        rose: string,
        white: string
    }
}

export type ProductFilterOptions = {
  minPrice?: number;
  maxPrice?: number;
  minPopularityScore?: number;
};