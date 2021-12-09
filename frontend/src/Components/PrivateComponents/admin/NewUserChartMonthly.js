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
      text: "Monthly new users",
      font:{size:20}
    },
   
    },
    scales: {
        x: {
          title: {
            display: true,
            text: "Month",
            font:{size:15}
          },
        },
        y: {
          title: {
            display: true,
           
          },
          min: 0,
          suggestedMax:10,
          ticks: {
            stepSize: 1,
          },
        },
    }
  }


export function NewUserChartMonthly() {

  const { userGrowth } = useSelector((state) => state.adminDataStore);
  const { data } = userGrowth;
  console.log(data);
  var labels;
  var dataParsed;

  if (data&&data.length>0) {
    labels = data.map((item) => item.month);
    let cumulativeUser=data.map((item) => item["Cumulative Users"])

    console.log(cumulativeUser)
    console.log(labels)
    dataParsed = {
      labels,
      datasets: [
        {
          type: "line",
          label: "Cumulative Monthly Users",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          fill: false,
          data: cumulativeUser,
        },
        {
          type: "bar",
          label: "Monthly Users",
          backgroundColor: "rgb(75, 192, 192)",
          data: data.map((item) => item["Monthly Users"]),
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
  }

 
  return (
    <Card className='chart'>
      {data&&data.length>0 ? <Chart datasetIdKey='id' options={options} type="bar" data={dataParsed} /> : null}
    </Card>
  );
}
