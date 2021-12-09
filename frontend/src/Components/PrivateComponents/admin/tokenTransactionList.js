import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetTokenUserTransaction } from "../../../Redux/adminToken/action";
import { TokenTransactionListItem } from "./tokenTransactionListItems";
import "../../../Pages/SCSS/dashboard.scss";
import "bootstrap//dist/css/bootstrap.min.css";

export function TokenTransactionList({ itemsPerPage }) {
  const { userTransaction } = useSelector((state) => state.adminTokenStore);

  const disptach = useDispatch();

  useEffect(() => {
    disptach(GetTokenUserTransaction());
  }, [disptach]);

  return (
    <>
      <TokenTransactionListItem
        items={userTransaction}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
