import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { memberInfoThunk } from "../../Redux/memberProfile/memberProfileActions";

import GradeBall from "./GradeBall";

const UserInfoCombo = ({ userId }) => {
  const { memberInfo } = useSelector((state) => state.memberProfileStore);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      dispatch(memberInfoThunk(userId));
    } else {
      return;
    }
  }, [userId]);

  const handleFellow = (fellowId) => {
    if(localStorage.getItem('isAdmin'))
    {

      history.push(`/admin/user/${fellowId}`);
    }else{

      history.push(`/member/fellow/${fellowId}`);
    }
  };

  return (
    <>
      <div
        className="username-id"
        onClick={(e) => {
          e.stopPropagation();
          handleFellow(userId);
        }}
      >
        <GradeBall grade={memberInfo.grade} />
        <span className="requester-username me-3">{memberInfo.username}</span>
        <span className="requester-id">UID#{memberInfo.id}</span>
      </div>
    </>
  );
};

export default UserInfoCombo;
