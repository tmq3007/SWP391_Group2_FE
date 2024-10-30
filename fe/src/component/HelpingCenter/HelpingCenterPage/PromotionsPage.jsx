import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

const PromotionsPage = () => {
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
                    <h4 style={{fontWeight:"bold"}}> Sale Event</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <p>Free Ship For All Order</p>
                </AccordionDetails>

            </Accordion>

        </div>

    );
}
export default PromotionsPage
