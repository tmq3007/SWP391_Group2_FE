import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CategoryMenu = () => {
    const [expanded, setExpanded] = React.useState(false); // Track expanded state

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false); // Update expanded state
    };

    return (
        <div>
            <Accordion
                expanded={expanded === 'panel1'} // Check if panel1 is expanded
                onChange={handleChange('panel1')}
                style={{
                    marginBottom: '0px',
                    backgroundColor: '#F3F4F6',
                    boxShadow: 'none',
                }}
                disableGutters
            >
                <AccordionSummary
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderBottom: 'none',
                        textAlign: 'center', // Center text
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span style={{ color: expanded === 'panel1' ? '#019376' : 'black', fontWeight: 'bold' }}>
                        Category 1
                    </span>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: '#FFFFFF' }}>
                    Category Details 1
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                style={{
                    marginBottom: '0px',
                    backgroundColor: '#F3F4F6',
                    boxShadow: 'none',
                }}
                disableGutters
            >
                <AccordionSummary
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderBottom: 'none',
                        textAlign: 'center', // Center text
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <span style={{ color: expanded === 'panel2' ? '#019376' : 'black', fontWeight: 'bold' }}>
                        Category 2
                    </span>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: '#FFFFFF' }}>
                    Category Details 2
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
                style={{
                    marginBottom: '0px',
                    backgroundColor: '#F3F4F6',
                    boxShadow: 'none',
                }}
                disableGutters
            >
                <AccordionSummary
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderBottom: 'none',
                        textAlign: 'center', // Center text
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <span style={{ color: expanded === 'panel3' ? '#019376' : 'black', fontWeight: 'bold' }}>
                        Category 3
                    </span>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: '#FFFFFF' }}>
                    Category Details 3
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CategoryMenu;
