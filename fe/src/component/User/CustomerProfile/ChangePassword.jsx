import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import {getUser, changePassword, updateUserById} from '../../State/Authentication/Action';

const ChangePassword = ({ userId, jwt }) => {
    const j = localStorage.getItem("jwt");


    const dispatch = useDispatch();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordData((prevData) => ({ ...prevData, [name]: value }));
        setMessage({ type: '', text: '' });
    };


    const handleSubmit = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New password and confirmation do not match' });
            return;
        }
        const req = {
            oldPassword: currentPassword,
            newPassword: newPassword
        }

        dispatch(changePassword(userId,req,jwt))
            .then(() => {
                alert('Password is changed!');
            })
            .catch((error) => {
                setMessage({ type: 'error', text: error.message || 'Failed to change password' });
            });

    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Box className="bg-white rounded-lg p-8 w-[70%] space-y-6" component="form">
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

                {message.text && (
                    <Typography variant="body2" className={`text-${message.type === 'error' ? 'red' : 'green'}-500`}>
                        {message.text}
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
                {/* Input fields and Submit button */}
            </Box>
        </div>
    );
};

export default ChangePassword;
