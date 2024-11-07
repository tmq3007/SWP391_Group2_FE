import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { addAddress } from "../../../State/Address/Action";
import { useDispatch } from "react-redux";
import { getUser } from "../../../State/Authentication/Action";

export const AddAddressModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
                .then((data) => {
                    setUserId(data.result.id);
                })
                .catch((error) => {
                    console.error('Error getting user:', error);
                });
        }
    }, [dispatch, jwt]);

    console.log("userId", userId); // Check if userId is correctly set

    const [addressData, setAddressData] = useState({
        city: '',
        district: '',
        street: '',
        subDistrict: '',
        user: '' // Initially empty, will be set once userId is fetched
    });

    useEffect(() => {
        if (userId) {
            setAddressData((prevState) => ({
                ...prevState,
                user: userId, // Dynamically set userId into the addressData
            }));
        }
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddressData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Validation check to ensure all fields are filled
        const { city, district, street, subDistrict } = addressData;
        if (!city || !district || !street || !subDistrict) {
            alert("Please fill in all the fields.");
            return;
        }

        console.log(addressData); // Log address data to ensure it's correct
        dispatch(addAddress(addressData, jwt))
            .then(() => {
                handleClose(); // Close modal after successful submission
            })
            .catch((error) => {
                console.error("Failed to add address", error);
            });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth className='border-8'>
            <DialogTitle className="text-lg font-bold p-4 justify-center items-center text-center">Add New Address</DialogTitle>
            <DialogContent className="p-4">
                {/* City */}
                <div className='mb-4'>
                    <span className='font-semibold'> City </span>
                    <TextField
                        name="city"
                        variant="outlined"
                        value={addressData.city}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4"
                        required // Make field required
                    />
                </div>
                {/* District */}
                <div className='mb-4'>
                    <span className='font-semibold'> District </span>
                    <TextField
                        name="district"
                        variant="outlined"
                        value={addressData.district}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4 font-semibold"
                        required // Make field required
                    />
                </div>
                {/* Sub-district */}
                <div className='mb-4'>
                    <span className='font-semibold'> Sub-district </span>
                    <TextField
                        name="subDistrict"
                        variant="outlined"
                        value={addressData.subDistrict}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4 font-semibold"
                        required // Make field required
                    />
                </div>
                {/* Street Address */}
                <div className='mb-4'>
                    <span className='font-semibold'> Street Address </span>
                    <TextField
                        name="street"
                        variant="outlined"
                        value={addressData.street}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        fullWidth
                        className="mb-4"
                        required // Make field required
                    />
                </div>
            </DialogContent>
            <DialogActions className="flex justify-end">
                <Button onClick={handleSubmit} variant="contained" color="success" fullWidth className="bg-green-500">
                    Update Address
                </Button>
            </DialogActions>
        </Dialog>
    );
};
