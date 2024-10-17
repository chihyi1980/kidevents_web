'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Box, MenuItem, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Masonry } from '@mui/lab';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EventDetail from './EventDetail';
// import { track } from '@vercel/analytics';
import ReactGA from "react-ga4";

const ages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

const MiddleLayer = ({ events = [], locs = [], tags = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 過濾條件狀態
  const [searchText, setSearchText] = useState('');
  const [selectedLoc, setSelectedLoc] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // 對話框狀態
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const toggleCategory = (category) => {
    setSelectedTags((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // 打開對話框
  const handleOpen = async (event) => {
    const detail = await fetch('/api/events/online_detail/' + event['_id']).then(res => res.json());
    event['event_link'] = detail['event_link'];
    event['event_content'] = detail['event_content'];
    event['event_loc_detail'] = detail['event_loc_detail'];
    setSelectedEvent(event);
    setOpen(true);
    // track('Open Event: ', { 'event_id': event['_id'], 'event_name': event['event_name'] });

    // Send a custom event
    ReactGA.event({
      category: "Open Event Dialog",
      label: event['_id'] + ' ' + event['event_name'], // optional
    });

  };

  // 關閉對話框
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  // 過濾活動
  const filteredEvents = events.filter((event) => {
    const matchesName = event.event_name.includes(searchText) || (event.event_org ? event.event_org.includes(searchText) : false);
    const matchesLoc = selectedLoc ? event.event_loc_name === selectedLoc : true;
    // const matchesAge = selectedAge ? (selectedAge >= event.event_min_age && selectedAge <= event.event_max_age) : true;

    //判斷年齡
    const eventMinAge = event.event_min_age ? parseInt(event.event_min_age, 10) : null;
    const eventMaxAge = event.event_max_age ? parseInt(event.event_max_age, 10) : null;

    const matchesAge = selectedAge ?
      ((eventMinAge === null || selectedAge >= eventMinAge) &&
        (eventMaxAge === null || selectedAge <= eventMaxAge))
      : true;

    const matchesTags = selectedTags.length > 0
      ? selectedTags.some(tag => event.event_tag_names.includes(tag))
      : true;

    return matchesName && matchesLoc && matchesAge && matchesTags;
  });

  return (
    <Box sx={{ padding: 2 }}>
      {/* 搜索框 */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="搜索 活動名稱或單位名稱"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
        }}
        sx={{ marginBottom: 2 }}
      />
      {/* 下拉選單 */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          select
          label="地區"
          value={selectedLoc}
          onChange={(e) => setSelectedLoc(e.target.value)}
          fullWidth
        >
          <MenuItem value="">全部</MenuItem>
          {locs.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="年齡"
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          fullWidth
        >
          <MenuItem value="">全部</MenuItem>
          {ages.map((age) => (
            <MenuItem key={age} value={age}>
              {age}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* 活動分類按鈕 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, marginBottom: 4 }}>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? 'contained' : 'outlined'}
            onClick={() => toggleCategory(tag)}
            sx={{
              borderRadius: 25,
              padding: '8px 16px',
              textTransform: 'none',
              fontSize: '1rem', // 設置字體大小
              fontWeight: 'bold', // 設置字體粗細
              fontFamily: 'Arial, sans-serif', // 設置字體樣式
              border: selectedTags.includes(tag) ? 'none' : '1px solid #ccc', // 未選中時顯示描邊
              backgroundColor: selectedTags.includes(tag) ? '#4A7856' : '#fff', // 選中時背景顏色
              color: selectedTags.includes(tag) ? '#fff' : '#000', // 選中與未選中時字體顏色
              '&:hover': {
                backgroundColor: selectedTags.includes(tag) ? '#3A6345' : '#f0f0f0', // hover效果
              },
            }}
          >
            #{tag}
          </Button>
        ))}
      </Box>



      {/* 過濾後的活動列表 */}
      <Masonry columns={isMobile ? 1 : 4} spacing={3}>
        {filteredEvents.map((event) => (
          <Card key={event._id} sx={{ borderRadius: 3, boxShadow: 3 }} onClick={() => handleOpen(event)}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="200"
                image={
                  event.event_img
                    ? event.event_img
                    : (event.event_min_age && event.event_min_age < 6)
                      ? '/noPic1.webp'
                      : '/noPic2.webp'
                }
                alt={event.event_name}
                loading="lazy" // 懶加載屬性
              />
              {/* 顯示 event_org 的區塊 */}
              {event.event_org && event.event_org.trim() !== '' && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'lightyellow',
                    padding: '5px',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2">{event.event_org}</Typography>
                </Box>
              )}
            </Box>
            <CardContent sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                {event.event_name}
              </Typography>
              <Typography variant="body2">{event.event_loc_name} </Typography>
              {(event.event_start_date || event.event_start_date) && (
                <Typography variant="body2">{event.event_start_date} ~ {event.event_start_date}</Typography>
              )}
              {(event.event_min_age || event.event_max_age) && (
                <Typography variant="body2">
                  年齡: {event.event_min_age} ~ {event.event_max_age}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Masonry>

      {/* 對話框 */}
      <EventDetail open={open} event={selectedEvent} onClose={handleClose} />
    </Box>
  );
};

export default MiddleLayer;
