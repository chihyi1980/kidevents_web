import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import FestivalIcon from '@mui/icons-material/Festival';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';

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
          variant="h6" 
          sx={{ flexGrow: 1, color: '#757575' }} // 調整文字顏色為灰色
        >
          Kid Events
        </Typography>
        <Box>
          <IconButton sx={{ color: '#757575' }}> {/* 調整圖標顏色為灰色 */}
            <FestivalIcon />
          </IconButton>
          <IconButton sx={{ color: '#757575' }}>
            <InfoIcon />
          </IconButton>
          <IconButton sx={{ color: '#757575' }}>
            <ContactMailIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopLayer;
