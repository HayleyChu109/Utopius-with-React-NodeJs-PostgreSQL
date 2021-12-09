import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Table,
  Pagination,
  Form,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from "react-bootstrap";
import FadeIn from "react-fade-in/lib/FadeIn";
import {
  GetUserList,
  PutUserGroupBlock,
} from "../../../Redux/adminData/action";
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";
import moment from "moment";
export const UserListTable = ({ items, itemsPerPage }) => {
  const [column, setColumn] = useState("id");
  const dispatch = useDispatch();
  const [asc, setAsc] = useState(true);
  const [selection, setSelection] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentItems, setCurrentItems] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  let paginate = [];
  const handleSelection = (id) => {
    let index = selection.indexOf(id);
    let newSelected = [];
    if (index < 0) {
      newSelected = newSelected.concat(selection, id);
    } else if (index === 0) {
      newSelected = newSelected.concat(selection.slice(1));
    } else if (index === selection.length - 1) {
      newSelected = newSelected.concat(selection.slice(0, -1));
    } else if (index > 0) {
      newSelected = newSelected.concat(
        selection.slice(0, index),
        selection.slice(index + 1)
      );
    }
    setSelection(newSelected);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = currentItems.map((n) => n.id);
      console.log(newSelecteds);
      setSelection(newSelecteds);
      setSelectAll(event.target.checked);
      return;
    }
    setSelection([]);
    setSelectAll(event.target.checked);
  };
  const handleFirstpage = () => {
    setActivePage(1);
    const newOffset = (0 * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${activePage}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const handleLastpage = () => {
    setActivePage(pageCount);
    const newOffset = (pageCount - 1 * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${activePage}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const handleSort = (col) => {
    if (column === col) {
      setAsc(!asc);
      if (!asc === true) {
        dispatch(GetUserList(col, "asc"));
      } else {
        dispatch(GetUserList(col, "desc"));
      }
    } else {
      setColumn(col);
      setAsc(true);
      dispatch(GetUserList(col, "asc"));
    }
  };
  const handlePageClick = (number) => {
    setActivePage(number + 1);
    const newOffset = (number * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${number}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const handlePrevious = () => {
    if (activePage > 1) {
      console.log(activePage - 1);
      setActivePage(activePage - 1);
      const newOffset = (activePage * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${activePage}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
  };
  const handleNext = () => {
    if (activePage < pageCount) {
      setActivePage(activePage + 1);
      const newOffset = (activePage * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${activePage}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
  };
  for (let i = 1; i <= pageCount; i++) {
    paginate.push(
      <Pagination.Item
        onClick={() => handlePageClick(i - 1)}
        active={i === activePage}
      >
        {i}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(endOffset);
    console.log(items.slice(itemOffset, endOffset));
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);
  return (
    <>
      <FadeIn>
        {selection.length > 0 ? (
          <div className="d-flex ms-5">
            {selection.length} items has selected
            <ButtonToolbar
              aria-label="Toolbar with button groups"
              className="ms-4"
            >
              <ButtonGroup className="me-2 ms-3" aria-label="First group">
                <Button
                  variant="secondary"
                  onClick={() => dispatch(PutUserGroupBlock(selection))}
                >
                  Block/Unblock
                </Button>
              </ButtonGroup>
              <ButtonGroup className="me-2" aria-label="Second group">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setSelection([]);
                    setSelectAll(false);
                  }}
                >
                  Unselect
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        ) : null}
        <Table>
          <thead>
            <tr>
              <th>
                <Form.Check
                  onChange={(e) => handleSelectAllClick(e)}
                  checked={selectAll}
                />
              </th>
              <th onClick={() => handleSort("id")}>
                #{" "}
                {column === "id" ? (
                  asc === false ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleSort("username")}>
                username
                {column === "username" ? (
                  asc === false ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleSort("requestCount")}>
                Request
                {column === "requestCount" ? (
                  asc === false ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleSort("responseCount")}>
                Response
                {column === "responseCount" ? (
                  asc === false ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleSort("token")}>
                token
                {column === "token" ? (
                  asc === false ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
              <th onClick={() => handleSort("account.created_at")}>
                created_at
                {column === "account.created_at" ? (
                  asc === false ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortAlphaAsc />
                  )
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index % 2 !== 0
                      ? "table-primary"
                      : null || selection.includes(item.id)
                      ? "table-secondary"
                      : null
                  }
                >
                  <td>
                    <Form.Check
                      onChange={() => handleSelection(item.id)}
                      checked={selection.includes(item.id)}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>
                    <Link to={`/admin/user/${item.id}`}>
                      {item.profilePath ? (
                        <img
                          src={item.profilePath}
                          alt=""
                          className="profile mx-2"
                        />
                      ) : (
                        <img
                          src="https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg"
                          alt="profile pic"
                          className="profile mx-2"
                        />
                      )}
                      {item.username ? item.username : `Member UID${item.id}`}
                    </Link>
                    {item.blacklist ? (
                      <span className="text-muted mx-2">blocked</span>
                    ) : null}
                  </td>
                  <td>{item.requestCount}</td>
                  <td>{item.responseCount}</td>
                  <td>{item.token}</td>
                  <td>
                    {moment().diff(item.created_at, "day") >= 1
                      ? moment(item.created_at).format("YYYY-MM-DD HH:MM")
                      : moment(item.created_at).fromNow()}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          <Pagination.First
            onClick={handleFirstpage}
            disabled={activePage === 1}
          />
          <Pagination.Prev onClick={handlePrevious} disabled={activePage === 1}>
            Previous
          </Pagination.Prev>
          {paginate}
          <Pagination.Next
            disabled={activePage === pageCount}
            onClick={handleNext}
          >
            Next
          </Pagination.Next>
          <Pagination.Last
            onClick={handleLastpage}
            disabled={activePage === pageCount}
          />
        </Pagination>
      </FadeIn>
    </>
  );
};
