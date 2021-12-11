import { Col, Row } from "react-bootstrap";
import AvailableVehicles from "../Snippets/AvailableVehicles";
import RangeFilter from "../Snippets/RangeFilter";
import Devider from "../UI/Divider";
import Heading from "../UI/Heading";

const vehicles = [
  { id: 1, carName: "SUV", imgUrl: "/images/home/vehicles/sub.png" },
  { id: 2, carName: "Sedan", imgUrl: "/images/home/vehicles/sedan.png" },
  { id: 3, carName: "Hatch", imgUrl: "/images/home/vehicles/hatch.png" },
  {
    id: 4,
    carName: "Utilitário",
    imgUrl: "/images/home/vehicles/utilitário.png",
  },
];

const Banner = () => {
  return (
    <div className="banner-area section-gap-bottom">
      {/* <Row className="">
        <Col lg="8">
          <RangeFilter />
        </Col>
      </Row> */}
      <Row className="justify-content-center my-5">
        <Col lg="6">
          <h4 className="text-center">
            Anuncie e alugue um veículo para pessoas próximas você.
          </h4>
          <h3 className="text-md-right font-weight-bold mb-0 text-sm-center ">
            Tudo isso em um único lugar
          </h3>
        </Col>
      </Row>

      <div className="text-center">
        <Heading title="Veículos Disponíveis" />
      </div>
      <Row>
        {vehicles.length > 0 &&
          vehicles.map((vehicle, index) => (
            <Col lg={3} sm={6} key={index}>
              <AvailableVehicles
               
                imgUrl={vehicle.imgUrl}
                carName={vehicle.carName}
              />
            </Col>
          ))}
      </Row>
      <Devider />
    </div>
  );
};

export default Banner;
