import { Col, Row } from "react-bootstrap"
import { useRouter } from 'next/router'
import SingleChoice from "../../components/ChoiceOfRecord/SingleChoice"
import PublicLayout from "../../layouts/Public"
import Heading from "../../components/UI/Heading"

const ChoiceRecord = () => {
  const router = useRouter()

  return (
    <PublicLayout>
      <div className="section-gap">
        <div className="text-center">
          <Heading title="Qual seu objetivo principal?" />
        </div>
        <Row className="justify-content-center">
          <Col lg={4} className="mb-lg-0 mb-5">
            <SingleChoice
              btnTitle="Sou um motorista"
              spanText="MOTORISTA"
              text="e quer alugar um veículo."
              imgUrl="/images/driver/driver.jpg"
              onClick={() => {
                router.push({
                  pathname: '/registrar',
                  query: { pessoa_cadastro_id: 3 },
                })}}
            />
          </Col>
          <Col lg={{ span: 4, offset: 1 }}>
            <SingleChoice
              btnTitle="Sou um fornecedor"
              spanText="PROPRIETÁRIO"
              text="de um veículo e quer fornecerpara alguém."
              imgUrl="/images/owner/owner.jpg"
              onClick={() => {
                router.push({
                  pathname: '/registrar',
                  query: { pessoa_cadastro_id: 2 },
                })}}
            />
          </Col>
        </Row>
      </div>
    </PublicLayout>
  );
};

export default ChoiceRecord;
