import * as React from 'react';

export interface BarListItem {
  name: string;
  value: number;
  /** Optional per-row color (Horizon palette name or CSS color). */
  color?: string;
  /** Makes the label a link. */
  href?: string;
}

export interface BarListProps {
  data: BarListItem[];
  valueFormatter?: (value: number) => string;
  /** Base color for all bars. @default "blue" */
  color?: string;
  /** Per-row colors, overrides `color`. */
  colors?: string[];
  /** @default "descending" */
  sortOrder?: 'descending' | 'ascending' | 'none';
  /** Value that maps to a full-width bar. Defaults to the largest row. */
  maxValue?: number;
  /** Row height in px. @default 32 */
  barHeight?: number;
  /** Gap between rows in px. @default 8 */
  gap?: number;
  showValues?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function BarList(props: BarListProps): JSX.Element;
