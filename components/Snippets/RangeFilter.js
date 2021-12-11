import { Form, Tabs, Tab, Row, Col } from "react-bootstrap"
import Link from "next/link"
import { FiFilter } from "react-icons/fi"

import { UiButton } from "../UI/Button"

const RangeFilter = () => {
  return (
    <Row>
      <Col lg={12} className="range-filter">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab
            eventKey="home"
            className="px-3"
            title={
              <span className="range-filter__title">
                <img
                  className="mr-2 range-filter__driver-img"
                  src="/images/home/filter/driver.png"
                ></img>
                Escolha o seu veículo
              </span>
            }
          >
            <Form>
              <Row className="range-filter__section py-2">
                <Col lg={4} className="range-filter__section-location">
                  <p>
                    Informe sua localização
                    <img
                      className="mr-2 range-filter__driver-img"
                      src="/images/home/filter/loc.png"
                    ></img>
                  </p>
                </Col>
                <Col lg={4} className="range-filter__section-middle">
                  <p>Proximidade: 10KM</p>
                  <Form.Control type="range" />
                </Col>
                <Col
                  lg={4}
                  className="range-filter__section-right text-sm-center"
                >
                  <button className="mr-3 range-filter__section-right-button">
                    <span className="range-filter__section-right-button-text">
                      Filtros
                    </span>
                    <FiFilter className="range-filter__section-right-icon" />
                  </button>

                  <Link href='/pesquisar-veiculos-registrados'>
                    <UiButton title="Pesquisar" className="px-3" />
                  </Link>
                </Col>
              </Row>
            </Form>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  )
}

export default RangeFilter
