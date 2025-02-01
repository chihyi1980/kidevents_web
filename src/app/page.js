import HomePage from '../pages/components/HomePage';
import { headers } from 'next/headers';

async function getData() {
  try {
    const headersList = headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    const [eventsRes, locsRes, tagsRes] = await Promise.all([
      fetch(`${baseUrl}/api/events/online_list`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/loc/online_list`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/tag/online_list`, { cache: 'no-store' })
    ]);

    if (!eventsRes.ok || !locsRes.ok || !tagsRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const [events, locs, tags] = await Promise.all([
      eventsRes.json(),
      locsRes.json(),
      tagsRes.json()
    ]);

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