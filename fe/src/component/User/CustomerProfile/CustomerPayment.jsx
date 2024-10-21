import React, { useState } from 'react';
import { NavbarShop } from "../../Navbar/NavbarShop";
import { Container } from "@mui/joy";
import Box from "@mui/material/Box";
import { IconButton, TextField, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomerPaymentList from "./CustomerPaymentList";

const CustomerPayment = () => {
    const [getPhoneNumber, setPhoneNumber] = useState("098098098");
    const [openPhoneModal, setOpenPhoneModal] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState("");

    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [address, setAddress] = useState({
        country: "",
        city: "",
        state: "",
        zipCode: "",
        streetAddress: ""
    });

    //test for item list display
    const [items] = useState([
        { name: "Soda can", amount: 1, price: 10 },
        { name: "Cookies block", amount: 2, price: 20 },
        { name: "Bread", amount: 1, price: 15 },
    ]);

    const [originalAddress, setOriginalAddress] = useState({});
    const [submittedAddresses, setSubmittedAddresses] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const changePhoneNumber = (a) => {
        return setPhoneNumber(a);
    };

    const handleClickOpenPhone = () => {
        setNewPhoneNumber("");
        setOpenPhoneModal(true);
    };

    const handleClosePhone = () => {
        setOpenPhoneModal(false);
    };

    const handleUpdate = () => {
        setPhoneNumber(newPhoneNumber);
        handleClosePhone();
    };

    const handleClickOpenAddress = () => {
        setOpenAddressModal(true);
    };

    const handleCloseAddress = () => {
        setOpenAddressModal(false);
    };

    const handleAddressConfirm = () => {
        setSubmittedAddresses([...submittedAddresses, address]);
        setAddress({
            country: "",
            city: "",
            state: "",
            zipCode: "",
            streetAddress: ""
        });
        handleCloseAddress();
    };

    const handleDeleteAddress = (index) => {
        setSubmittedAddresses(submittedAddresses.filter((_, i) => i !== index));
        setSelectedIndex(-1); // Reset selected index after deletion
    };

    const handleUpdateAddress = (index) => {
        const addr = submittedAddresses[index];
        setOriginalAddress(addr);
        setAddress(addr);
        setOpenAddressModal(true);
        setSelectedIndex(index); // Set the index for the address to update
    };

    const handleCancelUpdate = () => {
        setAddress(originalAddress);
        handleCloseAddress();
    };

    const handleConfirmUpdate = () => {
        const updatedAddresses = submittedAddresses.map((addr, index) =>
            index === selectedIndex ? address : addr
        );
        setSubmittedAddresses(updatedAddresses);
        setAddress({
            country: "",
            city: "",
            state: "",
            zipCode: "",
            streetAddress: ""
        });
        handleCloseAddress();
        setSelectedIndex(-1); // Reset selected index
    };

    return (
        <div className='w-full h-full'>
            <NavbarShop/>
            <Container sx={{ marginTop: 8, display: "flex", justifyContent: "space-between", gap: 5 }}>
                <Box sx={{ width: "70%", boxShadow: 3, padding: 2, borderRadius: 3 }}>
                    <Box sx={{ width: "100%", boxShadow: 3, padding: 2, marginBottom: 2, borderRadius: 3, '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <IconButton sx={{ borderRadius: 3 }}>
                                    <LooksOneIcon sx={{ color: "#019376" }} />
                                </IconButton>
                                <Typography>Phone number</Typography>
                            </div>
                            <Button
                                variant="outlined"
                                onClick={handleClickOpenPhone}
                                sx={{
                                    borderColor: "#019376", color: "#019376",
                                    '&:hover': { backgroundColor: '#019376', color: 'white' }
                                }}
                            >
                                + Update
                            </Button>
                        </div>
                        <TextField disabled value={getPhoneNumber} />
                    </Box>

                    <Box sx={{ width: "100%", boxShadow: 3, padding: 2, marginBottom: 2, borderRadius: 3, '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <IconButton sx={{ borderRadius: 3 }}>
                                    <LooksTwoIcon sx={{ color: "#019376" }} />
                                </IconButton>
                                <Typography>Ship address</Typography>
                            </div>
                            <Button
                                variant="outlined"
                                onClick={handleClickOpenAddress}
                                sx={{
                                    borderColor: "#019376", color: "#019376",
                                    '&:hover': { backgroundColor: '#019376', color: 'white' }
                                }}
                            >
                                + Add
                            </Button>
                        </div>

                        <Box sx={{ marginTop: 2, padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                            {submittedAddresses.map((addr, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        margin: 1,
                                        padding: 1,
                                        border: '1px solid #019376',
                                        borderRadius: 1,
                                        bgcolor: selectedIndex === index ? '#e0f7fa' : '#f9f9f9', // Highlight selected address
                                        cursor: "pointer",
                                        position: "relative",
                                    }}
                                    onClick={() => setSelectedIndex(index)} // Set selected index on click
                                >
                                    {/*<Typography sx={{*/}
                                    {/*    width: "15rem",*/}
                                    {/*    height: "3rem",*/}
                                    {/*    overflowX: "auto",*/}
                                    {/*    overflowY: "hidden",*/}
                                    {/*    whiteSpace: "nowrap",*/}
                                    {/*    display: "block",*/}
                                    {/*}}>{`${addr.streetAddress}, ${addr.city}, ${addr.state}, ${addr.zipCode}, ${addr.country}`}</Typography>*/}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Street:</Typography>
                                            <Typography>{addr.streetAddress}</Typography>
                                        </Box> hello there
                                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '0.5rem' }}>City:</Typography>
                                            <Typography>{addr.city}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '0.5rem' }}>State:</Typography>
                                            <Typography>{addr.state}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Zip Code:</Typography>
                                            <Typography>{addr.zipCode}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                            <Typography sx={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Country:</Typography>
                                            <Typography>{addr.country}</Typography>
                                        </Box>
                                    </Box>


                                    <Box sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <IconButton onClick={() => handleDeleteAddress(index)} size="small">
                                            <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleUpdateAddress(index)} size="small">
                                            <EditIcon fontSize="small" sx={{ color: "blue" }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ width: "100%", boxShadow: 3, padding: 2, marginBottom: 2, borderRadius: 3, '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <div className='flex items-center justify-items-start mb-2'>
                            <div>
                                <IconButton sx={{ borderRadius: 3 }}>
                                    <Looks3Icon sx={{ color: "#019376" }} />
                                </IconButton>
                                <Typography>Note</Typography>
                            </div>
                        </div>
                        <TextField placeholder='Note for your package...' sx={{ width: "100%", outlineStyle: 'transparent' }} />
                    </Box>
                </Box>

                    <Box sx={{ width: "30%", height: "50%", boxShadow: 3, padding: 2, borderRadius: 3 }}>
                        <CustomerPaymentList items={items} /> {/* Render the ItemsList component here */}
                    </Box>

            </Container>


            {/* Modal for updating phone number */}
            <Dialog open={openPhoneModal} onClose={handleClosePhone}>
                <DialogTitle>Update Phone Number</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePhone} sx={{ color: "#019376" }}>Cancel</Button>
                    <Button onClick={handleUpdate} sx={{ color: "#019376" }}>Update</Button>
                </DialogActions>
            </Dialog>

            {/* Modal for adding or updating address */}
            <Dialog open={openAddressModal} onClose={handleCloseAddress}>
                <DialogTitle>{originalAddress.country ? "Update Address" : "Add Address"}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Country"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="City"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="State"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Zip Code"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Street Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAddress} sx={{ color: "#019376" }}>Cancel</Button>
                <Button onClick={originalAddress.country ? handleConfirmUpdate : handleAddressConfirm} sx={{ color: "#019376" }}>
                    {originalAddress.country ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
</div>
);
};

export default CustomerPayment;








