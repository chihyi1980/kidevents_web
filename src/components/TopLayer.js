import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Dialog, DialogTitle, DialogContent, TextField, Button, Snackbar, Alert } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import emailjs from 'emailjs-com';

const TopLayer = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ eventName: '', eventLink: '', eventContent: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 打開對話框
  const handleOpen = () => {
    setOpen(true);
  };

  // 關閉對話框
  const handleClose = () => {
    setOpen(false);
  };

  // 更新表單數據
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 提交表單
  const handleSubmit = () => {
    // 使用 EmailJS 發送郵件
    emailjs.send(
      'service_8ms1lqq',  // 替換為你的 EmailJS 服務 ID
      'template_rc06mdg', // 替換為你的 EmailJS 模板 ID
      {
        event_name: formData.eventName,
        event_link: formData.eventLink,
        event_content: formData.eventContent,
        from_name: 'Kid Events', // 添加發件者名稱，可選
      },
      'XslLmnh_8sOy7fTT9' // 替換為你的 EmailJS 用戶 ID
    ).then(
      (result) => {
        console.log('Email sent successfully:', result.text);
        setSnackbarOpen(true); // 打開提示訊息
      },
      (error) => {
        console.error('Failed to send email:', error.text);
      }
    );

    setOpen(false); // 關閉對話框
  };
  // 關閉提示訊息
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, color: '#757575' }}
        >
          <b>台灣最新兒童活動資訊</b>
        </Typography>
        <Box>
          <IconButton sx={{ color: '#757575' }} onClick={handleOpen}>
            <ContactMailIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* 彈出對話框 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>想將您的活動加入其中嗎?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">活動名稱</Typography>
          <TextField
            name="eventName"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData.eventName}
            onChange={handleChange}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>活動連結</Typography>
          <TextField
            name="eventLink"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formData.eventLink}
            onChange={handleChange}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>活動內容</Typography>
          <TextField
            name="eventContent"
            fullWidth
            variant="outlined"
            margin="dense"
            multiline
            rows={4}
            value={formData.eventContent}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={handleClose} sx={{ marginRight: 1 }}>取消</Button>
            <Button onClick={handleSubmit} variant="contained">提交</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* 提示訊息 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // 3秒後自動關閉
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          發送成功
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default TopLayer;
