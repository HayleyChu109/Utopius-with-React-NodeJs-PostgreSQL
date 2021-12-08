import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import FadeIn from "react-fade-in/lib/FadeIn";
import moment from "moment";
import "../../../Pages/SCSS/dashboard.scss";

export const TokenTransactionListItem = ({ items, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  let paginate = [];
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Request</th>
              <th>amount</th>
              <th>created_at</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link to={`/admin/user/${item.payerId}`}>
                      {item.payerProfile ? (
                        <img
                          src={item.payerProfile}
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
                      {item.payer ? item.payer : `New user UID#${item.payerId}`}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/user/${item.payeeId}`}>
                      {item.payeeProfile ? (
                        <img
                          src={item.payeeProfile}
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
                      {item.payee ? item.payee : `New user ID#${item.payeeId}`}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/request/${item.requestId}/comment`}>
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.amount}</td>
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
