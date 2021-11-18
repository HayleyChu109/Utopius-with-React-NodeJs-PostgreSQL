import jwt_decode from "jwt-decode";

// import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { bookmarkToggleThunk } from "../../Redux/request/actions";

import { BsStars } from "react-icons/bs";
import SearchCard from "./SearchCard";

const SearchResult = () => {
  const { search, requestList } = useSelector((state) => state.requestStore);

  const dispatch = useDispatch();
  const userId = jwt_decode(localStorage.getItem("token")).id;

  const handleBookmark = (requestId) => {
    console.log(requestId);
    // dispatch(bookmarkToggleThunk(requestId, userId));
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
                  requestList.map((req) => (
                    <SearchCard
                      key={req.requestId}
                      request={req}
                      handleBookmark={handleBookmark}
                    />
                  ))
                ) : (
                  <div>No open request !</div>
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
                        req.requestId === Number(search) ||
                        req.district
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        String(req.tag)
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((req) => (
                      <SearchCard
                        key={req.requestId}
                        request={req}
                        handleBookmark={handleBookmark}
                      />
                    ))
                ) : (
                  <div>No matching request !</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
