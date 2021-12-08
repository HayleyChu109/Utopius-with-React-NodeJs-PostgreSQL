import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetRequestChart } from "../../Redux/adminRequest/action";
import { Container, Row, Col } from "react-bootstrap";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { RequestTypeCard } from "../../Components/PrivateComponents/admin/RequestCountCard";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";
import { BsStars } from "react-icons/bs";
import { RequestListTable } from "../../Components/PrivateComponents/admin/requestListTable";
import {
  FinishedRequestCard,
  MatchedRequestCard,
  OpenRequestCard,
} from "../../Components/PrivateComponents/admin/fininshedRequestCard";
import { ResponseRateCard } from "../../Components/PrivateComponents/admin/responseCountCard";
import { RequestResponseChart } from "../../Components/PrivateComponents/admin/RequestResponseChart";
import FadeIn from "react-fade-in/lib/FadeIn";
import moment from "moment";
export default function RequestPage() {
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "day").startOf("day").toDate()
  );
  const [endDate, setEndDate] = useState(moment().endOf("day").toDate());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetRequestChart(
        moment().subtract(7, "day").startOf("day").format("YYYY-MM-DD"),
        moment().endOf("day").format("YYYY-MM-DD")
      )
    );
  }, [dispatch]);
  const handleStartDate = (e) => {
    if (e && e < endDate) {
      setStartDate(e);
      dispatch(GetRequestChart(moment(e).format("YYYY-MM-DD"), endDate));
    }
  };
  const handleEndDate = (e) => {
    if (e && e > startDate) {
      setEndDate(e);
      dispatch(GetRequestChart(startDate, moment(e).format("YYYY-MM-DD")));
    }
  };
  return (
    <>
      <AdminNavbar />
      <FadeIn>
        <Container className="my-3 ">
          <Row>
            <Col xs={12} xl={3}>
              <RequestTypeCard />
            </Col>
            <Col xs={12} xl={8} className="d-flex align-items-around">
              <Row xs={2}>
                <Col>
                  <FinishedRequestCard />
                </Col>
                <Col>
                  <ResponseRateCard />
                </Col>
                <Col>
                  <MatchedRequestCard />
                </Col>
                <Col>
                  <OpenRequestCard />
                </Col>
              </Row>
            </Col>
            <Row>
              <Col>
                <div className="d-flex justify-content-center">
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={handleStartDate}
                    onEndDateChange={handleEndDate}
                    maximumDate={new Date()}
                    minimumLength={1}
                    format="dd MMM yyyy"
                    locale={enGB}
                  >
                    {({ startDateInputProps, endDateInputProps, focus }) => (
                      <div className="date-range d-flex">
                        <div>
                          <label htmlFor="startDate" className="">
                            From:
                          </label>
                          <input
                            className={
                              "input my-3 mx-3" +
                              (focus === START_DATE ? " -focused" : "")
                            }
                            {...startDateInputProps}
                            name="startDate"
                            placeholder="Start date"
                            value={moment(startDate).format("YYYY-MM-DD")}
                          />
                        </div>
                        <div>
                          <label htmlFor="">To:</label>
                          <input
                            className={
                              "input my-3 mx-3" +
                              (focus === END_DATE ? " -focused" : "")
                            }
                            {...endDateInputProps}
                            value={moment(endDate).format("YYYY-MM-DD")}
                            placeholder="End date"
                          />
                        </div>
                      </div>
                    )}
                  </DateRangePicker>
                </div>
                <RequestResponseChart />
              </Col>
            </Row>
          </Row>
        </Container>
        <div className="px-5 pb-5">
          <div className="mt-4 px-4 pt-5 memberProfile-title">
            <BsStars className="mb-1 me-2" />
            ALL REQUEST
          </div>
          <RequestListTable />
        </div>
      </FadeIn>
    </>
  );
}
