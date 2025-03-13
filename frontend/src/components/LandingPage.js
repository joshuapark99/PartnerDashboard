import React, { useEffect, useState, useContext } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import InfoBox from './InfoBox';
import TestList from './TestList';
import WorkHours from './WorkHours';
import Appointments from './Appointments';
import { UserContext } from '../utils/userContext';
import { getPartnerById } from '../services/partnerService';

const LandingPage = () => {

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Partner Dashboard
        </Typography>

        <InfoBox />

        <TestList />

        <WorkHours />

        <Appointments />
      </Box>
    </Container>
  );
};

export default LandingPage;
