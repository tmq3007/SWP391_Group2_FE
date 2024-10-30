import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get route parameters
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';

import {
    List,
    Divider,
    ListItemButton,
    Collapse
} from '@mui/material';
import "../../../../style/ShopDashboard.css";
import { ExpandLess, ExpandMore, LocationOn } from "@mui/icons-material";
import {getStatisticsShop} from "../../../State/Admin/Action";


export const DetailShopPage = () => {
    const { shopId } = useParams(); // Access shopId from route parameters
    const [shopData, setShopData] = useState(null);
    const [shopName, setShopName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [cover, setCover] = useState("");
    const [logo, setLogo] = useState("");
    const token = localStorage.getItem('jwt');
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    // Fetch shop data by shopId
    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const data = await getStatisticsShop(shopId);
                const result = data.result;
                setShopData(result);
                setShopName(result.shopName);
                setPhone(result.phone);
                setAddress(result.address);
                setDescription(result.description);
                setTotalProduct(result.totalProduct);
                setTotalOrder(result.totalOrder);
                setCover(result.cover);
                setLogo(result.logo);
            } catch (error) {
                console.error("Error fetching shop data:", error);
            }
        };

        if (shopId) {
            fetchShopData();
        }
    }, [shopId]);

    return (
        <div className="w-full h-screen overflow-y-auto">
            <div className="h-screen p-6">
                <div className="w-full h-full bg-cover bg-center"
                     style={{ backgroundImage: `url(${cover || 'default-cover-url'})` }}>
                </div>

                <div className='relative z-10 px-4 lg:px-6 xl:px-10'>
                    <div className='-mt-16 flex flex-wrap gap-6 lg:-mt-[6.0625rem] 2xl:flex-nowrap'>
                        <img src={logo || 'default-logo-url'} alt="Shop Logo"
                             className="rounded-full object-cover h-28 w-28 lg:h-[11.125rem] lg:w-[11.125rem]"/>
                    </div>
                    <div className='flex w-full flex-wrap justify-between self-end 2xl:flex-1'>
                        <div className='flex-auto pr-5 xl:flex-1'>
                            <h1 className='font-semibold leading-none text-muted-black text-3xl py-3'>{shopName}</h1>
                            <div className='flex flex-col space-y-3 divide-[#E7E7E7] leading-none xl:flex-row
                            xl:space-y-0 xl:space-x-5 xl:divide-x'>
                                <div>
                                    <PhoneIcon fontSize='small'/>
                                    <a href="">{phone}</a>
                                </div>
                                <Divider orientation="vertical" variant="middle" flexItem/>
                                <div>
                                    <LocationOn fontSize='small'/>
                                    <a href="">{address}</a>
                                </div>
                            </div>
                        </div>



                    </div>

                    <div className='my-10 flex flex-wrap items-stretch gap-4 lg:gap-4 xl:gap-10'>
                        <div className='relative w-full shrink-0 overflow-hidden
                        rounded-lg bg-white p-4 lg:w-[18rem] lg:p-6 xl:w-[22.375rem] xl:p-8'>

                            <div className='relative pt-5 xl:pt-7'>
                                <h2 className='mb-4 text-lg font-semibold text-muted-black xl:text-xl'>Bio</h2>
                                <div className='text-sm leading-[171.429%] text-[#666]'>
                                    {description}
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex-1 rounded-lg bg-white p-4 lg:p-6 xl:p-7 2xl:p-10'>
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl:gap-5
                            2xl:grid-cols-3 2xl:gap-7'>
                                <div
                                    className='flex items-center rounded-lg border border-[#E5E5E5] bg-white px-4 py-5 3xl:px-6 3xl:py-8'>
                                    <h2 className='mb-1.5 text-xl md:text-2xl font-medium text-muted-black'>
                                        {totalProduct}
                                    </h2>
                                    <p className='truncate text-sm text-base-dark'>
                                        Total Product
                                    </p>
                                </div>

                                <div
                                    className='flex items-center rounded-lg border border-[#E5E5E5] bg-white px-4 py-5 3xl:px-6 3xl:py-8'>
                                    <h2 className='mb-1.5 text-xl md:text-2xl font-medium text-muted-black'>
                                        {totalOrder}
                                    </h2>
                                    <p className='truncate text-sm text-base-dark'>
                                        Total Order
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
