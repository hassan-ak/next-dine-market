import { db } from '@/lib/db/drizzle';
import { NewCartItem, dine_market_cart } from '@/lib/db/schema';
import { sql, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Get body from request
  let body = await request.json();

  const cartItem: NewCartItem = {
    product_name: body.productName,
    product_type: body.productType,
    product_slug: body.productSlug,
    product_image_url: body.productImageUrl,
    product_size: body.productSelectedSize,
    product_quantity: body.productQuantity,
    product_price: body.productPrice,
    user_id: body.userId,
  };

  try {
    const response = await db
      .insert(dine_market_cart)
      .values(cartItem)
      .onConflictDoUpdate({
        target: [
          dine_market_cart.user_id,
          dine_market_cart.product_name,
          dine_market_cart.product_size,
          dine_market_cart.product_price,
        ],
        set: {
          product_quantity: sql`${cartItem.product_quantity} + dine_market_cart.product_quantity`,
        },
      })
      .returning();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: false }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  if (url.searchParams.has('user_id')) {
    const user_id = url.searchParams.get('user_id') as string;
    try {
      const response = await db
        .delete(dine_market_cart)
        .where(eq(dine_market_cart.user_id, user_id));
      return NextResponse.json({ deleted: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ deleted: false }, { status: 500 });
    }
  } else {
    return NextResponse.json({ deleted: false }, { status: 500 });
  }
}
