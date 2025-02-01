import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const maxDuration = 60;

// 輔助函數：格式化日期
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    // 轉換為台北時間
    const taipeiDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
    return taipeiDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('日期格式化錯誤:', error);
    return dateString;
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    if (!id) {
      console.error('未提供事件 ID');
      return NextResponse.json(
        { error: '未提供事件 ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const eventsDb = client.db('events_db');
    const optionDb = client.db('option_db');

    // 獲取事件
    const event = await eventsDb.collection('events')
      .findOne({
        _id: new ObjectId(id),
        is_enabled: true,
        is_online: true
      });

    if (!event) {
      console.error('找不到事件:', id);
      return NextResponse.json(
        { error: '找不到該事件' },
        { status: 404 }
      );
    }

    // 獲取所有地點
    const locations = await optionDb.collection('loc')
      .find({ is_enabled: true })
      .toArray();
    
    const locsDict = {};
    locations.forEach(loc => {
      locsDict[loc._id.toString()] = loc.value;
    });

    // 處理事件數據
    const processedEvent = {
      ...event,
      _id: event._id.toString()
    };

    // 處理事件標籤
    if (event.event_tag) {
      processedEvent.event_tag_names = event.event_tag.map(tag => tag.value || '');
      delete processedEvent.event_tag;
    }

    // 處理事件地點
    if (event.event_loc) {
      processedEvent.event_loc_name = locsDict[event.event_loc] || '';
      delete processedEvent.event_loc;
    }

    // 處理日期
    if (event.event_start_date) {
      processedEvent.event_start_date = formatDate(event.event_start_date);
    }
    if (event.event_end_date) {
      processedEvent.event_end_date = formatDate(event.event_end_date);
    }

    // 刪除不需要的字段
    delete processedEvent.created_at;
    delete processedEvent.updated_at;
    delete processedEvent.is_enabled;
    delete processedEvent.is_online;

    return NextResponse.json(processedEvent);
  } catch (error) {
    console.error('獲取事件詳情時發生錯誤:', error);
    return NextResponse.json(
      { error: '獲取事件詳情失敗', details: error.message },
      { status: 500 }
    );
  }
}
