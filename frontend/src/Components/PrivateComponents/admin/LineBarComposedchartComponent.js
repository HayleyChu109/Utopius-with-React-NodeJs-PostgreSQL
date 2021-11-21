import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
  ComposedChart,ResponsiveContainer,
  Label,
} from "recharts";
import "../../../Pages/SCSS/dashboard.scss";
export default function LineBarComposed(props) {
  console.log(props.userData);
  return (
    <div className="graph">
      <h4>New user</h4>

        <ComposedChart data={props.userData.data} width={250} height={150} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <XAxis dataKey={props.userData.XAxisTitle}>
            <Label
              value={props.userData.XAxisTitle}
              offset={0}
              position="insideBottom"
              />
          </XAxis>
          <YAxis allowDecimals={false}></YAxis>
          <Tooltip />
          <Label value="people " position="bottom" />
          {props.userData.bar && props.userData.bar.length > 0
            ? props.userData.bar.map((item, index) => (
                <Bar key={index} dataKey={item} barSize={20} fill="#413ea0" />
                ))
                : null}
          {props.userData.line && props.userData.line.length > 0
            ? props.userData.line.map((item, index) => (
                <Line dataKey={item} strokeWidth={3} stroke="#ff7300" />
                ))
                : null}
        </ComposedChart>
    </div>
  );
}
