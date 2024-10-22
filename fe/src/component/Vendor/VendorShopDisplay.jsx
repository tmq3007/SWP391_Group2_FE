import React from 'react';
import { Avatar, Box, Typography, Grid, Divider } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';

const ShopDisplay = ({ shop }) => {
    console.log("Address >> ",shop);

  return (
    <Box
      sx={{
        width: '100%',      // Ensure it takes the full width of its parent
        height: '100%',     // Ensure it takes the full height of its parent
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Avatar and Shop Information */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            marginRight: 2,
            backgroundColor: '#d2691e',
          }}
        />
        <Box>
          <Typography variant="h6">{}</Typography>
          <Typography variant="body2" color="text.secondary">
            <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {shop.address + ", "+ shop.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Phone fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {shop.phone}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, width: '100%' }} />

      {/* Statistics Grid */}
      <Grid container spacing={2} justifyContent="space-between">

        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Paid Orders
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Total Orders
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Total Revenue
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopDisplay;
