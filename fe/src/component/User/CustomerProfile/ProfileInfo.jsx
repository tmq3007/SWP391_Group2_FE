import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddressProfile } from "./AddressProfile";

export default function ProfileInfo() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading:', selectedFile);
      // Add upload logic here
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
      <div className='flex flex-col items-center'>
        <div className='flex flex-col w-5/6 m-5 gap-5'>

          {/* Customer Info Form */}
          <Paper
              elevation={3}
              className='flex flex-col gap-2 justify-center items-center p-5 shadow-lg'
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb={4}
                  p={2}
                  border="2px dashed gray"
                  borderRadius="8px"
              >
                <CloudUploadIcon style={{ fontSize: 60, color: "gray" }} />
                <Typography variant="body1" color="textSecondary" mb={2}>
                  Upload an image or drag and drop (PNG, JPG)
                </Typography>

                {/* File input */}
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button variant="contained" component="span" color="primary">
                    Select Image
                  </Button>
                </label>

                {selectedFile && (
                    <Box mt={2} textAlign="center">
                      <Typography variant="body2" color="textPrimary">
                        Selected File: {selectedFile.name}
                      </Typography>
                      <Button
                          variant="contained"
                          color="success"
                          onClick={handleUpload}
                          style={{ marginTop: '10px' }}
                      >
                        Upload
                      </Button>
                    </Box>
                )}
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
                  rows={3}
                  fullWidth
              />

              <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
              />

              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="success" className='bg-green-500'>
                  Save
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Address Section */}
          <Paper
              elevation={3}
              className='w-full p-5 shadow-lg'
          >
            <AddressProfile />
          </Paper>
        </div>
      </div>
  );
}
