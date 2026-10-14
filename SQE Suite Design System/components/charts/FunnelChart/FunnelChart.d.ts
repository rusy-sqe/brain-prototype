import * as React from 'react';

export interface FunnelChartProps {
  /** One row per funnel stage, ordered widest → narrowest. */
  data: Record<string, any>[];
  /** Key holding the stage name. */
  index: string;
  /** Key holding the numeric value. */
  category: string;
  /** Explicit colors per stage. Omit to auto-tint from `color`. */
  colors?: string[];
  /** Base Horizon palette name used for the auto tint ramp. @default "blue" */
  color?: string;
  valueFormatter?: (value: number) => string;
  /** `trapezoid` = MUI-style tapering funnel · `bars` = centered bars. @default "trapezoid" */
  variant?: 'trapezoid' | 'bars';
  /** @default 320 */
  height?: number;
  /** Vertical gap between stages in px. @default 6 */
  gap?: number;
  showValues?: boolean;
  /** Show the conversion rate under each stage name. @default true */
  showConversion?: boolean;
  /** Compare against the previous stage or the first stage. @default "previous" */
  conversionMode?: 'previous' | 'first';
  className?: string;
  style?: React.CSSProperties;
}

export declare function FunnelChart(props: FunnelChartProps): JSX.Element;
