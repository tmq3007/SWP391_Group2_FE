import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import VendorProductDisplay from "./VendorProductDisplay";
import VendorProductTable from "./VendorProductTable";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VendorShopDisplay from "./VendorShopDisplay";
import VendorDisplayNotification from "./VendorDisplayNotification";
import { useNavigate } from "react-router-dom";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AddIcon from '@mui/icons-material/Add';


/*
* get the data out
*
* data include
*
* order
*
* shop information
* */
const products = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'This is a great product',
    price: 29.99,
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'Another fantastic product',
    price: 19.99,
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'This is a great product',
    price: 29.99,
  },
  {
    id: 4,
    name: 'Product 4',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'Another fantastic product',
    price: 19.99,
  },
  {
    id: 5,
    name: 'Product 5',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'This is a great product',
    price: 29.99,
  },
  {
    id: 6,
    name: 'Product 6',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'Another fantastic product',
    price: 19.99,
  },
  {
    id: 7,
    name: 'Product 7',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'This is a great product',
    price: 29.99,
  },
  {
    id: 8,
    name: 'Product 8',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'Another fantastic product',
    price: 19.99,
  },
  {
    id: 9,
    name: 'Product 9',
    image: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'This is a great product',
    price: 29.99,
  },
  {
    id: 10,
    name: 'Product 10',
    image: 'https://th.bing.com/th/id/OIP.JDa_1X-NqdM1K-bZxp99DQHaEo?w=265&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'Another fantastic product',
    price: 19.99,
  },
  // Add more products...
];

const shopData = {
  name: 'Furniture Shop',
  address: '588 Finwood Road, East Dover, New Jersey',
  phone: '+213 42 12 12 21',
  avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
  commission: 10,
  sale: 1233,
  balance: 1233,
  withdraw: 0,
};

const notificationData = [
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
  { message: 'Your order has been shipped!', date: '2024-10-04' },
  { message: 'Your profile has been updated.', date: '2024-10-03' },
];


const VendorRightBar = ({ selectedPage }) => {
  const navigate = useNavigate();

  return (
    <div className="h-[90vh] w-[81.7%]  p-4 overflow-x-hidden overflow-scroll mt-6">
      {selectedPage === 1 && (
        <div>
          <div className="w-full h-full  mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">
            <div className="mb-7 flex items-center justify-between">
              <span
                  className='font-semibold cursor-pointer hover:text-green-500 hover:border hover:border-solid hover:border-green-400 p-1 rounded-full'>Summary</span>
              <button className={"bg-[#009f7f] inline-flex items-center justify-center flex-shrink-0 text-white" +
                  " font-semibold rounded outline-none transition duration-300 ease-in-out" +
                  " focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 bg-accent" +
                  " border border-transparent hover:bg-accent-hover px-5 py-0 h-12 text-sm md:text-base"}
              onClick={() => navigate("/rejected-shop-creation")}>
                <AddIcon/>Add Shop
              </button>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div
                  className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <KeyboardDoubleArrowUpIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Total revenue
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      ${0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-red-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <KeyboardDoubleArrowDownIcon className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Total refunds
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      ${0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <FormatListNumberedIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Total shop
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <MonetizationOnIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Today revenue
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      ${0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <div className="w-full h-full mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">
            <div className="mb-7 flex items-center justify-between">
              <span
                  className='font-semibold cursor-pointer hover:text-green-500 hover:border hover:border-solid hover:border-green-400 p-1 rounded-full'>Order status</span>
              <div className="mt-3.5 inline-flex rounded-full bg-gray-100/80 p-1.5 sm:mt-0">
                <button
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  Today
                </button>
                <button
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  Week
                </button>
                <button
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  Month
                </button>
                <button
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  Year
                </button>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div
                  className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <KeyboardDoubleArrowUpIcon className="h-8 w-8 text-green-500"/>
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Pending order
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <HourglassTopIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Processing order
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <FormatListNumberedIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Completed order
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-red-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <MoneyOffIcon className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Cancel order
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">
            Sale history
            <div className="mb-5 flex items-center justify-center">
              <Bar
                data={{
                  labels: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                  ],
                  datasets: [
                    {
                      label: "Revenue",
                      data: [2, 3, 4, 5, 6, 7, 8, 9, 9, 1, 2, 3],
                    },
                    {
                      label: "Refund",
                      data: [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                    },
                  ],
                }}
              ></Bar>
            </div>
          </div>
          
            
              <div className="grid gap-2 xl:grid-cols-12">
                <div className="overflow-hidden rounded-lg bg-white p-6 md:p-7 xl:col-span-5 2xl:me-20 flex justify-center items-center ">
                  <VendorProductDisplay products={products}/></div>

                <div className="overflow-hidden rounded-lg bg-white p-7 xl:col-span-7 2xl:ltr:-ml-20 2xl:rtl:-mr-20">
                  <VendorProductTable products={products}/>
                </div>
              </div>
                
                {/* <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                </table> */}
            
          </div>
      )}

      {selectedPage === 3 && (
        <div className="w-full h-fit mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">
          <div className="mb-5 items-center justify-between sm:flex md:mb-7">
              <VendorDisplayNotification data={notificationData}/>
          </div>
        </div>
      )}

      {selectedPage === 2 && (
        <div className="w-full h-full mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">
          <div className="h-full w-full overflow-hidden rounded-lg bg-gray-200 p-6 shadow-sm md:p-7">
            <div className="overflow-hidden rounded-lg bg-gray-200 hover:bg[#fff] cursor-pointer" onClick={() => navigate("/shop-dashboard")}>
                <VendorShopDisplay shop={shopData} />
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorRightBar;
