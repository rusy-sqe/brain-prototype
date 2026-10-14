import * as React from 'react';

export interface SparkChartProps {
  data: Record<string, any>[];
  /** x-axis key (unlabelled, but keeps the row shape Tremor-compatible). */
  index?: string;
  categories: string[];
  colors?: string[];
  /** @default "area" */
  type?: 'area' | 'line' | 'bar';
  /** @default 56 */
  height?: number;
  /** @default "smooth" */
  curve?: 'smooth' | 'linear';
  /** @default 2 */
  strokeWidth?: number;
  /** Mark the latest point. @default false */
  showLastDot?: boolean;
  /** @default "gradient" */
  fill?: 'gradient' | 'solid' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export declare function SparkChart(props: SparkChartProps): JSX.Element;
