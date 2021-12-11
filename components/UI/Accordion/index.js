import PropTypes from 'prop-types'
import { Accordion, Button } from "react-bootstrap"
import { FiPlus } from 'react-icons/fi'
export const UiAccordion = ({ title, body, index }) => {
    return (
        <Accordion defaultActiveKey="0" className="accordion-area">
            <Accordion.Toggle as={Button} variant="link" eventKey={`'${index}'`}>
                <div className="d-flex align-items-center">
                    <FiPlus className="accordion-icon" size="70" color="#0057f9" /> <span className="ml-4 accordion-title">{title}</span>
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`'${index}'`}>
                <div className="accordion-body">
                    {body}
                </div>
            </Accordion.Collapse>
        </Accordion>
    )
}

UiAccordion.propTypes = {
    title: PropTypes.any,
    body: PropTypes.any,
}