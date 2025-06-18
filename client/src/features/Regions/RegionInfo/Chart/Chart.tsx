import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartProps } from "./Chart.interface";
import styles from "./chart.module.css";

export default function Chart({
  title,
  measure,
  data,
}: ChartProps): React.ReactElement {
  return (
    <div className={styles.chartWrap}>
      {title}
      <LineChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          dataKey="value"
          label={{
            value: measure,
            angle: -90,
            dx: -45,
          }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
