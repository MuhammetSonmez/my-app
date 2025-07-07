import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getGoldPrice } from "@/app/services/goldPriceService";
import { filterProducts } from "@/app/utils/filterProducts";
import { Product, ProductFilterOptions } from "@/app/types/products";

const dataFilePath = path.join(process.cwd(), "src", "app", "data", "products.json");

export async function GET(req: NextRequest) {
  try {
    const fileContents = await fs.readFile(dataFilePath, "utf-8");
    const data: Product[] = JSON.parse(fileContents);

    const goldPrice = await getGoldPrice();

    const enrichedData = data.map((product) => ({
      ...product,
      price: Number(((product.popularityScore + 1) * product.weight * goldPrice).toFixed(2)),
    }));

    const { searchParams } = new URL(req.url);
    const filters: ProductFilterOptions = {
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      minPopularityScore: searchParams.get("minPopularityScore") ? Number(searchParams.get("minPopularityScore")) : undefined,
    };

    const filteredData = filterProducts(enrichedData, filters);

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
