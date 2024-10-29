import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import * as React from "react";

export const ExplorePage = () => {
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
                    <h2 style={{fontWeight:"bold"}}> Pay By QR Code</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <p>You can scan QR code to pay for the order by click QR Code in payment method</p>
                </AccordionDetails>
                <AccordionDetails>
                    <p>Payment will disappear after 120s</p>
                </AccordionDetails>

            </Accordion>
            <Accordion style={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h2 style={{fontWeight: "bold"}}>Cash On Delivery</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <p>You can pay after receive orders by click COD in payment method</p>
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