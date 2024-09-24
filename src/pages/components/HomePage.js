'use client';
import React from 'react';
import TopLayer from './TopLayer';
import MiddleLayer from './MiddleLayer';
import { Container, Box, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 創建自定義主題
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: Array(25).fill('0px 4px 20px rgba(0, 0, 0, 0.1)'),
});

const HomePage = ({ events, locs, tags }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', padding: 2 }}>
        <Container maxWidth="lg">
          {/* 第一層 - 頂部 */}
          <TopLayer />

          {/* 分隔線和間距 */}
          <Box sx={{ marginY: 4 }}>
            <Divider />
          </Box>

          {/* 第二層 - 中間 */}
          <MiddleLayer events={events} locs={locs} tags={tags} />

          {/* 分隔線和間距 */}
          <Box sx={{ marginY: 4 }}>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
