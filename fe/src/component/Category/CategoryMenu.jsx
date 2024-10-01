import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../style/CategoryMenu.css'; // Import file CSS

const CategoryMenu = () => {
    const [expanded, setExpanded] = React.useState(false); // Track expanded state

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false); // Update expanded state
    };

    return (
        <div>
            <Accordion elevation={0}
                       expanded={expanded === 'panel1'} // Check if panel1 is expanded
                       onChange={handleChange('panel1')}
                       className="accordion" // Sử dụng class từ file CSS
            >
                <AccordionSummary
                    className="accordion-summary" // Sử dụng class từ file CSS
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className={`accordion-summary ${expanded === 'panel1' ? 'expanded' : ''}`}>
                        Category 1
                    </span>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    Category Details 1
                </AccordionDetails>
            </Accordion>

            <Accordion elevation={0}
                       expanded={expanded === 'panel2'}
                       onChange={handleChange('panel2')}
                       className="accordion"
            >
                <AccordionSummary
                    className="accordion-summary"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <span className={`accordion-summary ${expanded === 'panel2' ? 'expanded' : ''}`}>
                        Category 2
                    </span>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    Category Details 2
                </AccordionDetails>
            </Accordion>

            <Accordion elevation={0}
                       expanded={expanded === 'panel3'}
                       onChange={handleChange('panel3')}
                       className="accordion"
            >
                <AccordionSummary
                    className="accordion-summary"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <span className={`accordion-summary ${expanded === 'panel3' ? 'expanded' : ''}`}>
                        Category 3
                    </span>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    Category Details 3
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CategoryMenu;
