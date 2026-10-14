import * as React from 'react';

export interface TrackerBlock {
  /** Horizon palette name or CSS color. */
  color: string;
  /** Hover label, e.g. "Mar 3 · Operational". */
  tooltip?: string;
}

export interface TrackerProps {
  /** One block per interval, left → right. */
  data: TrackerBlock[];
  /** @default 34 */
  blockHeight?: number;
  /** Gap between blocks in px. @default 2 */
  gap?: number;
  /** @default 3 */
  radius?: number;
  /** Caption under the first block. */
  startLabel?: string;
  /** Caption under the last block. */
  endLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Tracker(props: TrackerProps): JSX.Element;
