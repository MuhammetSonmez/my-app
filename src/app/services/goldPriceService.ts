declare global {
  var goldCache: {
    price: number | null;
    timestamp: number;
  } | undefined;
}

const CACHE_DURATION_MS = Number(process.env.GOLD_PRICE_CACHE_DURATION ); // 12 hours

export async function getGoldPrice(): Promise<number> {
  const now = Date.now();

  if (!global.goldCache) {
    global.goldCache = {
      price: null,
      timestamp: 0,
    };
  }

  const { price, timestamp } = global.goldCache;

  if (price !== null && (now - timestamp) < CACHE_DURATION_MS) {
    return price;
  }

  try {
    const response = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${process.env.METAL_PRICE_API_KEY}&base=USD&currencies=XAU`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const goldPricePerGram = data.rates.USDXAU / 31.1035;

    global.goldCache = {
      price: goldPricePerGram,
      timestamp: now,
    };

    return goldPricePerGram;
  } catch (error) {
    console.error("Error fetching gold price:", error);
    if (price !== null) return price;
    return 65;
  }
}
