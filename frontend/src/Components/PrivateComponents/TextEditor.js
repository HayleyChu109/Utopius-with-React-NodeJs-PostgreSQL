import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PutDraft } from "../../Redux/announceData/action";
import S3 from "react-aws-s3";
import { announceConfig } from "../../s3Bucket/s3Config";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const TextEditor = ({ data }) => {
  let initialState;
  if (data !== null) {
    initialState = EditorState.createWithContent(convertFromRaw(data));
  } else {
    initialState = EditorState.createEmpty();
  }
  const [state, setState] = useState(initialState);
  const ReactS3Client = new S3(announceConfig);
  const dispatch = useDispatch();
  const handleUpload = (file) => {
    return ReactS3Client.uploadFile(file)
      .then((link) => {
        return { data: { link: link.location } };
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (state) => {
    setState(state);
    dispatch(PutDraft(convertToRaw(state.getCurrentContent())));
  };
  return (
    <Editor
      editorState={state}
      onEditorStateChange={handleChange}
      wrapperClassName="wrapper"
      editorClassName="editor"
      hashtag={{
        separator: " ",
        trigger: "#",
      }}
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: {
          previewImage: true,
          inputAccept: true,
          uploadCallback: handleUpload,
        },
      }}
    />
  );
};
