import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60; // 設置函數超時時間為 60 秒

const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};

export async function GET() {
  try {
    // 設置響應頭以防止緩存
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    const client = await retry(() => clientPromise);
    const db = client.db('option_db');  // 假設標籤也存儲在 option_db 數據庫中
    
    const tags = await retry(() => 
      db.collection('tag')
        .find(
          { is_enabled: true },
          { 
            projection: { value: 1, order: 1, _id: 0 }  
          }
        )
        .sort({ order: 1, value: 1 })
        .toArray()
    );

    return NextResponse.json(tags, { headers });
  } catch (error) {
    console.error('獲取標籤列表時發生錯誤:', error);
    return NextResponse.json(
      { error: '獲取標籤列表失敗' },
      { status: 500, headers }
    );
  }
}
