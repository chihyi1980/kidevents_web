import React from 'react';
import TopLayer from './components/TopLayer';
import MiddleLayer from './components/MiddleLayer';
import BottomLayer from './components/BottomLayer';
import { Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <TopLayer />
      <MiddleLayer />
      <BottomLayer />
    </Container>
  );
};

export default HomePage;
