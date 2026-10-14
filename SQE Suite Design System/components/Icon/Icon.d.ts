import * as React from 'react';

export interface IconProps {
  /**
   * FontAwesome icon name **without** the `fa-` prefix.
   * @example "house", "bolt", "user", "credit-card"
   */
  name: string;

  /**
   * Icon style variant. Maps to FA prefix classes:
   * - `solid`   → `fas`
   * - `regular` → `far`
   * - `light`   → `fal`  (Pro only)
   * - `brands`  → `fab`
   * - `duotone` → `fad`  (Pro only)
   * @default "solid"
   */
  variant?: 'solid' | 'regular' | 'light' | 'brands' | 'duotone';

  /**
   * FA size modifier. Relative: `xs`, `sm`, `lg`.
   * Absolute multiples: `2x` – `10x`.
   */
  size?: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

  /**
   * Fixed-width glyph (`fa-fw`). Ensures icons align in lists and nav items.
   * @default false
   */
  fw?: boolean;

  /**
   * Continuous 8-step rotation animation (`fa-spin`). Good for loaders.
   * @default false
   */
  spin?: boolean;

  /**
   * 8-step pulsing rotation (`fa-pulse`).
   * @default false
   */
  pulse?: boolean;

  /**
   * CSS color value applied as an inline style.
   * Inherits `currentColor` when omitted.
   */
  color?: string;

  className?: string;
  style?: React.CSSProperties;

  /**
   * Accessible label. When set, adds `role="img"` and removes `aria-hidden`.
   * Omit for purely decorative icons (the default).
   */
  'aria-label'?: string;
}

export declare function Icon(props: IconProps): JSX.Element;
