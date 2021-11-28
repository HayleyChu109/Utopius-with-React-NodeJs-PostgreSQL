import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

import Output from "editorjs-react-renderer";

export default function AnnouncementPreview({ modal, handle, title, data }) {

  return (
    <>
      <Modal show={modal} onHide={handle} size="xl" scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{title}</h2>
          <Output data={data} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
