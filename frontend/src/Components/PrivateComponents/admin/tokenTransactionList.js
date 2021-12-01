import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Table } from "react-bootstrap";
import { GetTokenUserTransaction } from "../../../Redux/adminToken/action";
import { FaDollarSign } from "react-icons/fa";
import "../../../Pages/SCSS/dashboard.scss";

export function TokenTransactionList() {
  const { userTransaction } = useSelector((state) => state.adminTokenStore);
  const disptach = useDispatch();
  useEffect(() => {
    disptach(GetTokenUserTransaction());
  }, [disptach]);

  return (
    <>
      <Card className="column">
          <p className="text-center">User Transaction</p>
        <Table>
          <thead>
            <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>amount</th>
            </tr>
          </thead>
          <tbody>
            {userTransaction && userTransaction.length > 0
              ? userTransaction.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={item.payerProfile} alt=""/>
                        {item.payer}</td>
                    <td>{item.payee}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
