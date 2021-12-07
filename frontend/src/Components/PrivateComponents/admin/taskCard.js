import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { GetTaskList } from "../../../Redux/task/action";
import { FaTasks } from "react-icons/fa";
import "../../../Pages/SCSS/dashboard.scss";

export function TaskCountCard() {
  const { task } = useSelector((state) => state.taskStore);
  const disptach = useDispatch();
  let length = [];
  useEffect(() => {
    disptach(GetTaskList());
  }, [disptach]);
  if (task) {
    length = task.filter((item) => item.status !== "completed").length;
  }
  return (
    <>
      <Card>
        <FaTasks className="icon" />
        <p className="me-2 mt-2 text-end">Task</p>
        <p className="me-2 mt-2 text-end">{length}</p>
      </Card>
    </>
  );
}
