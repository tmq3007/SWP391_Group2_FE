import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function ProfileInfo() {
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  return (
    <div className='flex flex-col'>
        <Paper
      elevation={3}
      style={{ padding: "20px", margin: "20px" }}
      className='flex flex-col gap-2 justify-center items-center w-1/2'
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <CloudUploadIcon style={{ fontSize: 60, color: "gray" }} />
          <Typography variant="body1" color="textSecondary">
            Upload an image or drag and drop (PNG, JPG)
          </Typography>
        </Box>

        <TextField
          label="Name"
          name="name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Bio"
          name="bio"
          variant="outlined"
          value={formData.bio}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
    </div>
  );
}
