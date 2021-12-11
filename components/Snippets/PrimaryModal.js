import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const PrimaryModal = ({ show, onClose, title, twoBtn, children, onclick, aprovar }) => {
  return (
    <Modal
      dialogClassName="my-modal"
      className="primary-modal"
      show={show}
      onHide={onClose}
    >
      <Modal.Body className="justify-content-center d-flex flex-column align-items-center">
        <FaTimes onClick={onClose} className="primary-modal__cross" />
        {children ? (
          children
        ) : (
          <div className="d-flex flex-column align-items-center justify-centent-center">
            <p className="primary-modal__title">{title}</p>
            {twoBtn ? (
              <div className="mb-5 ">
                <button className="primary-modal__excluciveBtn">
                  <p onClick={onclick}>{aprovar ? 'Aprovar' : 'Excluir'}</p>
                </button>
                <button className="primary-modal__btn">
                  <p>Cancelar</p>
                </button>
              </div>
            ) : (
              <button className="primary-modal__btn">
                <p>login</p>
              </button>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PrimaryModal;
