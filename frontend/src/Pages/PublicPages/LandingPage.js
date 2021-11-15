import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Collapse } from "reactstrap";

import NavBar from "../../Components/PublicComponents/NavBar";
import Discover from "../../Components/PublicComponents/Discover";

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
      <div className="text-center">WELCOM TO UTOPIUS</div>
    </>
  );
};

export default LandingPage;
