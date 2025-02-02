import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // 設置響應頭以防止緩存
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    const client = await clientPromise;
    const eventsDb = client.db('events_db');
    const optionDb = client.db('option_db');

    // 1. 獲取所有啟用且在線的事件
    const events = await eventsDb.collection('events')
      .find({ 
        is_enabled: true,
        is_online: true 
      })
      .toArray();
    

    // 2. 從 option_db 獲取所有地點並建立映射
    const locs = await optionDb.collection('loc').find({}).toArray();
    
    const locsDict = {};
    locs.forEach(loc => {
      locsDict[loc._id.toString()] = loc.value;
    });

    // 3. 處理每個事件
    const processedEvents = events.map(event => {
      const processedEvent = { ...event };

      // 處理標籤
      if (event.event_tag) {
        processedEvent.event_tag_names = event.event_tag
          .filter(tag => tag && tag._id)
          .map(tag => tag.value);
        delete processedEvent.event_tag;
      } else {
        processedEvent.event_tag_names = [];
      }

      // 處理地點
      if (event.event_loc) {
        const locId = event.event_loc;
        processedEvent.event_loc_name = locsDict[locId] || '';
        delete processedEvent.event_loc;
      }

      // 刪除不需要的字段
      delete processedEvent.updated_at;
      delete processedEvent.is_enabled;
      delete processedEvent.is_online;

      // 處理日期格式
      try {
        if (processedEvent.event_start_date) {
          const startDate = new Date(processedEvent.event_start_date);
          processedEvent.event_start_date = startDate.toISOString().split('T')[0];
        }
      } catch (error) {
        console.error('Error processing start date:', error);
      }

      try {
        if (processedEvent.event_end_date) {
          const endDate = new Date(processedEvent.event_end_date);
          processedEvent.event_end_date = endDate.toISOString().split('T')[0];
        }
      } catch (error) {
        console.error('Error processing end date:', error);
      }

      // 確保 _id 是字符串
      processedEvent._id = processedEvent._id.toString();

      return processedEvent;
    });

    // 4. 按創建時間排序（從新到舊）
    processedEvents.sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA;
    });

    return NextResponse.json(processedEvents, { headers });
  } catch (error) {
    console.error('獲取事件列表時發生錯誤:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json([], { headers });
  }
}
