import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VendorProductTable = ({ products }) => {

    const paidOnly = products.filter(a => a.isPaid);
    const groupedItems = paidOnly.reduce((acc, item) => {
        const existingProduct = acc.find(product => product.productName === item.productName);
        if (existingProduct) {
            existingProduct.finalPrice += item.finalPrice;
            existingProduct.productQuantity += item.productQuantity;
        } else {
            acc.push({...item});
        }
        return acc;
    }, []);
    const b = groupedItems.sort((a, b) => b.finalPrice - a.finalPrice);
    if (!products || products.length === 0) {
        return (
            <div>No data</div>
        )
    } else {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Total quantity</TableCell>
                            <TableCell>Total revenue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {b.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.productQuantity}</TableCell>
                                <TableCell>${product.finalPrice.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

};

export default VendorProductTable;
