import React from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const PolicyPage = () => {
    const accordionStyle = {
        backgroundColor: '#F5F5F5',
        color: '#333',
    };

    return (
        <div>
            <Accordion style={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography variant="h8" style={{ fontWeight: "bold" }}>Terms of Service</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" paragraph>
                        <strong>1. Introduction</strong><br />
                        Welcome to Shopii. By using our online shopping services, you agree to comply with the following terms and conditions. Please read them carefully to understand your rights and obligations.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>2. Purchase Terms</strong><br />
                        Customers must provide accurate personal information during the purchasing process. We are not responsible for any issues arising from incorrect or incomplete information provided by the customer. Orders are only confirmed upon successful payment. We reserve the right to cancel or refuse any order if fraudulent or suspicious activity is detected.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>3. Payment</strong><br />
                        We accept various payment methods, including QR code. All transactions are securely processed to protect customer information. Prices and payment terms are subject to change without notice. However, any changes will not affect confirmed orders.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>4. Shipping and Delivery</strong><br />
                        We offer multiple shipping options based on the destination. Delivery times vary depending on location and the selected shipping method. Once the order is shipped, we provide tracking information. Any delays caused by the courier service are beyond our control.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>5. Warranty and Returns</strong><br />
                        Our products are covered by [mention any warranty terms, if applicable]. If a defect is found, please contact us within [specify timeframe] for assistance. Returns are accepted within [specify number of days, e.g., 14 or 30 days] of receipt for eligible products in their original condition. Return shipping costs are the responsibility of the customer unless the product is defective.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>6. Limitation of Liability</strong><br />
                        We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or services, to the fullest extent permitted by law.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>7. Changes to Terms</strong><br />
                        We reserve the right to modify these Terms of Service at any time. Changes will be posted on our website, and continued use of our services constitutes acceptance of any revised terms.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>8. Contact Us</strong><br />
                        For any questions or concerns about these Terms of Service, please contact us at [Your Contact Information].
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default PolicyPage;
