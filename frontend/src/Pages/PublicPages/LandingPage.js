import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import { getBookmarkListThunk } from "../../Redux/request/actions";

import NavBar from "../../Components/PublicComponents/NavBar";
import Discover from "../../Components/PublicComponents/Discover";
import SearchResult from "../../Components/PublicComponents/SearchResult";
import Footer from "../../Components/PublicComponents/Footer";

import { Collapse } from "reactstrap";

const LandingPage = () => {
  const { search, bookmarkList } = useSelector((state) => state.requestStore);
  const [show, setShow] = useState(true);
  let token = localStorage.getItem("token");
  let userId = "";
  if (token) {
    userId = jwt_decode(token).id;
  } else {
    userId = 0;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (search !== "") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [search]);

  useEffect(() => {
    dispatch(getBookmarkListThunk(userId));
    console.log(bookmarkList);
  }, [userId, dispatch]);

  return (
    <>
      <NavBar />
      <Collapse isOpen={show}>
        <Discover />
      </Collapse>
      <SearchResult />
      <div className="text-center">WELCOME TO UTOPIUS</div>
      <Footer />
    </>
  );
};

export default LandingPage;
