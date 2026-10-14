import * as React from 'react';

export interface GaugeThreshold {
  from: number;
  to: number;
  /** Horizon palette name or CSS color. */
  color?: string;
}

export interface GaugeChartProps {
  value: number;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** Arc color when no thresholds are given. @default "blue" */
  color?: string;
  /** Unfilled track color. @default "#EDF0F5" */
  trackColor?: string;
  valueFormatter?: (value: number) => string;
  /** Caption under the value. */
  label?: string;
  /** Diameter in px. @default 200 */
  size?: number;
  /** Arc thickness in px. @default 18 */
  thickness?: number;
  /** Arc sweep in degrees. @default 240 */
  sweep?: number;
  /** Threshold bands; the active band colors the arc. */
  thresholds?: GaugeThreshold[];
  showTicks?: boolean;
  showValue?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function GaugeChart(props: GaugeChartProps): JSX.Element;
