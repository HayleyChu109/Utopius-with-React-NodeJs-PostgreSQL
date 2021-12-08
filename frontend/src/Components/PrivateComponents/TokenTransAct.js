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
              <th>To</th>
              <th>Request</th>
              <th>Token Transfered</th>
            </tr>
          </thead>
          <tbody>
            {tokenTransAct && tokenTransAct.length > 0
              ? tokenTransAct.map((record) => {
                  return (
                    <tr key={record.id}>
                      <td scope="row">
                        {moment(record.created_at).format("LLL")}
                      </td>
                      {record.payerId === 1 ? (
                        <td>
                          <span>Utopius</span>
                        </td>
                      ) : (
                        <td>
                          <GradeBall grade={record.payerGrade} />
                          <span>{record.payerName}</span>
                        </td>
                      )}
                      {record.payeeId === 1 ? (
                        <td>
                          <span>Utopius</span>
                        </td>
                      ) : (
                        <td>
                          <GradeBall grade={record.payeeGrade} />
                          <span>{record.payeeName}</span>
                        </td>
                      )}
                      <td onClick={() => showRequestDetail(record.requestId)}>
                        <span className="history-row">{record.title}</span>
                      </td>
                      <td>{record.amount}</td>
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
