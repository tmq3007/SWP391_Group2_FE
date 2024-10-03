import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';

const AddressCard = ({ title, address }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
            <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
            <p className="text-gray-600">{address}</p>
        </div>
    );
};

const AddAddressModal = ({ open, handleClose }) => {
    const [addressData, setAddressData] = useState({
        type: 'Billing',
        title: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        street: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddressData({ ...addressData, [name]: value });
    };

    const handleSubmit = () => {
        console.log(addressData);
        handleClose(); // Close modal after submission
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth className='border-8'>
            <DialogTitle className="text-lg font-bold p-4 justify-center items-center text-center">Add New Address</DialogTitle>
            <DialogContent className="p-4">
                <div className='mb-4'>
                    {/*//title*/}
                    <span className='font-semibold'> Title </span>
                    <TextField
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={addressData.title}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4 font-semibold"
                    />
                </div>

                {/*//city*/}
                <div className='mb-4'>
                    <span className='font-semibold'> City </span>
                    <TextField
                        label="City"
                        name="city"
                        variant="outlined"
                        value={addressData.city}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4"
                    />
                </div>
                {/*//district*/}
                <div className='mb-4'>
                    <span className='font-semibold'> District </span>
                    <TextField
                        label="District"
                        name="district"
                        variant="outlined"
                        value={addressData.title}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4 font-semibold"
                    />
                </div>
                {/*//Sub-district*/}
                <div className='mb-4'>
                    <span className='font-semibold'> Sub-district </span>
                    <TextField
                        label="Sub-district"
                        name="Sub-district"
                        variant="outlined"
                        value={addressData.title}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4 font-semibold"
                    />
                </div>
                {/*//Detail*/}
                <div className='mb-4'>
                    <span className='font-semibold'> Street Address </span>
                    <TextField
                        label="Street Address"
                        name="street"
                        variant="outlined"
                        value={addressData.street}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        fullWidth
                        className="mb-4"
                    />
                </div>



            </DialogContent>
            <DialogActions className="flex justify-end">

                <Button onClick={handleSubmit} variant="contained" color="success" fullWidth className="bg-green-500 ">
                    Update Address
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const AddressSection = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const billingAddress = '2231 Kidd Avenue, AK, Kipnuk, 99614, United States';
    const shippingAddress = '2148 Straford Park, KY, Winchester, 40391, United States';

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
                <Button variant="contained" color="success" className=" font-medium hover:underline" onClick={handleOpen}>+ Add</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AddressCard title="Billing" address={billingAddress} />
                <AddressCard title="Shipping" address={shippingAddress} />
            </div>

            {/* Add Address Modal */}
            <AddAddressModal open={openModal} handleClose={handleClose} />
        </div>
    );
};

// Export the AddressSection component
export const AddressProfile = () => {
    return <AddressSection />;
};
