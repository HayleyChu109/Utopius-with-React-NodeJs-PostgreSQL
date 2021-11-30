import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const SuccessModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.isOpen} contentClassName="custom-modal-style">
        <ModalBody>
          <div className="mt-3 mx-3 response-heading fw-700">
            <span className="fs-4 me-1">&#x1F389;</span>HURRAY !
          </div>
          <div className="success-msg py-5 text-center">{props.message}</div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <div className="mx-auto">
            <Button className="btn-white-orange-sm" onClick={props.close}>
              OK &#x1F44C
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SuccessModal;
