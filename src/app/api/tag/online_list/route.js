import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const maxDuration = 60; // 設置函數超時時間為 60 秒

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('option_db');  // 假設標籤也存儲在 option_db 數據庫中
    
    // 使用索引提示優化查詢
    const tags = await db.collection('tag')
      .find(
        { is_enabled: true },
        { 
          hint: { is_enabled: 1, order: 1 },  // 使用索引提示
          projection: { value: 1, order: 1, _id: 0 }  // 只返回需要的字段
        }
      )
      .sort({ order: 1, value: 1 })
      .toArray();

    return NextResponse.json(tags);
  } catch (error) {
    console.error('獲取標籤列表時發生錯誤:', error);
    return NextResponse.json(
      { error: '獲取標籤列表失敗' },
      { status: 500 }
    );
  }
}
