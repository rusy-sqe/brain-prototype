import * as React from 'react';

export interface RadarChartProps {
  /** One row per axis (spoke). */
  data: Record<string, any>[];
  /** Key holding the axis name. */
  index: string;
  /** Value keys, one polygon per entry. */
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  /** @default 340 */
  height?: number;
  /** Outer ring value. Defaults to the largest value in `data`. */
  maxValue?: number;
  /** Number of grid rings. @default 4 */
  rings?: number;
  /** Grid shape. @default "polygon" */
  shape?: 'polygon' | 'circle';
  /** Polygon fill opacity. @default 0.18 */
  fillOpacity?: number;
  showLegend?: boolean;
  showDots?: boolean;
  /** Distance from the outer ring to the axis label. @default 18 */
  labelOffset?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function RadarChart(props: RadarChartProps): JSX.Element;
