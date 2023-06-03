import { db } from '@/lib/db/drizzle';
import { NewCartItem, dine_market_cart } from '@/lib/db/schema';
import { sql, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const url = request.nextUrl;
  if (url.searchParams.has('user_id') && url.searchParams.has('session_id')) {
    const user_id = url.searchParams.get('user_id') as string;
    const session_id = url.searchParams.get('session_id') as string;
    try {
      await db
        .delete(dine_market_cart)
        .where(eq(dine_market_cart.user_id, user_id));
      return NextResponse.redirect(`${base_url}/successPayment`);
    } catch (error) {
      return NextResponse.redirect(`${base_url}/successPaymentError`);
    }
  } else {
    return NextResponse.redirect(`${base_url}/cart`);
  }
}

