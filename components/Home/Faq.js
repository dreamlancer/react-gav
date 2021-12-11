import { Col, Row } from "react-bootstrap"
import { UiAccordion } from "../UI/Accordion"
import Heading from "../UI/Heading"

const faqList = [
  {
    id: 1,
    title: 'É possível encerrar o contrato a qualquer momento?',
    body: 'Sim, assim que alguma das partes não forem cumpridas, basta ir nos meus contratos e encerrar!',
  },
  {
    id: 2,
    title: 'É possível encerrar o contrato a qualquer momento?',
    body: 'Sim, assim que alguma das partes não forem cumpridas, basta ir nos meus contratos e encerrar!',
  },
  {
    id: 3,
    title: 'É possível encerrar o contrato a qualquer momento?',
    body: 'Sim, assim que alguma das partes não forem cumpridas, basta ir nos meus contratos e encerrar!',
  },
  {
    id: 4,
    title: 'É possível encerrar o contrato a qualquer momento?',
    body: 'Sim, assim que alguma das partes não forem cumpridas, basta ir nos meus contratos e encerrar!',
  },
]

const Faq = () => {
  return (
    <div className="faq-area">
      <div className="text-center">
        <Heading title="FAQ" />
      </div>

      <h2 className="text-primary mb-5 faq-header-resp">Perguntas frequentes</h2>

      <Row className="justify-content-between">
        {
          faqList.length > 0 && faqList.map((item, index) =>
            <Col lg={5} key={index} className="mb-5">
              <UiAccordion title={item.title} body={item.body} index={index} />
            </Col>
          )
        }
      </Row>

    </div>
  )
}

export default Faq
