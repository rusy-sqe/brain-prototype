import * as React from 'react';

export interface BarChartProps {
  data: Record<string, any>[];
  /** Category axis key. */
  index: string;
  /** Value keys, one bar series per entry. */
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  /** @default 288 */
  height?: number;
  /** `grouped` = side by side · `stacked` = cumulative · `percent` = 100% stacked. @default "grouped" */
  type?: 'grouped' | 'stacked' | 'percent';
  /** `vertical` = columns · `horizontal` = rows. @default "vertical" */
  layout?: 'vertical' | 'horizontal';
  /** Bar corner radius. @default 4 */
  barRadius?: number;
  /** Fraction of the band left empty as gap (0–0.9). @default 0.28 */
  barGap?: number;
  showLegend?: boolean;
  showGridLines?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  /** Label gutter. Defaults to 56 (vertical) / 96 (horizontal). */
  yAxisWidth?: number;
  maxValue?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function BarChart(props: BarChartProps): JSX.Element;
