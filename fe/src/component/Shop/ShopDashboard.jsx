import React from 'react';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import { ShopDashboardSidebar } from './ShopDashboardSidebar';


import {
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemButton,
    Collapse
} from '@mui/material';
import "../../style/ShopDashboard.css";
import {ExpandLess, ExpandMore, LocationOn, StarBorder} from "@mui/icons-material";
import {NavbarShop} from "../Navbar/NavbarShop";

export const ShopDashboard = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (


        <section className="main flex h-screen overflow-hidden">
            <NavbarShop/>
            {/* Sidebar */}
            <ShopDashboardSidebar />

            {/* Main Content */}
            <div className="w-4/5 bg-white h-full overflow-y-auto">
                <div className="h-full p-6">
                    <div className="w-full h-full bg-cover bg-center"
                         style={{backgroundImage: `url('https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F883%2FUntitled-6.jpg&w=1920&q=75')`}}>
                    </div>

                    <div className='relative z-10 px-4 lg:px-6 xl:px-10'>
                        <div className='-mt-16 flex flex-wrap gap-6 lg:-mt-[6.0625rem] 2xl:flex-nowrap'>
                            <img src="https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F882%2FFurniture.png&w=1920&q=75" alt=""
                                 className="rounded-full object-cover h-28 w-28 lg:h-[11.125rem] lg:w-[11.125rem]"/>
                        </div>
                        <div className='flex w-full flex-wrap justify-between self-end 2xl:flex-1'>
                            <div className='flex-auto pr-5 xl:flex-1'>
                                <h1 className='font-semibold leading-none text-muted-black text-3xl py-3'>Furniture
                                    Shop</h1>
                                <div className='flex flex-col space-y-3 divide-[#E7E7E7] leading-none xl:flex-row
                                xl:space-y-0 xl:space-x-5 xl:divide-x'>
                                    <div>
                                        <AlternateEmailIcon fontSize='small'/>
                                        <a href="">store_owner@gmail.com</a>
                                    </div>
                                    <Divider orientation="vertical" variant="middle" flexItem/>
                                    <div>
                                        <LocationOn fontSize='small'/>
                                        <a href="">588 Finwood Road, East Dover, New Jersey, 08753, USA</a>
                                    </div>
                                    <Divider orientation="vertical" variant="middle" flexItem/>
                                    <div>
                                        <PhoneIcon fontSize='small'/>
                                        <a href="">+213 42 12 12 21</a>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <a href=""
                                   className='inline-flex items-center justify-center w-28 h-10 rounded-lg
                                    bg-[#019376] text-xs font-medium text-white hover:bg-green-600'>
                                    <EditIcon fontSize='small'/>
                                    Edit Shop
                                </a>
                            </div>

                        </div>

                        <div className='my-10 flex flex-wrap items-stretch gap-4 lg:gap-4 xl:gap-10'>
                            <div className='relative w-full shrink-0 overflow-hidden
                            rounded-lg bg-white p-4 lg:w-[18rem] lg:p-6 xl:w-[22.375rem] xl:p-8'>
                                <h4 className="mb-1 text-sm font-normal text-[#666]" data-label-id="0">Registered
                                    Since</h4>
                                <p className='text-muted-black'>October 3 2024</p>

                                <div className='relative mt-5 pt-5 xl:pt-7'>
                                    <h2 className='mb-4 text-lg font-semibold text-muted-black xl:text-xl'>Bio</h2>
                                    <div className='text-sm leading-[171.429%] text-[#666]'>
                                        The furniture shop is the best shop around the city. This is being run under the store owner and our aim is to provide quality product and hassle free customer service.
                                    </div>

                                </div>
                            </div>
                            <div className='w-full flex-1 rounded-lg bg-white p-4 lg:p-6 xl:p-7 2xl:p-10'>
                                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl:gap-5
                                2xl:grid-cols-3 2xl:gap-7'>
                                    <div
                                        className='flex items-center rounded-lg border border-[#E5E5E5] bg-white px-4 py-5 3xl:px-6 3xl:py-8'>
                                        <h2 className='mb-1.5 text-xl md:text-2xl font-medium text-muted-black'>
                                            55
                                        </h2>
                                        <p className='truncate text-sm text-base-dark'>
                                            Total Product
                                        </p>
                                    </div>

                                    <div
                                        className='flex items-center rounded-lg border border-[#E5E5E5] bg-white px-4 py-5 3xl:px-6 3xl:py-8'>
                                        <h2 className='mb-1.5 text-xl md:text-2xl font-medium text-muted-black'>
                                            2
                                        </h2>
                                        <p className='truncate text-sm text-base-dark'>
                                            Total Order
                                        </p>
                                    </div>

                                    <div
                                        className='flex items-center rounded-lg border border-[#E5E5E5] bg-white px-4 py-5 3xl:px-6 3xl:py-8'>
                                        <h2 className='mb-1.5 text-xl md:text-2xl font-medium text-muted-black'>
                                            0%
                                        </h2>
                                        <p className='truncate text-sm text-base-dark'>
                                            Admin Commission Rate
                                        </p>
                                    </div>

                                    <div
                                        className='flex items-center rounded-lg border border-[#E5E5E5] bg-white px-4 py-5 3xl:px-6 3xl:py-8'>
                                        <p className='truncate text-sm text-base-dark'>
                                            Gross Sales
                                        </p>
                                    </div>

                                    <div
                                        className='flex items-center rounded-lg border border-[#E5E5E5] bg-white px-4 py-5 3xl:px-6 3xl:py-8'>
                                        <p className='truncate text-sm text-base-dark'>
                                            Current Balance
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};