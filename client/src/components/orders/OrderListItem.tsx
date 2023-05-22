import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Container,
} from "@mui/material";

import { useAppDispatch } from "redux/hooks";

import { useNavigate } from "react-router-dom";
import { OrderItemType, OrderProductType, OrderType } from "types/ordersTypes";

interface OrderItemProps {
    order: OrderType;
}

const OrderListItem: React.FC<OrderItemProps> = ({ order }) => {
    // use hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { items } = order;

    return (
        <div>Items page</div>
        // <Container maxWidth='xl'>
        //     <Grid container direction='row' spacing={4}>
        //         <Grid item xs={8}>
        //             <Grid item xs sx={{ marginBottom: "16px" }}>
        //                 <TableContainer component={Paper}>
        //                     <Table>
        //                         <TableHead>
        //                             <TableRow>
        //                                 <TableCell align='center'>
        //                                     Product Name
        //                                 </TableCell>
        //                                 <TableCell align='center'>
        //                                     Quantity
        //                                 </TableCell>
        //                                 <TableCell align='center'>
        //                                     {" "}
        //                                     Subrotal
        //                                 </TableCell>
        //                             </TableRow>
        //                         </TableHead>
        //                         <TableBody>
        //                             {items.map((item: OrderItemType) =>
        //                                 item.product.map(
        //                                     (product: OrderProductType) => (
        //                                         <TableRow key={product._id}>
        //                                             <TableCell
        //                                                 component='th'
        //                                                 scope='row'
        //                                             >
        //                                                 <Grid
        //                                                     container
        //                                                     sx={{
        //                                                         display: "flex",
        //                                                         alignItems:
        //                                                             "center",
        //                                                     }}
        //                                                 >
        //                                                     <Grid item xs={2}>
        //                                                         <img
        //                                                             src={
        //                                                                 product
        //                                                                     .images[0]
        //                                                             }
        //                                                             alt={
        //                                                                 product.name
        //                                                             }
        //                                                             style={{
        //                                                                 width: "100%",
        //                                                             }}
        //                                                         />
        //                                                     </Grid>
        //                                                     <Grid item xs={10}>
        //                                                         {product.name}
        //                                                     </Grid>
        //                                                 </Grid>
        //                                             </TableCell>
        //                                             <TableCell align='center'>
        //                                                 {item.quantity}
        //                                             </TableCell>

        //                                             {/* <TableCell align='center'>
        //                                                 {product.price}
        //                                             </TableCell> */}
        //                                         </TableRow>
        //                                     )
        //                                 )
        //                             )}
        //                         </TableBody>
        //                     </Table>
        //                 </TableContainer>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </Container>
    );
};

export default OrderListItem;

//TODO Clear cart after procced to checkout after checking if the user is logged in
