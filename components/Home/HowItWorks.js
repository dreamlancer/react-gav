import Devider from "../UI/Divider";
import Heading from "../UI/Heading";
import { Col, Row } from "react-bootstrap";

const HowItWorks = () => {
  return (
    <div className="howitworks-area">
      <div className="text-center">
        <Heading title="Como funciona?" />
      </div>

      <Row className="justify-content-center align-items-center">
        <Col lg={4}>
          <div className="howitworks-img-container">
            <img className="w-100" src="/images/home/how-it-works.png" />
          </div>
        </Col>
        <Col lg={{ span: 5, offset: 1 }}>
          <div className="howitworks-para">
            <p className="mb-0 text-sm-center text-lg-left mt-sm-4 mt-lg-0 ">
              Nós fazemos a conexão entre fornecedores de veículos e possíveis
              motoristas interessados em loca-los, você pode se cadastrar na
              plataforma como um motorista ou fornecedor.
            </p>
          </div>
        </Col>
      </Row>

      <Devider />
    </div>
  );
};

export default HowItWorks;
