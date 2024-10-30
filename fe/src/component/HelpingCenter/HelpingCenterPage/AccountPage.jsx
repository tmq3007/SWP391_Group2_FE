import React from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

const AccountPage = () => {
    const accordionStyle = {
        backgroundColor: '#F5F5F5',
        color: '#333', // Darker color for contrast with light background
    };

    return (
        <div>

            <Accordion style={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="account-security-content"
                    id="account-security-header"
                >
                    <h4 style={{ fontWeight: "bold" }}>Account Security</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <p>
                        Ensuring the security of your account is important to us. Here are some guidelines to help protect your account:
                    </p>
                    <ul>
                        <li>
                            <strong>Use a Strong Password:</strong> Choose a unique password that combines uppercase and lowercase letters, numbers, and symbols. Avoid using easily guessable information.
                        </li>

                        <li>
                            <strong>Beware of Phishing:</strong> Be cautious of unsolicited emails or messages asking for your account information. Always verify the source before providing any details.
                        </li>
                        <li>
                            <strong>Update Your Password To Your Mail When change password:</strong> Send new password to your mail
                        </li>
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AccountPage;
