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
    { tagname: "Home Care", key: "homecare" },
    { tagname: "Lost n Found", key: "lostnfound" },
    { tagname: "Team Up", key: "teamup" },
    { tagname: "Bartar", key: "bartar" },
    { tagname: "Pet", key: "pet" },
    { tagname: "Repair", key: "repair" },
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
              <DiscoverCard key={tag.key} tagname={tag.tagname} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
