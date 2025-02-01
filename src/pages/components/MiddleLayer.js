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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // 使用 Dayjs 來處理日期
import dayjs from 'dayjs'; // 引入 dayjs 來處理日期

const ages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

const MiddleLayer = ({ events = [], locs = [], tags = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 過濾條件狀態
  const [searchText, setSearchText] = useState('');
  const [selectedLoc, setSelectedLoc] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [startDate, setStartDate] = useState(null); // 開始日期
  const [endDate, setEndDate] = useState(null); // 結束日期

  // 對話框狀態
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 排序地點列表
  const sortedLocs = [...locs].sort((a, b) => {
    if (a.order === b.order) {
      return a.value.localeCompare(b.value);
    }
    return a.order - b.order;
  });

  const toggleCategory = (category) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(category)) {
        return prevTags.filter(tag => tag !== category);
      } else {
        return [...prevTags, category];
      }
    });
  };

  // 打開對話框
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
    ReactGA.event({
      category: "Open Event Dialog",
      action: "Open Event Dialog",
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

    //判斷年齡
    const eventMinAge = event.event_min_age ? parseInt(event.event_min_age, 10) : null;
    const eventMaxAge = event.event_max_age ? parseInt(event.event_max_age, 10) : null;
    const matchesAge = selectedAge ? ((eventMinAge != null && eventMaxAge != null) && (eventMinAge === null || selectedAge >= eventMinAge) && (eventMaxAge === null || selectedAge <= eventMaxAge)) : true;

    // 判斷標籤
    const matchesTags = selectedTags.length > 0
      ? selectedTags.some(tag => event.event_tag_names.includes(tag))
      : true;

    // 判斷日期篩選條件
    const eventEndDate = event.event_end_date ? dayjs(event.event_end_date) : null;
    const matchesStartDate = startDate ? (!eventEndDate || eventEndDate.isAfter(startDate) || eventEndDate.isSame(startDate)) : true;
    const matchesEndDate = endDate ? (!eventEndDate || eventEndDate.isBefore(endDate) || eventEndDate.isSame(endDate)) : true;

    return matchesName && matchesLoc && matchesAge && matchesTags && matchesStartDate && matchesEndDate;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 2 }}>
        {/* 搜索框 */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="搜索 活動名稱 或 單位名稱"
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
            {sortedLocs.map((loc) => (
              <MenuItem key={loc.value} value={loc.value}>
                {loc.value}
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

        {/* 日期選擇框 */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <DatePicker
            label="開始日期"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                size: 'medium',
                fullWidth: true
              }
            }}
            sx={{ flex: 1 }}
          />
          <DatePicker
            label="結束日期"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                size: 'medium',
                fullWidth: true
              }
            }}
            sx={{ flex: 1 }}
          />
        </Box>

        {/* 活動分類按鈕 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, marginBottom: 4 }}>
          {tags.map((tag) => (
            <Button
              key={tag.value}
              variant={selectedTags.includes(tag.value) ? 'contained' : 'outlined'}
              onClick={() => toggleCategory(tag.value)}
              sx={{
                borderRadius: 25,
                padding: '8px 16px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif',
                border: selectedTags.includes(tag.value) ? 'none' : '1px solid #ccc',
                backgroundColor: selectedTags.includes(tag.value) ? '#4A7856' : '#fff',
                color: selectedTags.includes(tag.value) ? '#fff' : '#000',
                '&:hover': {
                  backgroundColor: selectedTags.includes(tag.value) ? '#3A6345' : '#f0f0f0',
                },
              }}
            >
              #{tag.value}
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
                <Typography variant="body2">{event.event_loc_name}</Typography>
                {(event.event_start_date || event.event_end_date) && (
                  <Typography variant="body2">
                    {event.event_start_date} ~ {event.event_end_date}
                  </Typography>
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
    </LocalizationProvider>
  );
};

export default MiddleLayer;
