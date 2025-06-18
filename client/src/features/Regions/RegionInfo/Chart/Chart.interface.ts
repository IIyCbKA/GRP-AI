/*
--------------ChartProps Interface--------------
title   - title of chart
data    - data list of entity for chart
*/

import { HTMLAttributes } from "react";
import { EntityChartData } from "../../regions.types";

export interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  data: EntityChartData[];
}
