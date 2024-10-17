import React, {useEffect, useState} from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import {getUser, updateUserById} from '../../State/Authentication/Action'; // Adjust this path to your action file

const ChangePassword = ({ userId, jwt }) => { // Receive userId and jwt as props
    const dispatch = useDispatch();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [user, setUser] = useState(null);
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
    useEffect(() => {
        dispatch(getUser(jwt))
            .then((data) => {
                setUser(data.result);

            })
            .catch((error) => {
                console.error('Error getting user:', error);
            });
    }, [dispatch, jwt]);


    const handleSubmit = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;

        // Validation checks
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match');
            return;
        }
        

        // Create a user object to update
        const userUpdateData = {
            // Current password for validation
            // Include other user properties if necessary, e.g., email, phone
        };

        try {
            await dispatch(updateUserById(userId, userUpdateData, jwt)); // Dispatch action to update user
            setSuccess('Password updated successfully');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Clear the form
        } catch (error) {
            setError('Error updating password'); // Handle errors
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Box
                className="bg-white rounded-lg p-8 w-[70%] space-y-6"
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
