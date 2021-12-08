import { useEffect } from "react";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// import {
//   ResponsiveContainer,
//   Bar,
//   BarChart,
//   XAxis,
//   YAxis,
//   Label,
// } from "recharts";
import { GetTagCount } from "../../../Redux/tag/action";
import { useSelector, useDispatch } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display:false
    },
    title: {
      display: true,
      text: "Most used tag",
      font:{size:20}
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "count",
      },
      ticks: {
        stepSize: 1,
      },
      min: 0,
      max: 10,
    },
    y: {
      title: {
        display: true,
        text: "tag",
      },
      min: 0,
      max: 5,
    },
}
};

export const TagCountChart = () => {
  console.log("why");
  const dispatch = useDispatch();
  const { tagStat } = useSelector((state) => state.tagStore);
  console.log(tagStat);
  const labels = tagStat.map((item) => item.tagName);
  useEffect(() => {
    dispatch(GetTagCount());
  }, [dispatch]);
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: tagStat.map((item) => item.count),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <Card className='chart'>
   
        <Bar options={options} data={data} />
      </Card>
    </>
  );
};
