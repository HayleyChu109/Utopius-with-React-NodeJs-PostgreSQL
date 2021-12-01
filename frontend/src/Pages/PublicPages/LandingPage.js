import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import { getBookmarkListThunk } from "../../Redux/request/actions";

import NavBar from "../../Components/PublicComponents/NavBar";
import Discover from "../../Components/PublicComponents/Discover";
import SearchResult from "../../Components/PublicComponents/SearchResult";
import Footer from "../../Components/PublicComponents/Footer";

import { Collapse } from "reactstrap";

const LandingPage = () => {
  const { search } = useSelector((state) => state.requestStore);
  const history=useHistory()
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
    if(localStorage.getItem('isAdmin'))
    {
      history.push('/admin/dashboard')
    }
    if (search !== "") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [search]);

  useEffect(() => {
    dispatch(getBookmarkListThunk(userId));
  }, [userId, dispatch]);

  return (
    <>
      <NavBar />
      <Collapse isOpen={show}>
        <Discover />
      </Collapse>
      <SearchResult />
      <Footer />
    </>
  );
};

export default LandingPage;
