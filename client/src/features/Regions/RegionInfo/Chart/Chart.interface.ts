/*
--------------ChartProps Interface--------------
title   - title of chart
measure - measure of values
data    - data list of entity for chart
*/

import { HTMLAttributes } from "react";
import { EntityForChart } from "../../regions.types";

export interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  measure: string;
  data: EntityForChart[];
}
