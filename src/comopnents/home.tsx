import React from 'react';
import { Box, Typography } from '@mui/material';

export default () => {
  return (
    <Box
    >
      <Typography
        variant="h1" // כותרת בגודל גדול
        sx={{
          color: '#000000', // צבע טקסט שחור
          fontWeight: 'bold', // עיבוי לאותיות
          fontFamily: '"Roboto", sans-serif', // סוג גופן מעניין
          textShadow: '3px 3px 6px rgba(255, 255, 255, 0.7)', // צללת טקסט בהיר להדגשה על רקע כהה
          fontSize: { xs: '5rem', sm: '8rem', lg: '10rem' }, // גודל טקסט משתנה בהתאם לגודל המסך (גדול מאוד)
          textAlign: 'center', // ממורכז
        }}
      >
        Welcome
      </Typography>
    </Box>
  );
};

