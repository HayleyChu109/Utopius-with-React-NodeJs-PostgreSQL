import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUserGrowth } from "../../../Redux/adminData/action";
import { Card } from "react-bootstrap";
import moment from "moment";


import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "right",
    },
    title: {
      display: true,
      text: "Daily new users",
    },
   
    },
    scales: {
        x: {
          title: {
            display: true,
            text: "Month",
          },
        },
        y: {
          title: {
            display: true,
            text: "Value",
          },
          min: 0,
          ticks: {
            stepSize: 1,
          },
        },
    }
  }


export function NewUserChart() {
  const dispatch = useDispatch();

  const { userGrowth } = useSelector((state) => state.adminDataStore);
  const { data } = userGrowth;
  console.log(data);
  var labels;
  var dataParsed;

  if (data&&data.length>0) {
    labels = data.map((item) => item.date);
    let cumulativeUser=data.map((item) => item["Cumulative Users"])

    console.log(cumulativeUser)
    console.log(labels)
    dataParsed = {
      labels,
      datasets: [
        {
          type: "line",
          label: "Cumulative Users",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          fill: false,
          data: cumulativeUser,
        },
        {
          type: "bar",
          label: "Daily Users",
          backgroundColor: "rgb(75, 192, 192)",
          data: data.map((item) => item["Daily Users"]),
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
  }

  useEffect(() => {
    dispatch(
      GetUserGrowth(moment().subtract(7, "day").toDate(), moment().toDate())
    );
  }, [dispatch]);
  console.log("hell");
  return (
    <Card className='chart'>
      {data&&data.length>0 ? <Chart datasetIdKey='id' options={options} type="bar" data={dataParsed} /> : null}
    </Card>
  );
}
