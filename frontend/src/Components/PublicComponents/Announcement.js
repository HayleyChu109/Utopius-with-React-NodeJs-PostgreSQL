import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getAnnouncementPublicThunk } from "../../Redux/announcePublic/actions.js";

import AnnouncementPreview from "../PrivateComponents/announcementPreview";

import "../../Pages/SCSS/discover.scss";

import { Card, Collapse } from "reactstrap";
import FadeIn from "react-fade-in";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const Announcement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");
  const { announcementList } = useSelector(
    (state) => state.publicAnnounceStore
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncementPublicThunk());
  }, []);

  const modalClick = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setModalOpen(true);
  };

  const modalClose = () => {
    setModalOpen(false);
    setModalTitle("");
    setModalData("");
  };

  return (
    <>
      <div className="announcement-div">
        <div className="container py-4">
          <div className="my-4 px-4">
            <span
              className="announcement-title"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HiOutlineSpeakerphone className="me-2 mb-1" />
              ANNOUNCEMENT
            </span>
          </div>
          <Collapse isOpen={isOpen}>
            <div className="announcement-table">
              <div className="announcement-overflow">
                {announcementList && announcementList.length > 0 ? (
                  announcementList
                    // .filter(
                    //   (announcement) =>
                    //     Date.now() > announcement.start_date &&
                    //     Date.now() < announcement.end_date
                    // )
                    .map((announcement) => (
                      <>
                        <FadeIn>
                          <Card className="announcement-card mb-2">
                            <div
                              className="row g-0"
                              onClick={() =>
                                modalClick(
                                  announcement.title,
                                  announcement.content
                                )
                              }
                            >
                              <div className="announcement-date col-3">
                                {moment(announcement.created_at).format("lll")}
                              </div>
                              <div className="announcement-heading col-9">
                                {announcement.title}
                              </div>
                            </div>
                          </Card>
                        </FadeIn>
                        <AnnouncementPreview
                          modal={modalOpen}
                          handle={modalClose}
                          title={modalTitle}
                          data={modalData}
                        />
                      </>
                    ))
                ) : (
                  <div>No Announcement</div>
                )}
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default Announcement;
