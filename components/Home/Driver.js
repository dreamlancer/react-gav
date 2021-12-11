import Devider from "../UI/Divider";
import Heading from "../UI/Heading";
import StepHeading from "../Snippets/StepHeading";
import { Col, Row } from "react-bootstrap";

const Driver = () => {
  return (
    <div className="driver-area">
      <div className="text-center">
        <Heading title="Motorista" />
      </div>
      <StepHeading />
      <Row>
        <Col lg={4}>
          <div className="driver-img-container">
            <img className="w-100" src="/images/home/driver.png" />
          </div>
        </Col>
      </Row>
      <Devider />
    </div>
  );
};

export default Driver;
