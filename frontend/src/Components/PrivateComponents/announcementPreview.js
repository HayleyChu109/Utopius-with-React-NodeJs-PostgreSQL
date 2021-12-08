import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import draftToHtml from "draftjs-to-html";
import { convertFromRaw, convertToRaw } from "draft-js";
import parse from 'react-html-parser'
import Output from "editorjs-react-renderer";

export default function AnnouncementPreview({ modal, handle, title, data }) {
console.log(data)
  return (
    <>
      <Modal show={modal} onHide={handle} size="xl" scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{title}</h2>
          {data
            ? parse(
                draftToHtml(data, {
                  trigger: "#",
                  separator: " ",
                })
              )
            : <p>Write something ✍️</p>}
        </Modal.Body>
        <Modal.Footer className='admin-footer'>
          <Button variant="secondary" onClick={handle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
