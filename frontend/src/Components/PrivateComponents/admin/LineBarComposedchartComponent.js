import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Label,
} from "recharts";
import "../../../Pages/SCSS/dashboard.scss";
export default function LineBarComposed({ userData, width, height, ...props }) {
  return (
    <div className="graph">
      <h4>New user</h4>

      <ComposedChart
        data={userData.data}
        width={width}
        height={height}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <XAxis dataKey={userData.XAxisTitle}>
          <Label
            value={userData.XAxisTitle}
            offset={0}
            position="insideBottom"
          />
        </XAxis>
        <YAxis allowDecimals={false}></YAxis>
        <Tooltip />
        <Label value="people " position="bottom" />
        {userData.bar && userData.bar.length > 0
          ? userData.bar.map((item, index) => (
              <Bar key={index} dataKey={item} barSize={20} fill="#413ea0" />
            ))
          : null}
        {userData.line && userData.line.length > 0
          ? userData.line.map((item, index) => (
              <Line dataKey={item} strokeWidth={3} stroke="#ff7300" />
            ))
          : null}
      </ComposedChart>
    </div>
  );
}
