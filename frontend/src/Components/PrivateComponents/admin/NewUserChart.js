import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
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
      font: { size: 20 },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
        font: { size: 15 },
      },
    },
    y: {
      title: {
        display: true,
      },
      min: 0,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export function NewUserChart() {
  const { userGrowth } = useSelector((state) => state.adminDataStore);
  const { data } = userGrowth;

  var labels;
  var dataParsed;

  if (data && data.length > 0) {
    labels = data.map((item) => item.date);
    let cumulativeUser = data.map((item) => item["Cumulative Users"]);

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

  return (
    <Card className="chart">
      {data && data.length > 0 ? (
        <Chart
          datasetIdKey="id"
          options={options}
          type="bar"
          data={dataParsed}
        />
      ) : null}
    </Card>
  );
}
