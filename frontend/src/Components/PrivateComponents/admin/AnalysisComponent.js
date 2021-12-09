import { useSelector } from "react-redux";
import { GiDiamonds } from "react-icons/gi";
import FormRange from "react-bootstrap/esm/FormRange";
import { Card, CardBody } from "reactstrap";
import { Col, Row, Container } from "react-bootstrap";
export const AnalysisComponent = () => {
  const { requestUser } = useSelector((state) => state.adminDataStore);
  const { memberInfo } = useSelector((state) => state.memberProfileStore);
  const { profilePath } = memberInfo;
  console.log(memberInfo);
  const { review, response, comment } = requestUser;
  return (
    <>
      <div className="my-2 ms-3 px-2 discover-title">
        <GiDiamonds className="me-2 mb-1" />
        Review
      </div>
      <div className="mx-auto text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="discover-title">Rating</p>
          <p className="fs-2 ms-2 discover-title">
            {review[0].average_rating && review
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

          {Number(review[0].people_reviewed) !== 0 && review ? (
            <p>
              {review[0].contributed} of {review[0].people_reviewed} people find
              this user does contribution
            </p>
          ) : (
            <p>We don't have enough data for this user</p>
          )}
          <Container>
            <Row xs={3}>
              {review[0].review !== null
                ? review[0].review.map((item) => (
                    <Col>
                      <Card>
                        <img
                          src="https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg"
                          alt="profile pic"
                          className="profile mx-2"
                        />
                        <CardBody>
                          <div>
                            rating:{" "}
                            <span className="admin-rating">{item.rating}</span>
                          </div>
                          <div className="my-2 admin-content">
                            {item.comment ? item.comment : `no comment`}
                          </div>
                          <div className="text-muted my-3">
                            {item.comtributed ? (
                              <span className="admin-footnote">
                                Reviewer find user has contribution
                              </span>
                            ) : (
                              <span className="admin-footnote">
                                Reviewer find user has no contribution
                              </span>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))
                : null}
            </Row>
          </Container>
        </div>
      </div>
      <div>
        <div className="my-2 ms-3 px-2  discover-title">
          <GiDiamonds className="me-2 mb-1" />
          Response
          <div className="px-3">
            {response.length > 0 ? (
              <>
                <div className="analysis-title">
                  <div className="mx-5 my-2">
                    <GiDiamonds className=" mx -5 me-2 mb-1" />
                    This user got {response[0].matched} out of{" "}
                    {response[0].total_response} matched for the response
                  </div>
                  <div className="mx-5 my-2 ">
                    <GiDiamonds className=" mx -5 me-2 mb-1" />
                    Recent response
                  </div>

                  {response[0].response.map((item) => (
                    <Card className="request-message-card mx-auto my-3">
                      <CardBody className="pt-1">
                        {profilePath ? (
                          <img
                            src={profilePath}
                            alt="profile"
                            className="profile mx-2"
                          />
                        ) : (
                          <img
                            src="https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg"
                            alt="profile pic"
                            className="profile mx-2"
                          />
                        )}
                        <div className="position-relative d-flex align-items-start">
                          <div className="req-msg-card-propic"></div>
                          <div className="req-msg-body">
                            <div className="mt-2 py-2 admin-message">
                              {item.detail}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="analysis-title">
                <p className="ms-4 my-2">
                  This user haven't had any response before
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-2 ms-3 px-2  discover-title">
        <GiDiamonds className="me-2 mb-1" />
        Comment
        <div className="px-3">
          {comment && comment[0].response ? (
            <>
              <div className="analysis-title">
                <div className="mx-5 my-2">
                  <GiDiamonds className=" mx -5 me-2 mb-1" />
                  Recent Comment
                </div>
              </div>
              {comment[0].response.map((item) => (
                <Card className="request-message-card mx-auto my-3">
                  <CardBody className="pt-1">
                    {profilePath ? (
                      <img
                        src={profilePath}
                        alt="profile"
                        className="profile mx-2"
                      />
                    ) : (
                      <img
                        src="https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg"
                        alt="profile pic"
                        className="profile mx-2"
                      />
                    )}
                    <div className="position-relative d-flex align-items-start">
                      <div className="req-msg-card-propic"></div>
                      <div className="req-msg-body">
                        <div className=" mt-2 py-2 admin-message">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <div className="analysis-title">
              <p className="ms-4 my-2">
                This user haven't left any comment before
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
