import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

const VendorProductDisplay = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % products.length);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? products.length - 1 : prevPage - 1
    );
  };

  // Swipe handlers using react-swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Allows mouse swipes as well
  });

  const product = products[currentPage]; // Get the product for the current page

  return (
    <div {...handlers} className='w-[90%] h-[90%] pb-8'>
      <Grid className=' justify-center items-center'>
        <Grid>
          <Card>
            <CardMedia
              component="img"
              height="140px"
              width="140px"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 2 }}>
        <Grid item>
          <Button variant="contained" onClick={handlePrevious}>
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorProductDisplay;
