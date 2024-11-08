import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { getAddressData, deleteAddress,addAddress } from './Address/Action';
import { AddAddressModal } from './Address/AddressPopUp';
import DeleteIcon from '@mui/icons-material/Delete';

const AddressCard = ({ index, address, fetchAddresses }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem('jwt');
        try {
            await deleteAddress(address.addressID, token);
            fetchAddresses(); // Re-fetch addresses after successful deletion
        } catch (error) {
            console.error('Failed to delete address:', error);
        }
    };

    return (
        <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-md w-full items-start">
            <div>
                <h3 className="font-semibold text-gray-700 mb-2">Address {index + 1}</h3>
                <p className="text-gray-600">
                    {address.street + ', ' + address.subDistrict + ', ' + address.district + ', ' + address.city}
                </p>
            </div>
            <Button color="success" onClick={handleDelete} className="ml-auto mt-1 ">
                <DeleteIcon fontSize="small" />
            </Button>
        </div>
    );
};

const AddressSection = ({ userId }) => {
    const [openModal, setOpenModal] = useState(false);
    const [address, setAddress] = useState([]);
    const token = localStorage.getItem('jwt');



    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false);
        fetchAddresses()
    }

    const hanleOpenAddress = () => {
        handleOpen()
    }

    const fetchAddresses = async () => {
        try {
            const addressData = await getAddressData(userId, token);
            setAddress(addressData.result);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [token, userId]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
                <Button
                    variant="contained"
                    color="success"
                    className="font-medium hover:underline"
                    onClick={hanleOpenAddress}
                >
                    + Add
                </Button>
            </div>

            <div className="grid gap-4">
                {address.map((item, index) => (
                    <AddressCard key={index} address={item} index={index} fetchAddresses={fetchAddresses} />
                ))}
            </div>

            {/* Add Address Modal */}
            <AddAddressModal open={openModal} handleClose={handleClose} />
        </div>
    );
};

// Export the AddressSection component
export const AddressProfile = ({ userId }) => {
    return <AddressSection userId={userId} />;
};
