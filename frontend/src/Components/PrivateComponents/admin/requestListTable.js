import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  GetRequestList,
  FilterRequestList,
  SortRequestList,
} from "../../../Redux/adminRequest/action";
import { Table, Badge, Form } from "react-bootstrap";
import { searchReq } from "../../../Redux/request/actions";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";
import moment from "moment";
import "../../../Pages/SCSS/dashboard.scss";
export function RequestListTable() {
  // const [toolbar, setToolbar] = useState(false);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("title");
  const [desc, setDesc] = useState(false);

  const dispatch = useDispatch();
  const { requestList } = useSelector((state) => state.adminRequestStore);
  const handleOrder = (name) => {
    if (name === order) {
      setDesc(!desc);
      dispatch(FilterRequestList(query, name, !desc));
    } else {
      dispatch(FilterRequestList(query, name, false));
      setOrder(name);
      setDesc(false);
    }
  };
  
  const history = useHistory();
  const handleSearch = (val) => {
    history.push("/admin");
    dispatch(searchReq(val));
  };
  const handleQuery = (event) => {
    setQuery(event.target.value);
    console.log(event.target.value.toLowerCase());

    dispatch(FilterRequestList(event.target.value.toLowerCase(), order, desc));
  };
  const handleStatus = (status) => {
    switch (status) {
      case "open":
        return <td className="text-success ">{status}</td>;
      case "completed":
        return <td className="text-secondary">{status}</td>;
      case "matched":
        return <td className="text-primary">{status}</td>;
      case "cancelled":
        return <td className="text-danger">{status}</td>;

      default:
        return <td>{status}</td>;
    }
  };
 
  useEffect(() => {
    dispatch(GetRequestList());
  }, [dispatch]);
  return (
    <>
      <div className="d-flex justify-content-end ">
        <input
          className="p-2"
          type="text"
          placeholder="search everything"
          value={query}
          onChange={(e) => handleQuery(e)}
        />
      </div>
      <div className="table-responsive rounded-3 my-2">
        <Table className="text-center">
          <thead className="table-secondary">
            <tr>
              
              <th onClick={() => handleOrder("id")}>
                id
                {order === "id" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleOrder("title")}>
                Title
                {order === "title" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleOrder("requester")}>
                Requester
                {order === "requester" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleOrder("reward")}>
                reward
                {order === "reward" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleOrder("status")}>
                status
                {order === "status" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleOrder("matched")}>
                matched/required
                {order === "matched" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleOrder("tag")}>
                tag
                {order === "tag" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleOrder("created_at")}>
                created at
                {order === "created_at" ? (
                  desc ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {requestList && requestList.length > 0
              ? requestList.map((item) => (
                  <tr key={item.id}>
                    
                    <td>{item.id}</td>

                    <td>
                      <Link to={`/admin/request/${item.id}/comment`}>
                        {item.title}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/user/${item.requesterId}`}>
                        {item.profilePath?
                        <img
                          src={item.profilePath}
                          alt="profile"
                          className="profile"
                        />:<img
                        src="https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg"
                        alt="profile pic"
                        className="profile mx-2"
                      />}{" "}
                        {item.username?item.username:`New User id: ${item.requesterId}`}
                      </Link>
                    </td>
                    <td>{item.reward}</td>
                    {handleStatus(item.status)}
                    <td>
                      {item.matched}/{item.requiredPpl}
                    </td>
                    <td>
                      {item.tag && item.tag.length > 0
                        ? item.tag.map((tag, index) => (
                            <Badge
                              className="mx-2"
                              key={index}
                              onClick={() => handleSearch(tag)}
                            >
                              {tag}
                            </Badge>
                          ))
                        : null}
                    </td>
                    <td>
                      {moment(new Date(item.created_at)).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}
