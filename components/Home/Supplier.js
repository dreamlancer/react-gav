import Devider from "../UI/Divider";
import Heading from "../UI/Heading";
import StepHeading from "../Snippets/StepHeading";
import { Col, Row } from "react-bootstrap";
const Supplier = () => {
  return (
    <div className="supplier-area">
      <div className="text-center">
        <Heading title="Fornecedor" />
      </div>
      <Row className="justify-content-center">
        <Col lg={11}>
          <StepHeading />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 5, offset: 5 }}>
          <div className="supplier-img-container">
            <img className="w-100" src="/images/home/supplier.png" />
          </div>
        </Col>
      </Row>
      <Devider />
    </div>
  );
};

export default Supplier;
