import * as React from 'react';

export interface HeatmapCell {
  /** Column key. */
  x: string | number;
  /** Row key. */
  y: string | number;
  value: number;
}

export interface HeatmapProps {
  /** One entry per cell. Missing combinations render as `emptyColor`. */
  data: HeatmapCell[];
  /** Explicit column order. Inferred from `data` when omitted. */
  xLabels?: string[];
  /** Explicit row order. Inferred from `data` when omitted. */
  yLabels?: string[];
  /** Horizon palette name or CSS color used as the scale's high end. @default "blue" */
  color?: string;
  /** Color at the scale's low end / for missing cells. @default "#F9FAFC" */
  emptyColor?: string;
  valueFormatter?: (value: number) => string;
  /** Row height in px. @default 34 */
  cellHeight?: number;
  /** Gap between cells in px. @default 3 */
  cellGap?: number;
  /** @default 4 */
  cellRadius?: number;
  minValue?: number;
  maxValue?: number;
  /** Print the value inside each cell. @default false */
  showValues?: boolean;
  /** Show the color-scale ramp under the grid. @default true */
  showLegend?: boolean;
  /** Row-label gutter. @default 72 */
  yAxisWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Heatmap(props: HeatmapProps): JSX.Element;
