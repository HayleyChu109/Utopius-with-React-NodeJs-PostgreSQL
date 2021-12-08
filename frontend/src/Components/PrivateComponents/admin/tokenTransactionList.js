import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Table, Pagination } from "react-bootstrap";
import { GetTokenUserTransaction } from "../../../Redux/adminToken/action";
import { TokenTransactionListItem } from "./tokenTransactionListItems";
import ReactPaginate from "react-paginate";
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
