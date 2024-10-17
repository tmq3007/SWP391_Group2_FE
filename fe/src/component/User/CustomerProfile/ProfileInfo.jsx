import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddressProfile } from "./AddressProfile";
import { getUser, updateUserById } from "../../State/Authentication/Action";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const jwt = localStorage.getItem("jwt");

  // Form data for profile fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    dispatch(getUser(jwt))
        .then((data) => {
          setUser(data.result); // Store user object to access ID for update
          // Populate form with fetched user data
          setFormData({
            firstname: data.result.firstName || '',
            lastname: data.result.lastName || '',
            email: data.result.email || '',
            phone: data.result.phone || ''
          });
        })
        .catch((error) => {
          console.error('Error getting user:', error);
        });
  }, [dispatch, jwt]);

  // Handle changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  console.log(user)
  // Save updated profile data
    const handleSave = () => {
        if (user && user.id) {
            // Create the payload based on the expected structure
            const updatedUser = {
                id: user.id, // Include the user ID if needed by the server
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                username: user.username, // Presuming username is not being changed
                password: user.password,// You might want to set this dynamically based on your form input or make it optional
                phone: formData.phone,
                roles: ["CUSTOMER"] // Ensure you provide the expected role(s)
            };

            // Log the payload for debugging
            console.log("Payload for updating user:", updatedUser);

            dispatch(updateUserById(user.id, updatedUser, jwt))
                .then(() => {
                    alert('Profile updated successfully!');
                })
                .catch((error) => {
                    console.error('Error updating profile:', error);
                });
        }
    };


    return (
      <div className='flex flex-col items-center'>
        <div className='flex flex-col w-5/6 m-5 gap-5'>
          {/* Profile Form */}
          <Paper elevation={3} className='flex flex-col gap-2 justify-center items-center p-5 shadow-lg'>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* File Upload Section */}
              <Box display="flex" flexDirection="column" alignItems="center" mb={4} p={2} border="2px dashed gray" borderRadius="8px">
                <CloudUploadIcon style={{ fontSize: 60, color: "gray" }} />
                <Typography variant="body1" color="textSecondary" mb={2}>
                  Upload an image or drag and drop (PNG, JPG)
                </Typography>
                {/* ... File Upload Code ... */}
              </Box>

              {/* Profile Information Fields */}
              <TextField
                  label="First Name"
                  name="firstname"
                  variant="outlined"
                  value={formData.firstname}
                  onChange={handleChange}
                  fullWidth
              />
              <TextField
                  label="Last Name"
                  name="lastname"
                  variant="outlined"
                  value={formData.lastname}
                  onChange={handleChange}
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
              <TextField
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
              />

              {/* Save Button */}
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="success" onClick={handleSave} className='bg-green-500'>
                  Save
                </Button>
              </Box>
            </Box>
          </Paper>
          {/* Address Section */}
          <Paper elevation={3} className='w-full p-5 shadow-lg'>
            <AddressProfile />
          </Paper>
        </div>
      </div>
  );
}
