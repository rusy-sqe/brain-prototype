import * as React from 'react';

export interface CategoryBarProps {
  /** Segment sizes; rendered proportionally to their sum. */
  values: number[];
  /** Horizon palette names or CSS colors, one per segment. */
  colors?: string[];
  /** Segment captions above the bar. Falls back to formatted values. */
  labels?: string[];
  /** Position of the marker, in the same unit as `values`. */
  marker?: number;
  /** Caption under the marker. */
  markerLabel?: string;
  valueFormatter?: (value: number) => string;
  /** @default 10 */
  barHeight?: number;
  showLabels?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function CategoryBar(props: CategoryBarProps): JSX.Element;
