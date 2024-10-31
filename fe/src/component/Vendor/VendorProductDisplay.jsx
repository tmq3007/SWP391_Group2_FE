import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

const VendorProductDisplay = ({ products}) => {
    const paidOnly = products.filter(a => a.isPaid);
    const groupedItems = paidOnly.reduce((acc, item) => {
        const existingProduct = acc.find(product => product.productName === item.productName);
        if (existingProduct) {
            existingProduct.finalPrice += item.finalPrice;
            existingProduct.productQuantity += item.productQuantity;
            existingProduct.itemTotalPrice += item.itemTotalPrice;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);
    const b = groupedItems.sort((a, b) => b.finalPrice - a.finalPrice);
    const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % b.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + b.length) % b.length);
  };

  return (
      <div className="flex flex-col items-center">
          <div className={"flex justify-start w-[100%] mb-1"}>
              <Typography><span className={"text-green-500 mr-2 text-2xl font-semibold"}>Top {currentIndex + 1}</span>{b[currentIndex].productName}</Typography>
          </div>

        <div className="overflow-hidden rounded-lg bg-gray-200">

          <img src={b[currentIndex].productImage} alt="Slider" className="object-cover w-[275px] h-[300px]"/>
        </div>
          <div className={"ml-2 block justify-start w-[100%] mb-1"}>
              <p>Price: {(b[currentIndex].itemTotalPrice / b[currentIndex].productQuantity).toFixed(2)}VND</p>
              <p>Discount: {(b[currentIndex].finalPrice / b[currentIndex].productQuantity).toFixed(2)}VND</p>
          </div>
          <Typography></Typography>
        <div className="flex mt-4 space-x-4">
          <button onClick={handlePrevious} className="w-[100px] bg-green-500 text-white p-2 rounded">Previous</button>
          <button onClick={handleNext} className=" w-[100px] bg-green-500 text-white p-2 rounded">Next</button>
        </div>
      </div>
  );
}


  export default VendorProductDisplay;
