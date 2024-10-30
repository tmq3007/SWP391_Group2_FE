import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import FolderOffIcon from '@mui/icons-material/FolderOff';
const VendorDisplayNotification = ({ data,user }) => {
    const cuser = user;
    console.log("3",user);
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: 'center',
        width: '100%',  // Ensures it takes the full width of the parent
        height: '100%', // Ensures it takes the full height of the parent
        boxSizing: 'border-box', // Ensures padding is included in the width/height
      }}
    >
      {data && data.length > 0 ? (
        <List>
          {data.map((notification, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={notification.message} secondary={notification.date} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%',width: '100%', justifyContent: 'center' }}>
          <FolderOffIcon/>
          <Typography variant="h6" color="text.secondary">
            Sorry, No Notice Found :(
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VendorDisplayNotification;
