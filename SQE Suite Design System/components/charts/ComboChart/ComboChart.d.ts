import * as React from 'react';

export interface ComboChartProps {
  data: Record<string, any>[];
  index: string;
  /** Keys drawn as bars against the left axis. */
  barCategories?: string[];
  /** Keys drawn as lines against the right axis. */
  lineCategories?: string[];
  barColors?: string[];
  lineColors?: string[];
  /** Formats the left axis + bar values. */
  valueFormatter?: (value: number) => string;
  /** Formats the right axis + line values. Falls back to `valueFormatter`. */
  lineValueFormatter?: (value: number) => string;
  /** @default 288 */
  height?: number;
  /** @default false */
  stackBars?: boolean;
  /** @default "smooth" */
  curve?: 'smooth' | 'linear';
  /** @default 4 */
  barRadius?: number;
  showLegend?: boolean;
  showGridLines?: boolean;
  /** @default 56 */
  yAxisWidth?: number;
  /** @default 48 */
  rightAxisWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function ComboChart(props: ComboChartProps): JSX.Element;
