
import GradeBall from "../PublicComponents/GradeBall";

import { Card, CardBody, CardFooter } from "reactstrap";

const ResponseCard = ({ response }) => {
  return (
    <>
      <Card>
        <CardBody>
          <div>
            <img src="profilepic" alt="user-profile" />
          </div>
          <div>
            <GradeBall grade={}/>
            <span className="requester-username me-3">{}</span>
            <span className="requester-id">UID#{}</span>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default ResponseCard
