import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../Components/PublicComponents/NavBar";
import Footer from "../../Components/PublicComponents/Footer";
import lost from "../../Images/sign.png";
import "../SCSS/error.scss";

function ErrorPage() {
  const history = useHistory();

  const handleError = () => {
    history.push("/");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="col-lg-7 error">
            <h1 className="ms-5 error-title">
              Oh no! <br />
              Lost in Utopius?
            </h1>
            <p className="ms-5 error-text">
              Don't worry~ We will help you to go back home
            </p>
            <button className="ms-5 btn-dark-orange" onClick={handleError}>
              GO HOME
            </button>
          </div>
          <div className="col-lg-5">
            <img src={lost} alt="error" className="my-5 error-pic" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
