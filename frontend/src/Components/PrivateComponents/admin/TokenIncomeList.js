import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Table } from "react-bootstrap";
import { GetTokenTransaction } from "../../../Redux/adminToken/action";
import { TokenIncomeTable } from "./TokenIncomeTable";
// import { FaDollarSign } from "react-icons/fa";
import "../../../Pages/SCSS/dashboard.scss";

export function TokenIncomeList() {
  const { transaction } = useSelector((state) => state.adminTokenStore);
  const disptach = useDispatch();
  useEffect(() => {
    disptach(GetTokenTransaction());
  }, [disptach]);

  return (
    <>
      <TokenIncomeTable items={transaction} itemsPerPage={10}/>

    </>
  );
}
