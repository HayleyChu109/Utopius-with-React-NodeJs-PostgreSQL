import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import RequestMessage from "./RequestMessage";

import { Button } from "reactstrap";
import { changeRequestStatusThunk } from "../../Redux/request/actions";
import ConfirmModal from "../../Components/PublicComponents/ConfirmModal";

const ResponseHost = ({
  requestId,
  handleMatch,
  matchList,
  errorMsg,
  status,
  confirmChange,
}) => {
  const { requestDetail, responseList, teamList } = useSelector(
    (state) => state.requestStore
  );
  // For changing request status
  const [confirmationBoolean, setConfirmationBoolean] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");

  const userId = jwt_decode(localStorage.getItem("token")).id;

  const dispatch = useDispatch();

  const handleStatusChange = (newStatus) => {
    console.log("UserId", userId);
    dispatch(
      changeRequestStatusThunk(
        requestId,
        newStatus,
        userId,
        requestDetail.reward * requestDetail.requiredPpl
      )
    );
  };

  // Trigger confirmation modal open
  const confirmChangeModal = (type) => {
    setConfirmationBoolean(true);
    setConfirmationType(type);
  };

  // Close modal
  const closeModal = () => {
    setConfirmationBoolean(false);
    setConfirmationType("");
  };

  return (
    <>
      <div className="response-matching-bg">
        {teamList && teamList.length > 0 ? (
          <div className="response-form response-matching-msg">
            <div className="response-heading pt-3 pb-1">MEET UP</div>
            <div>
              {errorMsg !== "" ? (
                <div
                  className="response-matching-helper pb-2"
                  style={{ color: "#fa7c92" }}
                >
                  {errorMsg}
                </div>
              ) : (
                <div className="response-matching-helper pb-2">
                  Matched response : {teamList.length}
                </div>
              )}
            </div>
            <div>
              <div className="response-matching-helper py-1 pe-2">
                Change request status to :
              </div>
              <div className="py-1">
                <Button
                  className="btn-white-orange-sm mb-2 border-0 bg-transparent p-0 me-4"
                  onClick={() => {
                    confirmChangeModal("completed");
                  }}
                >
                  Complete
                </Button>
                <Button
                  className="btn-white-orange-sm mb-2 border-0 bg-transparent p-0"
                  onClick={() => {
                    confirmChangeModal("cancelled");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="response-form response-matching-msg">
            <div className="response-heading pt-3 pb-1">RESPONSE</div>
            <div>
              {errorMsg !== "" ? (
                <>
                  <div
                    className="response-matching-helper pb-2"
                    style={{ color: "#fa7c92" }}
                  >
                    {errorMsg}
                  </div>
                  <div>
                    <div className="response-matching-helper py-1 pe-2">
                      Change request status to :
                    </div>
                    <div className="py-1">
                      <Button
                        className="btn-white-orange-sm mb-2 border-0 bg-transparent p-0"
                        onClick={() => {
                          confirmChangeModal("cancelled");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="response-matching-helper pb-2">
                    Matched response : {matchList.length} /{" "}
                    {requestDetail.requiredPpl}
                  </div>
                  <div>
                    <div className="response-matching-helper py-1 pe-2">
                      Change request status to :
                    </div>
                    <div className="py-1">
                      <Button
                        className="btn-white-orange-sm mb-2 border-0 bg-transparent p-0"
                        onClick={() => {
                          confirmChangeModal("cancelled");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {responseList && responseList.length > 0 ? (
        <RequestMessage
          matchList={matchList}
          handleMatch={handleMatch}
          status={status}
        />
      ) : (
        <div className="text-center my-4 no-res-no-cm">No response</div>
      )}
      <ConfirmModal
        isOpen={confirmationBoolean}
        type={confirmationType}
        close={closeModal}
        handleStatusChange={handleStatusChange}
      />
    </>
  );
};

export default ResponseHost;
