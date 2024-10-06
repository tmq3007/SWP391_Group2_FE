import React from 'react';
import { Avatar, Box, Typography, Grid, Divider } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';

const ShopDisplay = ({ shop }) => {
  const { name, address, phone, avatar, commission, sale, balance, withdraw } = shop;

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
          src={avatar} // Shop's avatar
        />
        <Box>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Phone fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {phone}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, width: '100%' }} />

      {/* Statistics Grid */}
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {commission}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Commission
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {sale}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Sale
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {balance}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Balance
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="center" variant="h6">
            {withdraw}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Withdraw
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopDisplay;
