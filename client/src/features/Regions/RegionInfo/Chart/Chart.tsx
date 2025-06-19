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
import {
  DEFAULT_AXIS_MARGIN,
  LEGEND_HEIGHT,
  PREDICTION_LINE_NAME,
  VALUE_LINE_NAME,
} from "./chart.constants";

export default function Chart({ title, data }: ChartProps): React.ReactElement {
  const hasPrediction =
    data && data.some((p): boolean => p.prediction !== undefined);

  return (
    <div className={styles.chartWrap}>
      <span className={styles.titleZone}>{title}</span>
      <div className={styles.chartZone}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 40,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tickMargin={DEFAULT_AXIS_MARGIN} />
            <YAxis
              type="number"
              domain={["auto", "auto"]}
              tickMargin={DEFAULT_AXIS_MARGIN}
            />
            <Tooltip />
            {data && (
              <Line
                name={VALUE_LINE_NAME}
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
              />
            )}
            {hasPrediction && (
              <Line
                name={PREDICTION_LINE_NAME}
                key="prediction"
                type="monotone"
                dataKey="prediction"
                stroke="#278664"
                isAnimationActive
              />
            )}
            <Legend
              verticalAlign="bottom"
              height={LEGEND_HEIGHT}
              wrapperStyle={{ lineHeight: `${LEGEND_HEIGHT}px` }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
