import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddressProfile } from "./AddressProfile";
import { getUser, updateUserById } from "../../State/Authentication/Action";
import { useDispatch } from "react-redux";

export default function ProfileInfo() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const jwt = localStorage.getItem("jwt");

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        phone: ''
    });

    useEffect(() => {
        dispatch(getUser(jwt))
            .then((data) => {
                setUser(data.result);
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

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePhone = (phone) => /^\d{10}$/.test(phone);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Validate the fields as they change
        if (name === "email") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: validateEmail(value) ? '' : 'Please enter a valid email address.'
            }));
        }

        if (name === "phone") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: validatePhone(value) ? '' : 'Phone number must be 10 digits.'
            }));
        }
    };

    const handleSave = () => {
        if (!errors.email && !errors.phone && user && user.id) {
            const updatedUser = {
                ...user,
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                roles: ["CUSTOMER"]
            };

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
                <Paper elevation={3} className='flex flex-col gap-2 justify-center items-center p-5 shadow-lg'>
                    <Box display="flex" flexDirection="column" gap={2} sx={{width:400}}>


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
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />

                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" color="success" onClick={handleSave} className='bg-green-500'>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                <Paper elevation={3} className="w-full p-5 shadow-lg">
                    {user ? (
                        <AddressProfile userId={user.id} />
                    ) : (
                        <p>No user information available</p>
                    )}
                </Paper>
            </div>
        </div>
    );
}
