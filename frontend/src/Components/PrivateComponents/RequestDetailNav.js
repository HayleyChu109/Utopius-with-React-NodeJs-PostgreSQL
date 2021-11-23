import { useState, useEffect } from "react";

const RequestDetailNav = ({
  userId,
  requestDetail,
  responseList,
  setDisplaySection,
}) => {
  const [statusColor, setStatusColor] = useState("");
  const [responserIdList, setResponserIdList] = useState([]);

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
      console.log("resIdList: ", resIdList);
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
                setDisplaySection("response");
              }}
            >
              RESPONSE
            </span>
          ) : requestDetail.status === "open" &&
            requestDetail.requesterId !== userId &&
            !responserIdList.includes(userId) ? (
            <span
              className="req-detail-nav-join"
              onClick={() => {
                setDisplaySection("join");
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
                setDisplaySection("joined");
              }}
            >
              COUNT ME IN !
            </span>
          ) : requestDetail.status === "matched" ||
            requestDetail.status === "completed" ? (
            <span
              className="req-detail-nav-matched"
              onClick={() => {
                setDisplaySection("meetup");
              }}
            >
              MEET UP
            </span>
          ) : requestDetail.status === "closed" ? (
            <span className="req-detail-nav-locked">LOCKED</span>
          ) : null}
        </div>
        <div className="req-detail-nav-comment col-4">
          <span
            onClick={() => {
              setDisplaySection("comment");
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
