import React, {useEffect, useRef, useState} from 'react';
import {Container, Input} from "@mui/joy";
import Box from "@mui/material/Box";
import { IconButton, TextField, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomerPaymentList from "./CustomerPaymentList";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useTabsList} from "@mui/base";
import {Label} from "@mui/icons-material";
import {padding, width} from "@mui/system";
import {REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS} from "../../State/Cart/ActionType";
import {NavbarHomePage} from "../../Navbar/NavbarHomePage";
import {useLocation} from "react-router-dom";

const getUserData = async (userId, jwt) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};

const updatePhoneNumber = async (phone,id,jwt) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/users/updatePhone/${id}/${phone}`, {},{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};

const getAddressData = async (jwt) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/addresses`, {
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};

const updateAddress = async (object,jwt) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/v1/addresses`,object, {
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};

const addAddress = async (object,jwt) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/addresses`,object, {
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};

const deleteAddress = async (id,jwt) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/addresses/${id}`, {
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CustomerPayment = () => {
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];
    console.log("Yup",selectedItems);
    const token = localStorage.getItem("jwt");
    const id = jwtDecode(token).userId;
    const [user, setUser] = useState(null);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState();

    /////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData(id, token);
                setUser(userData.result);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id, token]);
    console.log("1",user);

    ///////////////////////////////////////////////////////////////
    useEffect(() => {
        const fetchData = async () => {
            try {
                const addressData = await getAddressData(token);
                setAddress(addressData );
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [token]);
    console.log("2",address);

    ///////////////////////////////////////////////////////////////////////
    var array =  (address.result) ? (address.result.filter((item) => item.user.id === user.id)) : [];
    console.log(array);


    ///////////////////////////////////////////////////////////////////////
    const cityRef = useRef();
    const districtRef = useRef();
    const subDistrictRef = useRef();
    const streetRef = useRef();
    const noteRef = useRef("");
    ///////////////////////////////////////////////////////////////////////
    const addCityRef = useRef();
    const addDistrictRef = useRef();
    const addStreetRef = useRef();
    const addSubDistrictRef = useRef();
    ////////////////////////////////////////////////////////////////////////
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdatePhone, setOpenUpdatePhone] = useState(false);
    const [openUpdateError, setOpenUpdateError] = useState(false);
    const [openAddError, setOpenAddError] = useState(false);
    const [openUpdatePhoneError, setOpenUpdatePhoneError] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const regex = /^(?!\s*$).*/;
    ////////////////////////////////////////////////////////////////////////
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }
    const handleCloseAdd = () => {
        setOpenAdd(false);
    }
    const handleCloseUpdatePhone = () => {
        setOpenUpdatePhone(false);
    }
    const handleCloseUpdateError = () => {
        setOpenUpdateError(false);
    }
    const handleCloseAddError  = () => {
        setOpenAddError(false);
    }
    const handleCloseUpdatePhoneError = () => {
        setOpenUpdatePhoneError(false);
    }
    const handleCloseWarning = () => {
        setOpenWarning(false);
    }
    ///////////////////////////////////////////////////////////
    const [chosenAddress, setChosenAddress] = useState({});
    const [update, setUpdate] = useState({
        addressID:-1,
        city:"",
        district:"",
        subDistrict:"",
        street:"",
        id: -1
    });
    //////////////////////////////////////////////////////////
    const RegexCheck = (object) => {
        return regex.test(object.city)
        && regex.test(object.district)
        && regex.test(object.street)
        && regex.test(object.subDistrict);
    };
    const updateThis = (index) => {
        setChosenAddress(array[index]);
        setOpenUpdate(true);
    }
    const submitUpdateThis = async () => {
        const cityValue = cityRef.current.value;
        const districtValue = districtRef.current.value;
        const subDistrictValue = subDistrictRef.current.value;
        const streetValue = streetRef.current.value;

        console.log("1 ", cityValue);
        console.log("2 ", districtValue);
        console.log("3 ", streetValue);
        console.log("4 ", subDistrictValue);

        // Set the update state
        const newUpdate = {
            addressID: chosenAddress.addressID,
            city: cityValue,
            district: districtValue,
            subDistrict: subDistrictValue,
            street: streetValue
        };

        console.log(newUpdate);
        if (RegexCheck(newUpdate)) {
            await updateAddress(newUpdate,token);
            const updatedAddresses = await getAddressData(token);
            setAddress(updatedAddresses);
            handleCloseUpdate();
        }else{
            setOpenUpdateError(true);
        }
    }

    const addThis = () => {
        setOpenAdd(true);
    }
    const submitAddThis = async () => {
        const cityValue = addCityRef.current.value;
        const districtValue = addDistrictRef.current.value;
        const subDistrictValue = addSubDistrictRef.current.value;
        const streetValue = addStreetRef.current.value;

        console.log("1 ", cityValue);
        console.log("2 ", districtValue);
        console.log("3 ", streetValue);
        console.log("4 ", subDistrictValue);

        // Set the update state
        const newAdd = {
            city: cityValue,
            district: districtValue,
            subDistrict: subDistrictValue,
            street: streetValue,
            user: id
        };
        console.log(newAdd);
        if (RegexCheck(newAdd)) {
            await addAddress(newAdd,token);
            const updatedAddresses = await getAddressData(token);
            setAddress(updatedAddresses);
            handleCloseAdd();
        }else{
            setOpenAddError(true);
        }
    }

    const deleteThis = (index) => {
        setChosenAddress(array[index]);
        setOpenWarning(true);
    }
    const trigger = async () => {
        console.log(chosenAddress.addressID);
        const deleteId = chosenAddress.addressID;
        if(deleteId >= 1){
            await deleteAddress(deleteId,token);
            const updatedAddresses = await getAddressData(token);
            setAddress(updatedAddresses);
            handleCloseWarning();}
        else{
            console.log("Error");
            }
        }
    const phoneRegex = /^\d{10,11}$/;
    const phoneRef = useRef();
    const updateThisPhone = () => {
        setOpenUpdatePhone(true);
    }
    const submitUpdateThisPhone = async () => {
        const newPhone = phoneRef.current.value;
        console.log(newPhone);
        if(phoneRegex.test(newPhone)){
            await updatePhoneNumber(newPhone,id,token);
            const newUser = await getUserData(id,token);
            setUser(() => ({
                ...user,
                phone: newPhone
            }));
            console.log(user);
        }else{
            setOpenUpdatePhoneError(true);
        }
    }
    return (

        <div className='w-full h-full'>
            <NavbarHomePage/>

            <Container sx={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 5 }}>
                <div className='w-full'>
                    <Box sx={{ width: "100%", boxShadow: 3, padding: 2, marginBottom: 2, borderRadius: 3, '&:hover': { backgroundColor: 'none' } }}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <IconButton sx={{ borderRadius: 3 }}>
                                    <LooksOneIcon sx={{ color: "#019376" }} />
                                </IconButton>
                                <Typography>Phone number</Typography>
                            </div>
                            <Button
                                variant="outlined"
                                onClick={updateThisPhone}
                                sx={{borderColor: "#019376", color: "#019376",
                                    '&:hover': { backgroundColor: '#019376', color: 'white' }}}>
                                + Update
                            </Button>

                        </div>
                        <TextField disabled value={(user !== null) ? user.phone : ""}/>
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
                                onClick={addThis}
                                sx={{
                                    borderColor: "#019376", color: "#019376",
                                    '&:hover': { backgroundColor: '#019376', color: 'white' }
                                }}

                            >
                                + Add
                            </Button>
                        </div>

                        <Box sx={{ marginTop: 2, padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                            {array.length > 0 && array.map((addr, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',  // Align content horizontally
                                        justifyContent: 'space-between',  // Push buttons to the right
                                        alignItems: 'center',
                                        margin: 1,
                                        padding: 1,
                                        border: '1px solid #019376',
                                        borderRadius: 1,
                                        bgcolor: selectedIndex === index ? '#e0f7fa' : '#f9f9f9', // Highlight selected address
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {setSelectedIndex(index); console.log(index);}} // Set selected index on click
                                >
                                    <Typography>
                                        {`${addr.city}, ${addr.street}, ${addr.district}, ${addr.subDistrict}`}
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton onClick={(e) => { e.stopPropagation(); updateThis(index); }}>
                                            <EditIcon fontSize="small" sx={{ color: 'blue' }} />
                                        </IconButton>
                                        <IconButton onClick={(e) => { e.stopPropagation(); deleteThis(index); }}>
                                            <DeleteIcon fontSize="small" sx={{ color: 'red' }} />
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

                            </div>
                            <Typography>Note</Typography>
                        </div>
                        <TextField placeholder='Note for your package...' sx={{ width: "100%", outlineStyle: 'transparent' }} inputRef={noteRef} />
                    </Box>
                </div>
                    <Box sx={{ width: "40%", height: "490px", boxShadow: 3, padding: 2, borderRadius: 3 }}>
                        <CustomerPaymentList  chosenAddress={(array.length > 0 && selectedIndex !== -1) ? array[selectedIndex] : null} chosenPhone={(user !== null) ? user.phone : null} item={selectedItems} note={noteRef.current.value}/> {/* Render the ItemsList component here */}
                    </Box>
            </Container>

            {/* add new address */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogContent sx={{marginTop: "20px"}}>
                    <Typography variant="h6" sx={{color: "#019376"}}>Add new address for your payment</Typography>

                    <TextField
                        label="City"
                        name="city"
                        inputRef={addCityRef}
                        fullWidth
                        margin="dense"
                        sx={{marginTop: "20px"}}
                    />

                    <TextField
                        label="District"
                        name="district"
                        inputRef={addDistrictRef}
                        fullWidth
                        margin="dense"
                    />

                    <TextField
                        label="Street"
                        name="street"
                        inputRef={addStreetRef}
                        fullWidth
                        margin="dense"
                    />

                    <TextField
                        label="subdistrict"
                        name="subdistrict"
                        inputRef={addSubDistrictRef}
                        fullWidth
                        margin="dense"
                    />


                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" sx={{marginRight: "30px"}} onClick={submitAddThis}>
                        Submit
                    </Button>
                </DialogActions>
                <DialogContent>
                    <Typography variant="caption" display="block" fontSize="15px" gutterBottom>
                        (Click outside the form to close.)
                    </Typography>
                </DialogContent>
            </Dialog>
            {/* update phone number */}
            <Dialog open={openUpdatePhone} onClose={handleCloseUpdatePhone}>
                <DialogContent >
                    <Typography>Update your phone number</Typography>
                    <Box sx={{marginTop: "20px"}}>
                        <TextField
                            label="Your old phone number is"
                            name="phone"
                            value={(user !== null) ? user.phone : ""}
                            fullWidth
                            margin="dense"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            label="New phone number"
                            name="phone1"
                            inputRef={phoneRef}
                            /*value={formData.country}*/
                            /*onChange={handleChange}*/
                            fullWidth
                            margin="dense"
                        />
                        <Button variant={"contained"} color={"primary"} onClick={submitUpdateThisPhone}> Update </Button>
                    </Box>

                </DialogContent>
                <Typography>( Click out from the message to close.)</Typography>
            </Dialog>

            {/* update old address */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate}>
                <DialogContent>
                    <Typography fontSize="30px" color={"#019376"} sx={{marginBottom:"20px"}}>Update address</Typography>
                    <Typography fontSize="20px">Your old address is </Typography>
                    <Typography>{chosenAddress.city+", "+chosenAddress.district+", "+chosenAddress.street+", "+chosenAddress.subDistrict}</Typography>
                    <Box>
                        <TextField
                            label="City"
                            name="city1"
                            inputRef={cityRef}
                            fullWidth
                            margin="dense"
                            sx={{marginTop: "20px"}}
                        />

                        <TextField
                            label="District"
                            name="district1"
                            inputRef={districtRef}
                            fullWidth
                            margin="dense"
                        />

                        <TextField
                            label="Street"
                            name="street1"
                            inputRef={streetRef}
                            fullWidth
                            margin="dense"
                        />

                        <TextField
                            label="subdistrict"
                            name="subdistrict1"
                            inputRef={subDistrictRef}
                            fullWidth
                            margin="dense"
                        />
                        <Button variant={"contained"} color={"primary"} sx={{marginTop:"20px"}} onClick={submitUpdateThis}>
                            Update address
                        </Button>
                    </Box>
                </DialogContent>
                <Typography margin={"10px"}>
                    ( Click out from the message to close.)
                </Typography>
            </Dialog>

            <Dialog open={openWarning} onClose={handleCloseWarning}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"}>Warning</Typography>
                    <Typography fontSize={"20px"} >Do you really want to delete this address</Typography>
                    <Typography fontSize={"20px"} sx={{color:"red"}} >{chosenAddress.city +", "+chosenAddress.district+", "+chosenAddress.street+", "+chosenAddress.subDistrict}</Typography>
                    <Button variant={"contained"} color={"primary"} sx={{marginTop:"20px",marginBottom:"20px"}} onClick={trigger}>Delete</Button>
                    <Typography marginTop={"20px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openUpdateError} onClose={handleCloseUpdateError}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"}>Error</Typography>
                    <Typography fontSize={"20px"} >Cannot update current address </Typography>
                    <Typography fontSize={"20px"} sx={{color:"red"}} >Check back input information, ensure it not empty or contain any special character!</Typography>
                    <Typography marginTop={"20px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openAddError} onClose={handleCloseAddError}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"}>Add Error</Typography>
                    <Typography fontSize={"20px"} >Cannot add new address </Typography>
                    <Typography fontSize={"20px"} sx={{color:"red"}} >Check back input information, ensure it not empty or contain any special character!</Typography>
                    <Typography marginTop={"20px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openUpdatePhoneError} onClose={handleCloseUpdatePhoneError}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"} margin={"20px"}>UPDATE FAILED</Typography>
                    <Typography fontSize={"20px"} margin={"15px"}>Update current phone failed.</Typography>
                    <Typography fontSize={"20px"}  margin={"15px"}>Phone number must be 10 to 11 number</Typography>
                    <Typography marginTop={"20px"} margin={"15px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>
</div>
    )
}


export default CustomerPayment;








