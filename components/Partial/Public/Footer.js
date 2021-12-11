import { Container, Col, Row } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineTwitter } from "react-icons/ai";

const PublicFooter = () => {
  return (
    <div className="public-footer py-3">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col sm="4" className="public-footer__left">
            <p className="public-footer__title">XD</p>
            <p className="public-footer__tag">
              © 2021 GAV - Todos os direitos reservados.
            </p>
          </Col>
          <Col sm="2" className="public-footer__middle">
            <p>Sobre</p>
            <p>Contato</p>
            <p>Termo de Uso</p>
          </Col>
          <Col sm="2">
            <div className="public-footer__social">
              <FaFacebookF className="public-footer__social-icon" />
              <p>Facebook</p>
            </div>
            <div className="public-footer__social">
              <FiInstagram className="public-footer__social-icon" />
              <p>Instagram</p>
            </div>
            <div className="public-footer__social">
              <AiOutlineTwitter className="public-footer__social-icon mr-sm-2" />
              <p>Twitter</p>
            </div>
          </Col>
          <Col
            lg="4"
            className="public-footer__right mt-sm-4 mt-lg-0  offset-sm-2 offset-lg-0"
          >
            <div>
              <p>Subscribe to our newsletter</p>
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              ></input>
            </div>
            <button>
              <span>ok</span>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PublicFooter;
