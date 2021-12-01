import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Modal,Button } from "react-bootstrap";
import { GetUserBlock,PutUserBlock } from "../../../Redux/adminData/action";

import "../../../Pages/SCSS/memberProfile.scss";

export function BlockStatusBar() {
    const {userIsBlock}=useSelector((state)=>state.adminDataStore)
  const [modalBoolean, setModalBoolean] = useState(false);
  const dispatch=useDispatch()
  let {id}=useParams()

  const closeModal = () => {
    setModalBoolean(false);
  };
  const BlockUser = (id) => {
    console.log(id)
    setModalBoolean(false);
    if(userIsBlock)
    {
        dispatch(PutUserBlock(id,false))
    }else{
        dispatch(PutUserBlock(id,true))

    }
  };

  useEffect(()=>{
      if(id)
      {
          dispatch(GetUserBlock(id))

      }
  },[dispatch,id])

  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center col-lg-12 mb-5 memberProfileBottom-blue">
              {userIsBlock===true? <button
              className="btn-dark"
              onClick={() => setModalBoolean(true)}
            >
              UNBLOCK
            </button>: <button
              className="btn-dark"
              onClick={() => setModalBoolean(true)}
            >
              BLOCK
            </button>}
           
          </div>
        </div>
      </div>
      <Modal show={modalBoolean} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>{userIsBlock?`Are you going to block this user?`:`Are you going to unblock this user?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>BlockUser(id)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}