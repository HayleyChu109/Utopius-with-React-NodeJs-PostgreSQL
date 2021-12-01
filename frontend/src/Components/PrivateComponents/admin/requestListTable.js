import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetRequestList } from "../../../Redux/adminRequest/action";
import { Table, Pagination, Form, Badge } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import moment from "moment";
export function RequestListTable() {
  const [toolbar, setToolbar] = useState(false);
  const [selection, setSelection] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const { requestList } = useSelector((state) => state.adminRequestStore);
  const handleSelection = (id) => {
    let index = selection.indexOf(id);
    console.log(index);
    if (index > -1) {
      setSelection(selection.splice(index, 1));
    } else {
      setSelection(selection.concat(id));
    }
    console.log(selection);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelection([]);
      setSelectAll(false);
    } else {
      let select = requestList.map((item) => item.id);
      setSelection(select);
      setSelectAll(true);
    }
    console.log(selection);
  };

  useEffect(() => {
    dispatch(GetRequestList());
  }, [dispatch,selection]);
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>
              <FormCheckInput checked={selectAll} onClick={handleSelectAll} />
            </th>
            <th>#</th>
            <th>Title</th>
            <th>Requester</th>
            <th>reward</th>
            <th>status</th>
            <th>matched/required</th>
            <th>tag</th>
            <th>created at</th>
          </tr>
        </thead>
        <tbody>
          {requestList && requestList.length > 0
            ? requestList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <FormCheckInput
                      type="checkbox"
                      checked={selection.includes(item.id)}
                      onChange={() => handleSelection(item.id)}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.profilePath} alt="profile" /> {item.username}
                  </td>
                  <td>{item.reward}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.matched}/{item.requiredPpl}
                  </td>
                  <td>
                    {item.tag && item.tag.length > 0
                      ? item.tag.map((tag, index) => (
                          <Badge key={index}>{tag}</Badge>
                        ))
                      : null}
                  </td>
                  <td>
                      {moment(new Date(item.created_at)).format('YYYY-MM-DD')}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </>
  );
}
