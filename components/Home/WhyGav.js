import Heading from "../UI/Heading";
import Devider from "../UI/Divider";

const WhyGav = () => {
  return (
    <div className="whygav-area">
      <div className="text-center">
        <Heading title="Por quê a GAV?" />
      </div>
      <div className="gav-content d-flex flex-column justify-content-center align-items-center">
        <p className="gav-para text-center">
          Somos uma palataforma de aluguel que conecta motoristas de aplicativos
          e proprietários de veículos.
        </p>
        <div className="gav-img-container">
          <img className="w-100" src="/images/home/why-gav.png" />
        </div>
        <p className="gav-para-bottom text-center">
          pensadas para todos os envolvidos, nosso trabalho é conectar e gerenciar a
          intermediação através de tecnologia e atendimento humanizado
        </p>
      </div>
      <Devider />
    </div>
  );
};

export default WhyGav;
