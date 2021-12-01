import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GradeBall from "../PublicComponents/GradeBall";
import moment from "moment";
import { Table } from "reactstrap";

function TokenTransAct() {
  const tokenTransAct = useSelector(
    (state) => state.tokenRecordStore.tokenTransActRecord
  );

  const history = useHistory();

  const handleMember = (payerId) => {
    history.push(`/member/fellow/${payerId}`);
  };

  const showRequestDetail = (requestId) => {
    history.push(`/member/request/detail/${requestId}/comment`);
  };

  return (
    <>
      <div className="container history-table">
        <Table borderless hover className="text-center">
          <thead>
            <tr className="history-title">
              <th>Date</th>
              <th>From</th>
              <th>Request</th>
              <th>Token Earned</th>
            </tr>
          </thead>
          <tbody>
            {tokenTransAct && tokenTransAct.length > 0
              ? tokenTransAct.map((record) => {
                  return (
                    <tr key={record.id}>
                      <th scope="row">
                        {moment(record.created_at).format("LLL")}
                      </th>
                      <td onClick={() => handleMember(record.payerId)}>
                        <GradeBall grade={record.grade} />
                        <span className="history-row">{record.username}</span>
                      </td>
                      <td onClick={() => showRequestDetail(record.requestId)}>
                        <span className="history-row">{record.title}</span>
                      </td>
                      <td>{record.reward}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default TokenTransAct;
