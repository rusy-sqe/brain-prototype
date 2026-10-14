import * as React from 'react';

export interface ScatterChartProps {
  data: Record<string, any>[];
  /** Key for the x value. */
  x: string;
  /** Key for the y value. */
  y: string;
  /** Optional key mapped to bubble radius (bubble chart). */
  size?: string;
  /** Optional key used to group + color points; drives the legend. */
  category?: string;
  /** Optional key shown as the tooltip title. */
  label?: string;
  colors?: string[];
  /** Per-dimension formatters. */
  valueFormatter?: { x?: (v: number) => string; y?: (v: number) => string; size?: (v: number) => string };
  /** @default 320 */
  height?: number;
  /** Radius when `size` is not set. @default 6 */
  dotSize?: number;
  /** [min, max] radius when `size` is set. @default [5, 18] */
  sizeRange?: [number, number];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
  showGridLines?: boolean;
  /** @default 56 */
  yAxisWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function ScatterChart(props: ScatterChartProps): JSX.Element;
