import * as React from 'react';

export interface LineChartProps {
  data: Record<string, any>[];
  /** x-axis key. */
  index: string;
  /** Value keys to plot, one line per entry. */
  categories: string[];
  /** Horizon palette names or CSS colors. */
  colors?: string[];
  valueFormatter?: (value: number) => string;
  /** @default 288 */
  height?: number;
  /** @default "smooth" */
  curve?: 'smooth' | 'linear';
  /** @default 2 */
  strokeWidth?: number;
  /** Render a dot at every data point. @default false */
  showDots?: boolean;
  /** Category names rendered with a dashed stroke (e.g. forecasts). */
  dashed?: string[];
  showLegend?: boolean;
  showGridLines?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  /** @default 56 */
  yAxisWidth?: number;
  minValue?: number;
  maxValue?: number;
  startEndOnly?: boolean;
  /** Bridge gaps for missing values. @default true */
  connectNulls?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function LineChart(props: LineChartProps): JSX.Element;
