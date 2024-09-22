'use client';  // 將這行加在文件的最頂部

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Card, CardContent, CardMedia, Snackbar, SnackbarContent, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';

const EventDetail = ({ open, event, onClose }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 處理分享連結
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + 'event/' + event['_id']); // 將當前 URL 複製到剪貼簿
    setSnackbarOpen(true); // 顯示提示訊息
  };

  // 關閉提示訊息
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: '90%' } }}>
      <DialogTitle>
        {/* 將 IconButton 放在一行 */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton edge="end" color="inherit" onClick={handleShare} aria-label="share" sx={{ marginRight: 1 }}>
            <ShareIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        {/* 將活動名稱放在下一行 */}
        <Typography variant="h5" gutterBottom align="center">
          {event?.event_name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {event && (
          <>
            {event.event_img && event.event_img.trim() !== '' && (
              <CardMedia component="img" image={event.event_img} alt={event.event_name} sx={{ marginBottom: 2, maxWidth: '100%', height: 'auto' }} />
            )}
            <Typography variant="body1" gutterBottom>
              活動連結: <a href={event.event_link} target="_blank" rel="noopener noreferrer">{event.event_link}</a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              活動日期: {new Date(event.event_start_date).toLocaleDateString()} ~ {new Date(event.event_end_date).toLocaleDateString()}
            </Typography>
            {(event.event_min_age || event.event_max_age) && (
              <Typography variant="body1" gutterBottom>
                適合年齡: {event.event_min_age} ~ {event.event_max_age} 歲
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              活動地點: {event.event_loc_detail}
            </Typography>
            <Typography variant="body1" gutterBottom>
              活動價格: {event.event_price} 元
            </Typography>
            <Typography variant="body1" gutterBottom>
              活動類型: {event.event_tag_names.join(', ')}
            </Typography>
            <Card>
              <CardContent>
                {event.event_content}
              </CardContent>
            </Card>
          </>
        )}
      </DialogContent>

      {/* 提示訊息 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // 3秒後自動關閉
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }} // 設定提示訊息在畫面正中央
      >
        <SnackbarContent
          message="活動連結已複製"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // 半透明白色背景
            color: '#000', // 黑色文字
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        />
      </Snackbar>
    </Dialog>
  );
};

export default EventDetail;
