import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('option_db');
    
    // 查詢所有 is_enabled 為 true 的地點
    const locations = await db.collection('loc')
      .find({ is_enabled: true })
      .sort({ order: 1, value: 1 })
      .toArray();

    // 將結果轉換為前端需要的格式
    const formattedLocations = locations.map(loc => ({
      value: loc.value,
      order: loc.order
    }));

    return NextResponse.json(formattedLocations);
  } catch (error) {
    console.error('獲取地點列表時發生錯誤:', error);
    return NextResponse.json(
      { error: '獲取地點列表失敗' },
      { status: 500 }
    );
  }
}
