import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VendorProductTable = ({ products }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Id</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product,index) => (
            <TableRow key={product.productId}>
              <TableCell>
                {index + 1}
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.unitSellPrice + "$"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VendorProductTable;
