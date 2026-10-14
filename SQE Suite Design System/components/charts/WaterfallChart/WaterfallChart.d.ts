import * as React from 'react';

export interface WaterfallItem {
  name: string;
  /** Delta for a step, or the absolute value when `type` is `"total"`. */
  value: number;
  /** `"total"` draws a full-height bar from zero (start / end / subtotal). */
  type?: 'delta' | 'total';
  /** Horizon palette name or CSS color override. */
  color?: string;
}

export interface WaterfallChartProps {
  data: WaterfallItem[];
  valueFormatter?: (value: number) => string;
  /** @default 300 */
  height?: number;
  /** Color for positive deltas. @default "green" */
  increaseColor?: string;
  /** Color for negative deltas. @default "red" */
  decreaseColor?: string;
  /** Color for `type: "total"` bars. @default "blue" */
  totalColor?: string;
  /** @default 3 */
  barRadius?: number;
  /** Fraction of each band left as gap. @default 0.34 */
  barGap?: number;
  /** Dashed lines linking each bar to the next. @default true */
  showConnectors?: boolean;
  /** Print the delta above each bar. @default true */
  showValues?: boolean;
  showGridLines?: boolean;
  /** @default 56 */
  yAxisWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function WaterfallChart(props: WaterfallChartProps): JSX.Element;
