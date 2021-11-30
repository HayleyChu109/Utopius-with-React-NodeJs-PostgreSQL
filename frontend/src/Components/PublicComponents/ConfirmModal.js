import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const ConfirmModal = ({ isOpen, type, close, handleStatusChange }) => {
  return (
    <div>
      <Modal isOpen={isOpen} contentClassName="custom-modal-style">
        <ModalBody>
          <div className="mt-3 mx-3 response-heading fw-700">
            <span className="fs-4 me-1">HEADING</span>
          </div>
          <div className="success-msg py-5 text-center">
            {type === "cancelled"
              ? "Confirm cancel this request ?"
              : type === "completed"
              ? "Confirm complete this request ?"
              : null}
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <div className="mx-auto">
            {type === "cancelled" ? (
              <div>
                <Button
                  className="btn-white-orange-sm"
                  onClick={() => {
                    handleStatusChange("cancelled");
                  }}
                >
                  Yes
                </Button>
                <Button className="btn-white-orange-sm" onClick={close}>
                  No
                </Button>
              </div>
            ) : type === "completed" ? (
              <div>
                <Button
                  className="btn-white-orange-sm"
                  onClick={() => {
                    handleStatusChange("completed");
                  }}
                >
                  Yes
                </Button>
                <Button className="btn-white-orange-sm" onClick={close}>
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
