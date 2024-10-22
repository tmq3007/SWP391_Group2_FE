import React, {useEffect, useState} from 'react'
import { VendorNavbar } from './VerdorNavbar'
import VendorLeftBar from './VendorLeftBar'
import VendorRightBar from './VendorRightBar'
import {NavbarShop} from "../Navbar/NavbarShop";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {getUser} from "../State/Authentication/Action";

const VendorDashboard = () => {
  const[selectedPage,setSelectedPage] = useState(1);
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(atob(token.split('.')[1]));
    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (err) {
            console.error("Invalid JWT token:", err);
            return true;
        }
    };

    // GET SHOP ID BY USER ID - PASSED
    const [id, setId] = useState(); // Start with null for clarity
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) throw new Error("JWT token not found. Please log in.");
                if (isTokenExpired(token)) throw new Error("JWT token has expired.");
                const response = await axios.get(
                    `http://localhost:8080/api/v1/shops/getShopByUserId/${user.userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setId(response.data.result);

            } catch (error) {
                console.error("Error fetching shop ID:", error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);
    console.log("Shop id: ", id);
    ////////////////////////////////////////////////////////////////////////////////////////////



    // GET ALL ORDERS - PASSED
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) throw new Error("JWT token not found. Please log in.");
                if (isTokenExpired(token)) throw new Error("JWT token has expired.");
                const response = await axios.get("http://localhost:8080/api/v1/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const shopData = response.data;
                setOrders(shopData);

            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    console.log("Orders :", orders);
    ////////////////////////////////////////////////////////////////////////////////////////////


    // GET ALL PRODUCTS - PASSED
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) throw new Error("JWT token not found. Please log in.");
                if (isTokenExpired(token)) throw new Error("JWT token has expired.");
                const response = await axios.get("http://localhost:8080/api/v1/products", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const shopData = response.data;
                setProducts(shopData);

            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    console.log("Products :", products);
    ////////////////////////////////////////////////////////////////////////////////////////////

    // GET FULL SHOP INFORMATION BY SHOP ID
    // SHOP INFO CONTAIN ALL - CHOSE SHOP INFO FOR ALL
    const[shopInfo,setShopInfo] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) throw new Error("JWT token not found. Please log in.");
                if (isTokenExpired(token)) throw new Error("JWT token has expired.");
                const response = await axios.get(`http://localhost:8080/api/v1/shops/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const shopData = response.data.result;
                setShopInfo(shopData);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error.message);
            }
        };
        fetchData();
    }, [id]);
    console.log("Shop :", shopInfo);
    //////////////////////////////////////////////////////////////////////////////////////////////

    //GET ALL ORDER OF THIS SHOP
    const getCurrentShopOrders = (id, orders) => {
        // Filter orders and return the result
        return orders.filter(order => order.shop.shopId === id);
    };
    const currentShopOrders = getCurrentShopOrders(id,orders);

    //////////////////////////////////////////////////////////////////////////////////////////////

    //GET ALL PRODUCTS OF THIS SHOP
    const currentShopProducts = getCurrentShopOrders(id, products);

    //////////////////////////////////////////////////////////////////////////////////////////////

    //GET SHOPINFO
    const currentShopInfo = shopInfo;

    //////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="w-full h-full overflow-hidden m-0">
      {/* Left Sidebar */}
      <VendorNavbar className="w-[100vw] h-[10vh] px-5 z-50  lg:px-20 flex items-center"/>
      <div className='flex w-full h-[90vh] overflow-hidden'>
      <VendorLeftBar onSelect={setSelectedPage} />
      {/* Right Content Area */}
      <VendorRightBar selectedPage={selectedPage} orderList={currentShopOrders} productList={currentShopProducts} thisShopInfo={currentShopInfo}/>
      </div>
    </div>
  );
};

export default VendorDashboard;