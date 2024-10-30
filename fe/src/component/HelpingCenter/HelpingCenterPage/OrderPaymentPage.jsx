import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import * as React from "react";

export const OrderPaymentPage = () => {
    const accordionStyle = {
        backgroundColor: '#F5F5F5',
        color: '#333', // Darker color for contrast with light background
    };
    return (
        <div >
            <Accordion style={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h4 style={{fontWeight:"bold"}}> How to delete/remove products from the Shopping Cart?</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <p>In your Shopping Cart > select Delete Icon for the products you want to delete from the Shopping Cart.</p>
                 </AccordionDetails>

            </Accordion>
            <Accordion style={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4 style={{fontWeight: "bold"}}> Reduce the number of products to 0</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <p>You can use this method when you want to manually remove each product from the Shopping Cart
                        In your Shopping Cart, adjust the product quantity to 0</p>
                </AccordionDetails>
            </Accordion>
            {/*<Accordion style={accordionStyle}>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon />}*/}
            {/*        aria-controls="panel3-content"*/}
            {/*        id="panel3-header"*/}
            {/*    >*/}
            {/*        Accordion Actions*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse*/}
            {/*        malesuada lacus ex, sit amet blandit leo lobortis eget.*/}
            {/*    </AccordionDetails>*/}
            {/*    <AccordionActions>*/}
            {/*        <Button>Cancel</Button>*/}
            {/*        <Button>Agree</Button>*/}
            {/*    </AccordionActions>*/}
            {/*</Accordion>*/}
        </div>
    );
}