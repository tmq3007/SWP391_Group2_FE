import React, {useState} from 'react';
import {Box, Typography, List, ListItem, ListItemText, Divider, Button} from '@mui/material';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const VendorDisplayNotification = ({user, orderItems }) => {
    const cuser = user;
    const [orD, setOrD] = useState(orderItems);
    const setUnpaid = () => {
        console.log("Get unpaid");
        setOrD(orderItems.filter(a => !a.isPaid));
    }
    const setPaid = () => {
        console.log("Get paid");
        setOrD(orderItems.filter(a => a.isPaid));
    }
    const setAll = () => {
        console.log("Get all");
        setOrD(orderItems);
    }

    const descendingPrice = () => {
        console.log("Descending");
        const sortedItems = [...orderItems].sort((a, b) => a.finalPrice - b.finalPrice);
        setOrD(sortedItems);
    }

    const ascendingPrice = () => {
        console.log("Ascending");
        const sortedItems = [...orderItems].sort((a, b) => b.finalPrice - a.finalPrice);
        setOrD(sortedItems);
    }

  return (
    <Box
      sx={{
        padding: 3,
        textAlign: 'center',
        width: '100%',  // Ensures it takes the full width of the parent
        height: '100%', // Ensures it takes the full height of the parent
        boxSizing: 'border-box', // Ensures padding is included in the width/height
      }}>
        <div className={"flex justify-start gap-2"}>
            <div
                className={"w-[5vw] h-[4vh] border border-gray-400" +
                    " text-gray-500 cursor-pointer" +
                    " hover:bg-gray-500 " +
                    " hover:text-white items-center" +
                    " rounded-lg ease-in-out duration-500 "}
                onClick={setAll}>ALL
            </div>
            <div
                className={"w-[5vw] h-[4vh] border border-green-400" +
                    " text-green-500 cursor-pointer" +
                    " hover:bg-green-500 " +
                    " hover:text-white items-center" +
                    " rounded-lg ease-in-out duration-500 "}
                onClick={setPaid}>PAID
            </div>
            <div
                className={"w-[5vw] h-[4vh] border border-red-400" +
                    " text-red-500 cursor-pointer" +
                    " hover:bg-red-500 " +
                    " hover:text-white items-center" +
                    " rounded-lg ease-in-out duration-500 "}
                onClick={setUnpaid}>UNPAID
            </div>
            <div
                className={"w-[5vw] h-[4vh] border border-gray-400" +
                    " text-gray-500 cursor-pointer" +
                    " hover:bg-gray-500 " +
                    " hover:text-white items-center" +
                    " rounded-lg ease-in-out duration-500 "}
                onClick={ascendingPrice}>UP
            </div>
            <div
                className={"w-[5vw] h-[4vh] border border-gray-400" +
                    " text-gray-500 cursor-pointer" +
                    " hover:bg-gray-500 " +
                    " hover:text-white items-center" +
                    " rounded-lg ease-in-out duration-500 "}
                onClick={descendingPrice}>DOWN
            </div>
        </div>
        {orD && orD.length > 0 ? (
            <List>
                {orD.map((orderItem) => (
                    <div className={"mb-1"}>
                        <Accordion key={orderItem.id}>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon/>}
                                aria-controls="panel1-content">
                          <div className='lg:flex items-center justify-between w-[90%]'>
                              <div className='lg:flex justify-between lg:gap-5'>
                                  <div className={"flex items-center gap-2"}>

                                      {orderItem.isPaid ? <Typography className={"text-green-500"}>PAID</Typography>
                                      : <Typography className={"text-red-500"}>UNPAID</Typography>}
                                        <Typography>{orderItem && orderItem.orderItemsDate ? orderItem.orderItemsDate : "Not existed"}</Typography>
                                      <Typography>{` --- `}</Typography>
                                      <Typography>{orderItem && orderItem.orderItemsPaymentDate ? orderItem.orderItemsPaymentDate : "Waiting for payment!"}</Typography>
                                  </div>
                              </div>
                              <div className=' lg:space-y-5 lg:max-w-2xl flex'>
                                  {orderItem.isPaid ? <p className={"text-green-500"}>+ {orderItem.finalPrice}VND</p>
                                      : <p className={"text-gray-500"}>+ {orderItem.finalPrice}VND</p>}
                              </div>
                          </div>
                      </AccordionSummary>
                      <AccordionDetails>
                      <div className={"flex justify-between"}>
                          <div className={"flex items-center gap-2"}>
                              <img className='w-[4rem] h-[4rem] object-cover rounded-full'
                                   src={orderItem.productImage}
                                   alt='product image'/>
                              <p className='font-semibold text-xl'>{orderItem.productName} x {orderItem.productQuantity}</p>
                          </div>
                          <div className={"flex items-center gap-2 mr-20"}>
                              <p className={"text-gray-500 line-through"}>Total: {orderItem.itemTotalPrice}VND</p>
                              <p className={"text-green-500"}>Your discount: {orderItem.discount}</p>
                              <p className={"text-green-500"}>Final total: {orderItem.finalPrice}VND</p>
                          </div>
                      </div>
                      </AccordionDetails>
                  </Accordion>
              </div>
          ))}
        </List>
      ) : (
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '60vh',
              width: '100%',
              justifyContent: 'center'
          }}>
              <FolderOffIcon/>
              <Typography variant="h6" color="text.secondary">
                  Sorry, No order information found :(
              </Typography>
          </Box>
      )}
    </Box>
  );
};

export default VendorDisplayNotification;
