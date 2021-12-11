const StepHeading = () => {
  return (
    <div className="step-heading d-flex justify-content-between">
      <div className="single-step-heading">
        <div className="heading-number-content d-flex justify-content-center align-items-center">
          <div className="heading-number">1</div>
        </div>
        <h3 className="heading-number-name text-center">Cadastro</h3>
      </div>

      <div className="single-step-heading">
        <div className="heading-number-content d-flex justify-content-center align-items-center">
          <div className="heading-number">2</div>
        </div>
        <h3 className="heading-number-name text-center">Anunciar veículo</h3>
      </div>
      <div className="single-step-heading">
        <div className="heading-number-content d-flex justify-content-center align-items-center">
          <div className="heading-number">3</div>
        </div>
        <h3 className="heading-number-name text-center">Aguardar solicitação</h3>
      </div>
      <div className="single-step-heading">
        <div className="heading-number-content d-flex justify-content-center align-items-center">
          <div className="heading-number">4</div>
        </div>
        <h3 className="heading-number-name text-center">Alugar e fazer grana</h3>
      </div>
    </div>
  );
};

export default StepHeading;
