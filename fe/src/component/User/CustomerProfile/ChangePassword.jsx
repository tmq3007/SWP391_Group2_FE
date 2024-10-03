import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
        setError('');
    };

    const handleSubmit = () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match');
            return;
        }

        // Add logic to update password here, such as an API call
        setSuccess('Password updated successfully');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Box
                className="bg-white rounded-lg p-8 w-[70%] space-y-6" // Using space-y-6 to apply consistent spacing between elements
                component="form"
            >
                <Typography variant="h5" className="text-center font-semibold">
                    Change Password
                </Typography>

                <TextField
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                />

                <TextField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={passwordData.newPassword}
                    onChange={handleChange}
                />

                <TextField
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                />

                {error && (
                    <Typography variant="body2" className="text-red-500">
                        {error}
                    </Typography>
                )}

                {success && (
                    <Typography variant="body2" className="text-green-500">
                        {success}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600"

                >
                    Update Password
                </Button>
            </Box>
        </div>
    );
};

export default ChangePassword;
