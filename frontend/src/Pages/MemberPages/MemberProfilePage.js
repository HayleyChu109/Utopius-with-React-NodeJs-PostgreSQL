import NavBar from "../../Components/PublicComponents/NavBar";
import MemberProfilePic from "../../Components/PrivateComponents/MemberProfilePic";
import MemberProfileInfo from "../../Components/PrivateComponents/MemberProfileInfo";
import Discover from "../../Components/PublicComponents/Discover";
import Footer from "../../Components/PublicComponents/Footer";

import "../SCSS/memberProfile.scss";
import { BsStars } from "react-icons/bs";

const MemberProfilePage = () => {
  return (
    <>
      <NavBar />
      <div className="container py-4">
        <div className="my-4 px-4 memberProfile-title">
          <BsStars className="mb-1 me-2" />
          PROFILE OF:
          <MemberProfilePic />
          <MemberProfileInfo />
        </div>
      </div>
      <Discover />
      <Footer />
    </>
  );
};

export default MemberProfilePage;
