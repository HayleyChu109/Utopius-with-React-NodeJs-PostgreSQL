import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getRequestListThunk } from "../../Redux/request/actions";
import SearchCard from "./SearchCard";

import { Button } from "reactstrap";
import { BsStars } from "react-icons/bs";

const SearchResult = () => {
  const { search, requestList } = useSelector((state) => state.requestStore);
  const [reqDisplayQty, setReqDisplayQty] = useState(4);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getRequestListThunk());
  }, [dispatch]);

  const showRequestDetail = (requestId) => {
    if (localStorage.getItem("isAdmin")) {
      history.push(`/admin/request/${requestId}/comment`);
    } else {
      history.push(`/member/request/detail/${requestId}/comment`);
    }
  };

  return (
    <>
      <div>
        <div className="container py-4">
          {search === "" ? (
            <div className="row">
              <div className="col-12 my-4 px-4 new-search-title">
                <BsStars className="mb-1 me-2" />
                WHAT'S NEW
              </div>
              <div className="col-12 row g-3 m-0">
                {requestList && requestList.length > 0 ? (
                  requestList.map((req, i) =>
                    i < reqDisplayQty ? (
                      <SearchCard
                        key={req.id}
                        request={req}
                        handleClick={showRequestDetail}
                      />
                    ) : null
                  )
                ) : (
                  <div className="ps-4">No open request !</div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="m-4 new-search-title">
                <BsStars className="mb-1 me-2" />
                SEARCH RESULT FOR : <span>{search.toUpperCase()}</span>
              </div>
              <div className="col-12 row g-3 m-0">
                {requestList && requestList.length > 0 ? (
                  requestList
                    .filter(
                      (req) =>
                        req.detail
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        req.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        req.id === Number(search) ||
                        req.district
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        String(req.tag)
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((req) => (
                      <SearchCard
                        key={req.id}
                        request={req}
                        handleClick={showRequestDetail}
                      />
                    ))
                ) : (
                  <div>No matching request !</div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="text-center mx-auto py-5">
          <Button
            className="btn-white-lightorange-sm"
            onClick={() => setReqDisplayQty(reqDisplayQty + 4)}
          >
            Showmore
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
