import { useDispatch, useSelector } from "react-redux";

import RequestMessage from "./RequestMessage";
// import RequestDetailComment from "./RequestDetailComment";

import { Button } from "reactstrap";
import { changeRequestStatusThunk } from "../../Redux/request/actions";

const ResponseHost = ({
  requestId,
  userId,
  handleMatch,
  matchList,
  errorMsg,
  status,
}) => {
  const { requestDetail, responseList, teamList } = useSelector(
    (state) => state.requestStore
  );

  const dispatch = useDispatch();

  const handleStatusChange = (newStatus) => {
    dispatch(changeRequestStatusThunk(requestId, newStatus));
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
              <div className="response-matching-helper pb-2">
                Change request status :
              </div>
              <Button
                className="btn-white-orange-sm mb-2 border-0 px-3 me-4"
                onClick={() => {
                  handleStatusChange("completed");
                }}
              >
                Completed
              </Button>
              <Button
                className="btn-white-orange-sm mb-2 border-0 px-3"
                onClick={() => {
                  handleStatusChange("cancelled");
                }}
              >
                Cancelled
              </Button>
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
                    <div className="response-matching-helper pb-2">
                      Change request status :
                    </div>
                    <Button
                      className="btn-white-orange-sm mb-2 border-0 px-3"
                      onClick={() => {
                        handleStatusChange("cancelled");
                      }}
                    >
                      Cancelled
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="response-matching-helper pb-2">
                    Matched response : {matchList.length} /{" "}
                    {requestDetail.requiredPpl}
                  </div>
                  <div>
                    <div className="response-matching-helper pb-2">
                      Change request status :
                    </div>
                    <Button
                      className="btn-white-orange-sm mb-2 border-0 px-3"
                      onClick={() => {
                        handleStatusChange("cancelled");
                      }}
                    >
                      Cancelled
                    </Button>
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
        <div>No response</div>
      )}
    </>
  );
};

export default ResponseHost;
