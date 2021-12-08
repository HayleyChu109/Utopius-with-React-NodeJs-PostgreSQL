import { useSelector, useDispatch } from "react-redux";
import { GiDiamonds } from "react-icons/gi";
import FormRange from "react-bootstrap/esm/FormRange";
export const AnalysisComponent = () => {
  const { requestUser } = useSelector((state) => state.adminDataStore);
  console.log(requestUser);
  const { review, response, comment } = requestUser;
  return (
    <>
      <div className="my-5 mx-5 px-4 discover-title">
        <GiDiamonds className="me-2 mb-1" />
        Review
      </div>
      <div className="mx-auto text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="discover-title">Rating</p>
          <p className="fs-2 ms-2 discover-title">
            {review[0].average_rating
              ? Number(review[0].average_rating).toFixed(1)
              : `0`}
          </p>

          <div className="d-flex">
            <span className="mx-3">-5</span>
            {review[0].average_rating ? (
              <FormRange
                max={5}
                min={-5}
                value={Number(Number(review[0].average_rating).toFixed(1))}
                step={0.1}
                className="admin-slider"
              />
            ) : (
              <FormRange max={5} min={-5} value={0} className="admin-slider" />
            )}
            <span className="mx-3">5</span>
          </div>
          {isNaN(review[0].people_reviewed) ? (
            <p>
              {review[0].contributed} of {review[0].people_reviewed} people find
              this user does contribution
            </p>
          ) : (
            <p>We don't have enough data for this user</p>
          )}
        </div>
      </div>
      <div>
        <div className="my-5 mx-5 px-4 discover-title">
          <GiDiamonds className="me-2 mb-1" />
          Response
          {response.length > 0 ? (
            <div className="mx-5 admin-subtitle">
              <GiDiamonds className=" mx -5 me-2 mb-1" />
              This user got {response[0].matched} out of{" "}
              {response[0].total_response} matched for the response
            </div>
          ) : <p className="ms-4">This user haven't had any response before</p>}
        </div>
      </div>
      <div className="my-5 mx-5 px-4 discover-title">
        <GiDiamonds className="me-2 mb-1" />
        Comment
        {comment && comment.map((item) => item.response)[0] !== null ? (
          <p>This user has comment</p>
        ) : (
          <p className="ms-4">This user haven't left any comment before</p>
        )}
      </div>
    </>
  );
};
