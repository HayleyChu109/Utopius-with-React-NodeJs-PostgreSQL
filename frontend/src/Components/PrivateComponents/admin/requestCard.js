import { Card,CardBody,CardFooter } from "react-bootstrap";
const RequestCard=({request,...props})=>{

    return(
        <div>
        <div className="col-md-6 col-sm-12 col-xs-12 p-4">
          <Card
            className="search-req-card"
           
          >
            <div className="row g-0">
              <div className="search-card-photo col-5">
                <img
                  src={help}
                  className="img-fluid rounded-start"
                  alt="request"
                />
              </div>
              <div className="search-card-main col-7">
                <CardBody>
                  <div className="username-id">
                    <span
                      className="dot text-center me-2"
                      style={{ backgroundColor: gradeColor }}
                    >
                      {request.grade}
                    </span>
                    {request.username} UID#{request.requesterId}
                  </div>
                  <div className="createdAt">{request.created_at}</div>
                  <div className="search-card-req-title">{request.title}</div>
                  <div className="search-card-req-detail">{request.detail}</div>
                  <div className="search-card-req-tag">
                    {request.tag.map((tagname) => (
                      <span
                        key={tagname}
                        className="mx-1 tagname"
                       
                        
                      >
                        #{tagname}
                      </span>
                    ))}
                  </div>
                </CardBody>
                <CardFooter className="search-card-footer">
                  <div className="search-card-footer-info">
                    <FaCoins className="mx-2 coin" />
                    <span className="coin me-2">{request.reward}</span>
                    <BsFillPersonPlusFill className="mx-2 person person-icon" />
                    <span className="person me-2">{request.requiredPpl}</span>
                    <HiLocationMarker className="mx-2 district district-icon" />
                    <span className="district">{request.district}</span>
                    <span className="bookmark">
                      {request.bookmark ? (
                        <>
                          <AiFillHeart
                            className="bookmark-icon-true"
                            onClick={() => {
                              handleBookmark(request.requestId);
                            }}
                          />
                        
                        </>
                      ) : (
                        <AiFillHeart
                          className="bookmark-icon-false"
                          onClick={() => {
                            handleBookmark(request.requestId);
                          }}
                        />
                      )}
                    </span>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
}

export default RequestCard