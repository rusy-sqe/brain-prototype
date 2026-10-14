import * as React from 'react';

export interface SankeyLink {
  /** Source node id. */
  source: string;
  /** Target node id. */
  target: string;
  /** Flow weight — sets ribbon thickness. */
  value: number;
}

export interface SankeyNode {
  id: string;
  /** Display label; falls back to `id`. */
  label?: string;
  /** Horizon palette name or CSS color. */
  color?: string;
}

export interface SankeyChartProps {
  /** Weighted edges. Nodes are inferred from these when `nodes` is omitted. */
  links: SankeyLink[];
  /** Optional node metadata (labels, colors). */
  nodes?: SankeyNode[];
  /** Fallback color ramp for inferred nodes. */
  colors?: string[];
  valueFormatter?: (value: number) => string;
  /** @default 360 */
  height?: number;
  /** Node bar width in px. @default 14 */
  nodeWidth?: number;
  /** Vertical gap between nodes in a column. @default 18 */
  nodePadding?: number;
  /** Ribbon opacity at rest. @default 0.32 */
  linkOpacity?: number;
  /** Tint ribbons by their source or target node. @default "source" */
  linkColorMode?: 'source' | 'target';
  showLabels?: boolean;
  /** Show each node's total next to its label. @default true */
  showValues?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function SankeyChart(props: SankeyChartProps): JSX.Element;
