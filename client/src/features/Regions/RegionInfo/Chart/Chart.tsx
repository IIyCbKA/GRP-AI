import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartProps } from "./Chart.interface";
import styles from "./chart.module.css";

export default function Chart({ title, data }: ChartProps): React.ReactElement {
  const hasPrediction = data.some((p) => p.prediction !== undefined);

  return (
    <div className={styles.chartWrap}>
      <span className={styles.titleZone}>{title}</span>
      <div className={styles.chartZone}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 35,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tickMargin={8} />
            <YAxis type="number" domain={["auto", "auto"]} tickMargin={8} />
            <Tooltip />
            <Line
              name="Фактическое"
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
            />
            {hasPrediction && (
              <Line
                name="Спрогнозированное"
                key="prediction"
                type="monotone"
                dataKey="prediction"
                stroke="#278664"
                isAnimationActive
              />
            )}
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ lineHeight: "36px" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
