 import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
export const NewUserPage = () => {
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
                   <h4 style={{fontWeight:"bold"}}> How To Search Product On Shopii</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <p>Step 1: On the Shopee application, select Search bar > enter related keywords > Search</p>
                    <p>Step 2: On the Search Results page, you can choose to sort/filter the displayed search results according to quick criteria</p>
                </AccordionDetails>
            </Accordion>
            <Accordion style={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <h4 style={{fontWeight: "bold"}}> Product Favourite Feature On Shopii</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <p>The Like Products feature on Shopii is a very useful feature for you when you need to save/mark your favorite products into a separate list to monitor price status, inventory... and consider purchasing. shopping in the near future</p>
                    <p>You can choose to Like a product by tapping the icon on the product's Product Card</p>
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