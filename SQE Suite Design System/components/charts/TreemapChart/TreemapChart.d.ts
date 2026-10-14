import * as React from 'react';

export interface TreemapItem {
  name: string;
  value: number;
  /** Horizon palette name or CSS color. */
  color?: string;
}

export interface TreemapChartProps {
  /** Flat list of tiles; sorted largest → smallest and laid out squarified. */
  data: TreemapItem[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  /** @default 320 */
  height?: number;
  /** Gap between tiles in px. @default 4 */
  gap?: number;
  /** Tile corner radius. @default 6 */
  radius?: number;
  /** Print the value on tiles tall enough for it. @default true */
  showValues?: boolean;
  /** Print the share of total. @default true */
  showShare?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function TreemapChart(props: TreemapChartProps): JSX.Element;
