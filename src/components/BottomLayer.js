import React from 'react';
import { Masonry } from '@mui/lab';
import { Box, Typography } from '@mui/material';

const events = [
  {
    _id: '66dd5908d814535bb5411670',
    event_img: 'https://www.beclass.com/share/202409/294da0766d6c13a3ae1f0340r.jpg',
    event_name: '賺錢成績外的芬蘭幸福',
  },
  {
    _id: '66dd5308d97689dc74a2e6ff',
    event_img: 'https://cdn.prod.website-files.com/63305270d726c747d0ccb9a5/6363daef601f1b234632a83d_pexels-ono-kosuki-5647617.webp',
    event_name: '夢幻雙語故事-Pete the Cat’s Groovy Imagination皮皮貓的奇幻想像力',
  },
];

const BottomLayer = () => {
  return (
    <Masonry columns={4} spacing={2} sx={{ padding: 2 }}>
      {events.map((event) => (
        <Box key={event._id} sx={{ position: 'relative' }}>
          <img src={event.event_img} alt={event.event_name} style={{ width: '100%' }} />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: 1,
            }}
          >
            <Typography variant="body2">{event.event_name}</Typography>
          </Box>
        </Box>
      ))}
    </Masonry>
  );
};

export default BottomLayer;
