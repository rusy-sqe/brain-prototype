import * as React from 'react';

export interface AreaChartProps {
  /** Row objects. Each row holds the index key plus one field per category. */
  data: Record<string, any>[];
  /** Key used for the x axis, e.g. `"date"`. */
  index: string;
  /** Value keys to plot, one area per entry. */
  categories: string[];
  /** Horizon palette names (`blue`, `purple`, `teal`, `green`, `orange`, `magenta`, `yellow`, `red`) or CSS colors. Defaults to the Horizon series order. */
  colors?: string[];
  /** Formats y-axis ticks and tooltip values. */
  valueFormatter?: (value: number) => string;
  /** Chart height in px. @default 288 */
  height?: number;
  /** Stack areas cumulatively. @default false */
  stack?: boolean;
  /** @default "smooth" */
  curve?: 'smooth' | 'linear';
  /** Area fill treatment. @default "gradient" */
  fill?: 'gradient' | 'solid' | 'none';
  showLegend?: boolean;
  showGridLines?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  /** Left gutter reserved for y-axis labels. @default 56 */
  yAxisWidth?: number;
  minValue?: number;
  maxValue?: number;
  /** Label only the first and last x tick. @default false */
  startEndOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function AreaChart(props: AreaChartProps): JSX.Element;
