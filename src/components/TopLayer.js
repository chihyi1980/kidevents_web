import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const TopLayer = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          我的 Logo
        </Typography>
        {/* 功能選單 */}
        <Box>
          <Button color="inherit">首頁</Button>
          <Button color="inherit">關於我們</Button>
          <Button color="inherit">聯絡</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopLayer;
