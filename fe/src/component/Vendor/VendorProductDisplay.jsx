import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

const ITEMS_PER_PAGE = 1; // Number of products per page

const VendorProductDisplay = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Handlers to move between pages
  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) =>
        prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
  };

  // Swipe handlers using react-swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Allows mouse swipes
  });

  // Calculate the products to display on the current page
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
      <div {...handlers} className="w-[90%] h-[90%] pb-8">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {currentProducts.map((product, index) => (
              <Grid item key={index}>
                <Card>
                  <CardMedia
                      component="img"
                      style={{ width: '400px', height: '300px', objectFit: 'cover' }}
                      image={product.pictureUrl}
                      alt={product.productName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {product.unitSellPrice + "$"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          ))}
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
