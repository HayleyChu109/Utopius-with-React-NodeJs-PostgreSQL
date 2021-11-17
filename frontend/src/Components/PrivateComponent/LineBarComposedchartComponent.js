import {XAxis,YAxis,Tooltip,Line,Bar,ComposedChart} from "recharts"

export default function LineBarComposed(props){
    return(
        <ComposedChart data={props.data}>
            <XAxis/>
            <YAxis/>
            <Tooltip />
            <Line/>
            <Bar/>
        </ComposedChart>
    )
}