import { useState, useEffect } from "react";

const RequestDetailNav = ({ userId, requestDetail, setDisplaySection }) => {
  const [statusColor, setStatusColor] = useState("");
  // const [joinColor, setJoinColor] = useState("");

  useEffect(() => {
    if (requestDetail.status === "Open" || requestDetail.status === "Matched") {
      setStatusColor("#fe7235");
    } else {
      setStatusColor("#aaaaaa");
    }
  }, [requestDetail.status]);

  return (
    <>
      <div className="req-detail-nav row m-0 g-0 text-center p-3">
        <div className="col-4">
          {requestDetail.requesterId === userId ? (
            <span
              className="req-detail-nav-res"
              onClick={() => {
                setDisplaySection("response");
              }}
            >
              RESPONSE
            </span>
          ) : (
            <span
              className="req-detail-nav-join"
              onClick={() => {
                setDisplaySection("join");
              }}
            >
              COUNT ME IN !
            </span>
          )}
        </div>
        <div className="req-detail-nav-comment col-4">
          <span
            onClick={() => {
              setDisplaySection("publicComment");
            }}
          >
            COMMENT
          </span>
        </div>
        <div className="req-detail-nav-statu col-4">
          <span
            style={{ color: statusColor }}
          >
            {requestDetail.status ? requestDetail.status.toUpperCase() : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default RequestDetailNav;
