// import { useState } from "react";

import DiscoverCard from "./DiscoverCard";

import { AiFillFire } from "react-icons/ai";
import "../../Pages/SCSS/discover.scss";

const Discover = () => {
  // Reserve below code for customizing discover tag cards
  // const [discoverTag, setDiscoverTag] = useState([
  //   { tagname: "Home Care", key: "homecare" },
  //   { tagname: "Lost n Found", key: "lostnfound" },
  //   { tagname: "Team Up", key: "teamup" },
  //   { tagname: "Bartar", key: "bartar" },
  //   { tagname: "Pet", key: "pet" },
  //   { tagname: "Repair", key: "repair" },
  // ]);
  const discoverTag = [
    {
      tagname: "Home Care",
      key: "homecare",
      photoPath: "https://utopius.s3.ap-southeast-1.amazonaws.com/homecare.png",
    },
    {
      tagname: "Lost n Found",
      key: "lostnfound",
      photoPath:
        "https://utopius.s3.ap-southeast-1.amazonaws.com/lost-and-found.png",
    },
    {
      tagname: "Team Up",
      key: "teamup",
      photoPath: "https://utopius.s3.ap-southeast-1.amazonaws.com/teamup.png",
    },
    {
      tagname: "Pet",
      key: "pet",
      photoPath: "https://utopius.s3.ap-southeast-1.amazonaws.com/pet.png",
    },
    {
      tagname: "Repair",
      key: "repair",
      photoPath: "https://utopius.s3.ap-southeast-1.amazonaws.com/repair.png",
    },
    {
      tagname: "Bartar",
      key: "bartar",
      photoPath: "https://utopius.s3.ap-southeast-1.amazonaws.com/bartar.png",
    },
  ];

  return (
    <>
      <div className="discover-div">
        <div className="container py-4">
          <div className="my-4 px-4 discover-title">
            <AiFillFire className="me-2 mb-1" />
            DISCOVER
          </div>
          <div className="p-4 row">
            {discoverTag.map((tag) => (
              <DiscoverCard
                key={tag.key}
                tagname={tag.tagname}
                photoPath={tag.photoPath}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
