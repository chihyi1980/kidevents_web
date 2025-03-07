import HomePage from '../pages/components/HomePage';
import { headers } from 'next/headers';

// 設置動態數據獲取
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  try {
    const headersList = headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    /*
    const [eventsRes, locsRes, tagsRes] = await Promise.all([
      fetch(`${baseUrl}/api/events/online_list`, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }),
      fetch(`${baseUrl}/api/loc/online_list`, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }),
      fetch(`${baseUrl}/api/tag/online_list`, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    ]);

    if (!eventsRes.ok || !locsRes.ok || !tagsRes.ok) {
      throw new Error('Failed to fetch data');
    }


    const [events, locs, tags] = await Promise.all([
      eventsRes.json(),
      locsRes.json(),
      tagsRes.json()
    ]);

    */

    const eventsRes = await fetch(`${baseUrl}/api/events/online_list`, { next: { revalidate: 60 } });
    const locsRes = await fetch(`${baseUrl}/api/loc/online_list`, { next: { revalidate: 60 } });
    const tagsRes = await fetch(`${baseUrl}/api/tag/online_list`, { next: { revalidate: 60 } });

    const events = await eventsRes.json();
    const locs = await locsRes.json();
    const tags = await tagsRes.json();

    return { events, locs, tags };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { events: [], locs: [], tags: [] }; // 返回空數據而不是拋出錯誤
  }
}

export default async function Home() {
  const { events, locs, tags } = await getData();
  
  return (
    <HomePage events={events} locs={locs} tags={tags} />
  );
}