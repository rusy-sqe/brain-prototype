import * as React from 'react';

export interface DonutChartProps {
  /** One row per slice. */
  data: Record<string, any>[];
  /** Key holding the slice name. */
  index: string;
  /** Key holding the numeric value. */
  category: string;
  /** Horizon palette names or CSS colors, one per slice. A row may also carry its own `color`. */
  colors?: string[];
  valueFormatter?: (value: number) => string;
  /** @default "donut" */
  variant?: 'donut' | 'pie';
  /** Outer diameter in px. @default 220 */
  size?: number;
  /** Ring thickness (donut only). @default 28 */
  thickness?: number;
  /** Gap between slices in degrees. @default 1.5 */
  gap?: number;
  /** Overrides the center total label. */
  label?: string;
  /** @default true */
  showLabel?: boolean;
  showLegend?: boolean;
  /** @default "right" */
  legendPosition?: 'right' | 'bottom';
  className?: string;
  style?: React.CSSProperties;
}

export declare function DonutChart(props: DonutChartProps): JSX.Element;
