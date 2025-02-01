import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('option_db');  // 假設標籤也存儲在 option_db 數據庫中
    
    const tags = await db.collection('tag')  
      .find({ is_enabled: true })
      .sort({ order: 1, value: 1 })
      .toArray();

    // 將結果轉換為前端需要的格式
    const formattedTags = tags.map(tag => ({
      value: tag.value,
      order: tag.order
    }));

    return NextResponse.json(formattedTags);
  } catch (error) {
    console.error('獲取標籤列表時發生錯誤:', error);
    return NextResponse.json(
      { error: '獲取標籤列表失敗' },
      { status: 500 }
    );
  }
}
