import React from "react";
import "../../Pages/SCSS/footer.scss";

function Footer() {
  return (
    <div className="d-flex align-items-center justify-content-center footer-page">
      <div className="container row p-5 my-5">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <h2>Contact Us</h2>
          <p>
            Address: 3/F, Citicorp Centre, 18 Whitfield Rd, Tin Hau, Fortress
            Hill
          </p>
          <p>Phone: 6883 8583</p>
          <p>Email: admin@utopius.com</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.780995769679!2d114.18809891453!3d22.28628434903626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401c906c85397%3A0xedd2d296aa8a7803!2sXccelerate!5e0!3m2!1szh-TW!2shk!4v1636989613892!5m2!1szh-TW!2shk"
            style={{ width: "588px", height: "450px", border: 0 }}
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="landing-card col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <h2>Message</h2>
        </div>
      </div>
    </div>
  );
}

export default Footer;
