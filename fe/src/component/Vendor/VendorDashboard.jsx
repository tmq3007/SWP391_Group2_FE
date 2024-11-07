import React, { useEffect, useState } from 'react';
import VendorLeftBar from './VendorLeftBar';
import VendorRightBar from './VendorRightBar';
import { NavbarShop } from "../Navbar/NavbarShop";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {VendorNavbar} from "./VerdorNavbar";

const getUserData = async (id, jwt) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/shops/getShopInformationByUserId/${id}`, {
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

const VendorDashboard = () => {
    const [selectedPage, setSelectedPage] = useState(1);
    const token = localStorage.getItem('jwt');
    const id = jwtDecode(token).userId;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData(id, token);
                setUser((userData.result) ? userData.result : {});
                console.log("User data:", userData);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        fetchData();
    }, [id, token]);
    console.log("user", user);

    if (loading) {
        return <div>Loading...</div>; // Show loading message until data is fetched
    }
    console.log()
    return (
        <div className="w-full h-full overflow-hidden m-0">
            <VendorNavbar className="w-[100vw] h-[10vh] px-5 z-50 lg:px-20 flex items-center"/>
            <div className='flex w-full h-[90vh] overflow-hidden'>
                <VendorLeftBar onSelect={setSelectedPage} ooo={user}/>
                <VendorRightBar selectedPage={selectedPage} ooo={user}/>
            </div>
        </div>
    );
};

export default VendorDashboard;
