import * as React from 'react';

export interface RangeSeries {
  /** Legend + tooltip label. */
  name: string;
  /** Row key holding the range start. */
  low: string;
  /** Row key holding the range end. */
  high: string;
  /** Horizon palette name or CSS color. */
  color?: string;
}

export interface RangeBarChartProps {
  data: Record<string, any>[];
  /** Category axis key. */
  index: string;
  /** One entry per range series (min/max, start/end, budget/actual band…). */
  series: RangeSeries[];
  valueFormatter?: (value: number) => string;
  /** @default 300 */
  height?: number;
  /** `horizontal` = rows (gantt-like) · `vertical` = columns. @default "horizontal" */
  layout?: 'horizontal' | 'vertical';
  /** Bar corner radius; defaults to fully rounded. @default 999 */
  barRadius?: number;
  /** Bar thickness in px. Auto-fits the band when omitted. */
  barThickness?: number;
  /** Draw a dot at each range end. @default false */
  showEndCaps?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  /** Category label gutter. Defaults to 104 (horizontal) / 56 (vertical). */
  labelWidth?: number;
  minValue?: number;
  maxValue?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function RangeBarChart(props: RangeBarChartProps): JSX.Element;
