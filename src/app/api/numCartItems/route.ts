import { db } from '@/lib/db/drizzle';
import { CartItem, NewCartItem, dine_market_cart } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  if (url.searchParams.has('userId')) {
    const user_id = url.searchParams.get('userId') as string;
    try {
      const result = await db
        .select({
          numItems: sql<number>`sum(dine_market_cart.product_quantity)`,
        })
        .from(dine_market_cart)
        .where(eq(dine_market_cart.user_id, user_id));
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json([{ numItems: 0 }], { status: 500 });
    }
  } else {
    return NextResponse.json([{ numItems: 0 }], { status: 200 });
  }
}

// INSERT INTO dine_market_cart (user_id, product_name, product_slug, product_type, product_image_url, product_size, product_quantity, product_price)
// VALUES ('user123', 'Product A', 'product-a', 'Type A', 'https://example.com/product-a.jpg', 'Medium', 12, 10)
// ON CONFLICT (user_id, product_name, product_size, product_price)
// DO UPDATE SET product_quantity = dine_market_cart.product_quantity + EXCLUDED.product_quantity;
