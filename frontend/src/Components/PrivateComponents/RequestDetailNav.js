import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RequestDetailNav = ({ userId, handleTab }) => {
  const { requestDetail, responseList } = useSelector(
    (state) => state.requestStore
  );
  const [statusColor, setStatusColor] = useState("");
  const [responserIdList, setResponserIdList] = useState([]);

  // Setting status tab color
  useEffect(() => {
    if (requestDetail.status === "open" || requestDetail.status === "matched") {
      setStatusColor("#fe7235");
    } else {
      setStatusColor("#aaaaaa");
    }
  }, [requestDetail.status]);

  useEffect(() => {
    if (responseList && responseList.length > 0) {
      let resIdList = responseList.map((res) => res.responserId);
      setResponserIdList(resIdList);
    }
  }, [responseList]);

  return (
    <>
      <div className="req-detail-nav row m-0 g-0 text-center p-3">
        <div className="col-4">
          {requestDetail.status === "open" &&
          requestDetail.requesterId === userId ? (
            <span
              className="req-detail-nav-res"
              onClick={() => {
                handleTab("response");
              }}
            >
              RESPONSE
            </span>
          ) : requestDetail.status === "open" &&
            requestDetail.requesterId !== userId &&
            responserIdList.indexOf(userId) === -1 ? (
            <span
              className="req-detail-nav-join"
              onClick={() => {
                handleTab("join");
              }}
            >
              COUNT ME IN !
            </span>
          ) : requestDetail.status === "open" &&
            requestDetail.requesterId !== userId &&
            responserIdList.includes(userId) ? (
            <span
              className="req-detail-nav-joined"
              onClick={() => {
                handleTab("joined");
              }}
            >
              COUNT ME IN !
            </span>
          ) : requestDetail.status === "matched" ||
            requestDetail.status === "completed" ? (
            <span
              className="req-detail-nav-matched"
              onClick={() => {
                handleTab("meetup");
              }}
            >
              MEET UP
            </span>
          ) : requestDetail.status === "cancelled" ? (
            <span className="req-detail-nav-locked">LOCKED</span>
          ) : null}
        </div>
        <div className="req-detail-nav-comment col-4">
          <span
            onClick={() => {
              handleTab("comment");
            }}
          >
            COMMENT
          </span>
        </div>
        <div className="req-detail-nav-statu col-4">
          <span style={{ color: statusColor }}>
            {requestDetail.status ? requestDetail.status.toUpperCase() : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default RequestDetailNav;
