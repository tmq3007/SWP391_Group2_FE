import React, {useEffect, useState} from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {Divider, IconButton, Typography} from "@mui/material";
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
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import {PieChart} from "@mui/icons-material";

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

const getShopOrderItemsData = async (id, jwt) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/orderItems/getAllByShopId/${id}`, {
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
const VendorRightBar = ({ selectedPage , ooo }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');
  const id = jwtDecode(token).userId;
  const [user, setUser] = useState(ooo);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [OrderCount, setOrderCount] = useState({a:0,b:0,c:0});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getShopOrderItemsData(user.shopId, token);
        setOrderItems(userData.result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchData();
  }, [id, token]);
  console.log(orderItems);
  //IMPORTANT PART
  if (loading) {
    return <div>No data</div>; // Show loading message until data is fetched
  }
  const paidOrder = (orderItems.length > 0) ? (orderItems.filter(a => a.isPaid).length) : 0;
  const unPaidOrder = (orderItems.length > 0) ? (orderItems.filter(a => !a.isPaid).length) : 0;
  const totalOrder = (orderItems.length > 0) ? orderItems.length : 0;

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const revenueToday = orderItems.filter(item => {
    if (item.isPaid && item.orderItemsPaymentDate) {
      const orderDate = new Date(item.orderItemsPaymentDate).toISOString().split('T')[0];
      return orderDate === today;
    }
    return false;
  }).reduce((sum, item) => sum + item.finalPrice, 0);
  console.log(`Total Revenue for Today: ${revenueToday}`);

  const today1 = new Date();
  const currentDay = today1.toISOString().split('T')[0];
  const currentMonth = today1.getMonth();
  const currentYear = today1.getFullYear();


  const revenueThisMonth = (orderItems.length > 0) ? orderItems.filter(item => {
    if (item.isPaid && item.orderItemsPaymentDate) {
      const orderDate = new Date(item.orderItemsPaymentDate);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;}
    return false;
  }).reduce((sum, item) => sum + item.finalPrice, 0) : [];
  console.log(`Total Revenue for This Month: ${revenueThisMonth}`);

  const total = orderItems.reduce((sum, item) => item.isPaid?  sum + item.finalPrice : sum, 0).toFixed(2);
  console.log(`Total Revenue for This Month: ${total}`);




  const handleTodayOrder = () => {
    const todayOrders = (orderItems.length > 0) ?  orderItems.filter(item => {
      if (item.orderItemsPaymentDate) {
        const orderDate = new Date(item.orderItemsPaymentDate).toISOString().split('T')[0];
        return orderDate === today;
      }
      return false;
    }) :[];
    setOrderCount({
      a: (todayOrders.length > 0) ? (todayOrders.filter(a => a.isPaid).length) : 0,
      b: (todayOrders.length > 0) ? (todayOrders.filter(a => !a.isPaid).length) : 0,
      c: (todayOrders.length > 0) ? todayOrders.length : 0
    })
  };

  const handleMonthOrder = () => {
    const monthOrders = (orderItems.length > 0) ?  orderItems.filter(item => {
      if (item.orderItemsPaymentDate) {
        const orderDate = new Date(item.orderItemsPaymentDate);
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
      }
      return false;
    }) :[];
    setOrderCount({
      a: (monthOrders.length > 0) ? (monthOrders.filter(a => a.isPaid).length) : 0,
      b: (monthOrders.length > 0) ? (monthOrders.filter(a => !a.isPaid).length) : 0,
      c: (monthOrders.length > 0) ? monthOrders.length : 0
    });
  };

  const handleYearOrder = () => {
    const yearOrders =  (orderItems.length > 0) ?  orderItems.filter(item => {
      if (item.orderItemsPaymentDate) {
        const orderDate = new Date(item.orderItemsPaymentDate);
        return orderDate.getFullYear() === currentYear;
      }
      return false;
    }) : [];
    setOrderCount({
      a: (yearOrders.length > 0) ? (yearOrders.filter(a => a.isPaid).length) : 0,
      b: (yearOrders.length > 0) ? (yearOrders.filter(a => !a.isPaid).length) : 0,
      c: (yearOrders.length > 0) ? yearOrders.length : 0
    });
  };

  const handleTotalOrder = () => {
    setOrderCount({
      a: (orderItems.length > 0) ? (orderItems.filter(a => a.isPaid).length) : 0,
      b: (orderItems.length > 0) ? (orderItems.filter(a => !a.isPaid).length) : 0,
      c: (orderItems.length > 0) ? orderItems.length : 0
    });
  }

  const monthlyRevenue = Array(12).fill(0); // Initialize array with 12 months
  if (orderItems.length > 0) {
    orderItems.forEach(order => {
      const orderDate = new Date(order.orderItemsDate);
      const month = orderDate.getMonth(); // Get month (0 = January, 11 = December)
      if (order.isPaid) {
        monthlyRevenue[month] += order.finalPrice;
      }
    });
  }
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [{label: "Revenue", data: monthlyRevenue}
    ],
  };

  const orderRevenue = Array(12).fill(0); // Initialize array with 12 months
  orderItems.forEach(order => {
    const orderDate = new Date(order.orderItemsDate);
    const month = orderDate.getMonth(); // Get month (0 = January, 11 = December)
    (order.isPaid) ? orderRevenue[month] += order.productQuantity : orderRevenue[month] += 0;
  });
  const data1 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [{label: "Total products sell", data: orderRevenue}
    ],
  };

  const paidOnly = (orderItems.length > 0) ?  orderItems.filter(a => a.isPaid) : [];
  const groupedItems = (paidOnly.length > 0) ?  paidOnly.reduce((acc, item) => {
    const existingProduct = acc.find(product => product.productName === item.productName);
    if (existingProduct) {
      existingProduct.finalPrice += item.finalPrice;
      existingProduct.productQuantity += item.productQuantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []) : [];

  const b = groupedItems;
  console.log(b);
  const highestValue = (b.length > 0) ?  b.reduce((max, order) =>
      order.finalPrice > max.finalPrice ? order : max
  ) :[];
  console.log(highestValue);
  const highestOrder = (b.length > 0) ? b.reduce((max, order) =>
      order.productQuantity > max.quantity ? order : max
  ) : [];
  console.log(highestOrder);
  return (
    <div className="h-[90vh] w-[81.7%]  p-4 overflow-x-hidden overflow-scroll mt-6">
      {selectedPage === 1 && (
        <div>
          <div className="w-full h-full  mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">

            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <div
                  className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <KeyboardDoubleArrowUpIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Today revenue
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {revenueToday} VND
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <PaymentRoundedIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Month revenue
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {revenueThisMonth}VND
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <AccountBalanceRoundedIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Total revenue
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {total}VND
                    </span>
                  </div>
                </div>
              </div>

              {/*<div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
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
              </div>*/}
            </div>
          </div>
          {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <div className="w-full h-full mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">
            <div className="mb-7 flex items-center justify-between">
              <span
                  className='font-semibold cursor-pointer hover:text-green-500 hover:border hover:border-solid hover:border-green-400 p-1 rounded-full'>Order status</span>
              <div className="mt-3.5 inline-flex rounded-full bg-gray-100/80 p-1.5 sm:mt-0">
                <button
                    onClick={handleTodayOrder}
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  Today
                </button>
                <button
                    onClick={handleMonthOrder}
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  Month
                </button>
                <button
                    onClick={handleYearOrder}
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  Year
                </button>
                <button
                    onClick={handleTotalOrder}
                    className="inline-flex items-center justify-center flex-shrink-0 outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 p-5 !focus:ring-0 relative z-10 !h-7 rounded-full !pk-2 text-sm font-medium text-accent border-[#31a965] border-2 ml-1 mr-1 text-[#31a965]">
                  All time
                </button>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <div
                  className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-green-500">
                <div className="mb-auto flex w-full items-center justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100">
                    <KeyboardDoubleArrowUpIcon className="h-8 w-8 text-green-500"/>
                  </div>
                  <div className="flex w-full flex-col text-end">
                    <span className="mb-1 text-base font-normal text-body">
                      Paid orders
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {OrderCount ? OrderCount.a : 0}
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
                      Unpaid orders
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {OrderCount ? OrderCount.b : 0}
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
                      All orders
                    </span>
                    <span className="mb-2 text-2xl font-semibold text-heading">
                      {OrderCount ? OrderCount.c : 0}
                    </span>
                  </div>
                </div>
              </div>

              {/*<div className="flex h-full w-full flex-col rounded-lg border border-b-4 border-border-200 bg-light p-5 md:p-6 border-b-red-500">
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
              </div>*/}
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
              <VendorDisplayNotification user={(user) ? user : {}}  orderItems={orderItems} />
          </div>
        </div>
      )}

      {selectedPage === 2 && (
        <div className="w-full h-full mb-8 rounded-lg bg-light p-5 md:p-8 border bg-white">
          <div className="h-full w-full overflow-hidden rounded-lg bg-gray-200 p-6 shadow-sm md:p-7">
            <div className="overflow-hidden rounded-lg bg-gray-200 hover:bg[#fff] cursor-pointer"  onClick={() => navigate("/shop-dashboard")}>
                <VendorShopDisplay shop={user} orderItems={orderItems}/>
            </div>
          </div>
        </div>
      )}

      {selectedPage === 4 && (
          <div className="w-full h-full mb-8 rounded-lg bg-light md:p-8 border bg-white">
            <div className="h-full w-full overflow-scroll rounded-lg bg-gray-200 shadow-sm md:p-6">
              <div className="overflow-hidden rounded-lg bg-gray-200 hover:bg[#fff] cursor-pointer">
                <div className="w-full h-full mb-8 rounded-lg bg-light border bg-white">
                  <div className={"flex gap-4"}>
                    <div className={"w-[50%] m-1"}><Bar
                        data={data}
                    ></Bar></div>
                    <div className={"w-[50%] m-1"}>
                      <Bar
                          data={data1}
                      ></Bar></div>
                  </div>
                </div>
                <div className="w-full h-full mb-8 rounded-lg bg-light md:p-8 border bg-white">
                  <div className={"flex gap-4"}>
                    <div className={"w-[50%] m-1 flex"}>
                      <img className={"rounded-full w-[200px] h-[200px]"}
                           src={`${highestValue ? highestValue.productImage : "None"}`}/>
                      <div className="ml-4 mt-5">
                        <p className="text-2xl font-semibold mb-2 text-green-500">Top revenue</p>
                        <Divider/>
                        <p className="text-2xl text-gray-500"><span
                            className="font-bold text-green-500">{highestValue ? highestValue.productName : "None"}</span></p>
                        <p className="text-lg text-gray-500">Bring: <span
                            className="font-bold text-green-500">{highestValue ? highestValue.finalPrice : "None"}VND</span></p>
                        <p className="text-lg text-gray-500">Sell unit: <span
                            className="font-bold text-green-500">{highestValue ? highestValue.productQuantity : "None"}</span></p>
                      </div>


                    </div>
                    <div className={"w-[50%] m-1 flex"}>
                      <img className={"rounded-full w-[200px] h-[200px]"}
                           src={highestOrder ? highestOrder.productImage : "None"}/>
                      <div className="ml-4 mt-5">
                        <p className="text-2xl font-semibold mb-2 text-green-500">Top seller</p>
                        <Divider/>
                        <p className="text-2xl text-gray-500"><span
                            className="font-bold text-green-500">{highestOrder ? highestOrder.productName : "None"}</span></p>
                        <p className="text-lg text-gray-500">Bring: <span
                            className="font-bold text-green-500">{highestOrder ? highestOrder.finalPrice : "None"}VND</span></p>
                        <p className="text-lg text-gray-500">Sell unit: <span
                            className="font-bold text-green-500">{highestOrder ? highestOrder.productQuantity : "None"}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}

      {selectedPage === 5 && (
          <div className="w-full h-full mb-8 rounded-lg bg-light md:p-2 border bg-white">
            <div className="h-full w-full overflow-hidden rounded-lg bg-gray-200  shadow-sm">
              <div className="overflow-scroll rounded-lg bg-gray-200 hover:bg-[#fff] cursor-pointer">
                <div className="grid gap-2 xl:grid-cols-12">
                  <div
                      className="h-[85vh] overflow-hidden rounded-lg bg-white md:p-7 xl:col-span-5 2xl:me-20 flex justify-center items-center">
                    <VendorProductDisplay products={orderItems ? orderItems : []}/>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white xl:col-span-7 2xl:ltr:-ml-20 2xl:rtl:-mr-20">
                    <VendorProductTable products={orderItems ? orderItems : []}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

      )}
    </div>
  );
};

export default VendorRightBar;
