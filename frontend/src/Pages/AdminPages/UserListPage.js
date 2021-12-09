import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { useEffect, useState } from "react";
import { GetUserList } from "../../Redux/adminData/action";
import { useSelector, useDispatch } from "react-redux";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { Row, Col, ListGroup, Tab, Form } from "react-bootstrap";
import moment from "moment";
import {
  GetUserGrowth,
  GetUserGrowthMonthly,
} from "../../Redux/adminData/action";
import { BsStars } from "react-icons/bs";
import { NewUserChart } from "../../Components/PrivateComponents/admin/NewUserChart";
import { NewUserChartMonthly } from "../../Components/PrivateComponents/admin/NewUserChartMonthly";
import { UserListTable } from "../../Components/PrivateComponents/admin/userListTable";
export default function UserListpage() {
  const dispatch = useDispatch();
  const [active, SetActive] = useState("daily");
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "day").startOf("day").toDate()
  );
  const [endDate, setEndDate] = useState(moment().endOf("day").toDate());
  const [startMonth, setStartMonth] = useState(
    moment().subtract(1, "month").startOf("month").toDate()
  );
  const [endMonth, setEndMonth] = useState(moment().endOf("month").toDate());
  const [range, setRange] = useState(0);
  const { userList } = useSelector((state) => state.adminDataStore);

  useEffect(() => {
    dispatch(GetUserList());
    if (active === "daily") {
      dispatch(
        GetUserGrowth(
          moment().subtract(7, "day").startOf("day").format("YYYY-MM-DD"),
          moment().endOf("day").format("YYYY-MM-DD")
        )
      );
    } else {
      dispatch(
        GetUserGrowthMonthly(
          moment().subtract(1, "month").startOf("month").toDate(),
          moment().endOf("month").toDate()
        )
      );
    }
  }, [dispatch, active]);
  const handleStartDate = (e) => {
    if (e&&e<endDate) {
      setStartDate(e);
      dispatch(GetUserGrowth(moment(e).format("YYYY-MM-DD"), endDate));
    }
  };
  const handleRange = (e) => {
    console.log(e);
    setRange(e)
    let lastMonth = moment()
      .subtract(Number(e), "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    setStartMonth(lastMonth);
    dispatch(GetUserGrowthMonthly(lastMonth, endMonth));
  };
  const handleEndDate = (e) => {
    if (e&&e>startDate) {
      setEndDate(e);
      dispatch(GetUserGrowth(startDate, moment(e).format("YYYY-MM-DD")));
    }
  };
  return (
    <>
      <AdminNavbar />
      <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          New User
        </div>
      <div className="container-fluid">
        <Tab.Container activeKey={active}>
          <Row className="p-3">
            <Col
              sm={3}
              className="d-flex align-items-center justify-content-center"
            >
              <ListGroup className="mx-auto">
                <ListGroup.Item 
                  className='admin-btn'
                  eventKey="daily"
                  onClick={() => {
                    dispatch(GetUserGrowth(startDate, endDate));
                    SetActive("daily");
                  }}
                >
                  Daily new user
                </ListGroup.Item>
                <ListGroup.Item
                   className='admin-btn'
                  eventKey="monthly"
                  onClick={() => {
                    dispatch(GetUserGrowthMonthly(startMonth, endMonth));
                    SetActive("monthly");
                  }}
                >
                  Monthly new user
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="daily">
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
                                "input my-3 mx-3 rounded-pill text-center" +
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
                                "input my-3 mx-3 rounded-pill text-center" +
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
                  <NewUserChart />
                </Tab.Pane>

                <Tab.Pane eventKey="monthly">
                    <div>
                              <label htmlFor="">Last month</label>
                              <label htmlFor="" className='float-end'>Last six month</label>
                  <Form.Range
                    type="range"
                    className="border-0"
                    min={1}
                    step={1}
                    max={6}
                    value={range}
                    onChange={(e) => handleRange(e.target.value)}
                    />
                    </div>
                  <NewUserChartMonthly />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          USER LIST
        </div>
        <UserListTable items={userList} itemsPerPage={10} />
      </div>
    </>
  );
}
