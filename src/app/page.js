import HomePage from '../pages/components/HomePage';

export default async function Home() {
  const eventsRes = await fetch(process.env.REACT_APP_API_HOST + '/api/events/online_list');
  const locsRes = await fetch(process.env.REACT_APP_API_HOST + '/api/loc/online_list');
  const tagsRes = await fetch(process.env.REACT_APP_API_HOST + '/api/tag/online_list');

  const events = await eventsRes.json();
  const locs = await locsRes.json();
  const tags = await tagsRes.json();

  return (
    <HomePage events={events} locs={locs} tags={tags} />
  );
}
