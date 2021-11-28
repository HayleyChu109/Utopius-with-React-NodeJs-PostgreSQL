import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "../../Pages/SCSS/loginPage.scss";

const FailureModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.isOpen} contentClassName="custom-modal-style">
        <ModalBody>
          <div className="success-msg py-5 text-center">{props.message}</div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <div className="mx-auto">
            <Button className="btn-white" onClick={props.close}>
              OK
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FailureModal;
