import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Collapse } from "reactstrap";

import NavBar from "../../Components/PublicComponents/NavBar";
import Discover from "../../Components/PublicComponents/Discover";
import SearchResult from "../../Components/PublicComponents/SearchResult";
import Footer from "../../Components/PublicComponents/Footer";

const LandingPage = () => {
  const { search } = useSelector((state) => state.requestStore);

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (search !== "") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [search]);

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
