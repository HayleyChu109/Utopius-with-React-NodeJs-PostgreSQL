import { Button, Modal } from "react-bootstrap";
import draftToHtml from "draftjs-to-html";
import parse from "react-html-parser";

import "../../Pages/SCSS/announce.scss";

const AnnouncementPublicPreview = ({ modal, handle, title, data }) => {
  return (
    <>
      <Modal
        contentClassName="announce-pub-modal"
        show={modal}
        onHide={handle}
        size="xl"
        scrollable={true}
        centered
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="announce-pub-modal-heading p-2">
            {title ? title.toUpperCase() : null}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="announce-pub-body border-0">
          <div className="announce-pub-overflow p-2">
            {data
              ? parse(
                  draftToHtml(data, {
                    trigger: "#",
                    separator: " ",
                  })
                )
              : null}
          </div>
        </Modal.Body>
        <div className="announce-pub-modal-footer">
          <Button onClick={handle} className="btn-orange mx-auto my-4">
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AnnouncementPublicPreview;
