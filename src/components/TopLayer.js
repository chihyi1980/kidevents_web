import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const TopLayer = () => {
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        borderBottom: 'none', // 移除底部邊框
        backgroundColor: 'transparent', // 設置背景為透明
        boxShadow: 'none', // 移除陰影
      }}
    >
      <Toolbar>
        <Typography 
          variant="h4" 
          sx={{ flexGrow: 1, color: '#757575' }} // 調整文字顏色為灰色
        >
          <b>台灣最新兒童活動資訊</b> 
        </Typography>
        <Box>
          <IconButton sx={{ color: '#757575' }}>
            <ContactMailIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopLayer;
