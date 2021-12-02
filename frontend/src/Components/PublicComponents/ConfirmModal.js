import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const ConfirmModal = ({ isOpen, type, close, handleStatusChange }) => {
  return (
    <div>
      <Modal isOpen={isOpen} contentClassName="custom-modal-style">
        <ModalBody>
          <div className="success-msg py-5 text-center">
            {type === "cancelled" ? (
              <span>Confirm cancel this request ?</span>
            ) : type === "completed" ? (
              <span>Confirm complete this request ?</span>
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <div className="mx-auto">
            {type === "cancelled" ? (
              <div>
                <Button
                  className="btn-white-lightorange-sm me-3"
                  onClick={() => {
                    handleStatusChange("cancelled");
                  }}
                >
                  Yes
                </Button>
                <Button className="btn-white-lightorange-sm" onClick={close}>
                  No
                </Button>
              </div>
            ) : type === "completed" ? (
              <div>
                <Button
                  className="btn-white-lightorange-sm me-3"
                  onClick={() => {
                    handleStatusChange("completed");
                  }}
                >
                  Yes
                </Button>
                <Button className="btn-white-lightorange-sm" onClick={close}>
                  No
                </Button>
              </div>
            ) : null}
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
