import * as React from 'react';

export type LatLng = [number, number];

export interface MineMapBoundary {
  positions: LatLng[];
  /** Horizon palette name or CSS color. @default "yellow" */
  color?: string;
  label?: string;
}

export interface MineMapRoute {
  positions: LatLng[];
  type?: 'haul' | 'vessel' | 'rail' | 'other';
  /** Horizon palette name or CSS color; defaults by type. */
  color?: string;
  label?: string;
  dashed?: boolean;
}

export interface MineMapMarker {
  position: LatLng;
  type?: 'stockpile' | 'vessel' | 'port' | 'asset' | 'plant' | 'other';
  label?: string;
  value?: string | number;
  /** Horizon palette name or CSS color; defaults by type. */
  color?: string;
  /** Font Awesome icon name override, e.g. "fa-truck". */
  icon?: string;
}

export interface MineMapProps {
  /** [lat, lng] of the initial view. */
  center: LatLng;
  /** @default 13 */
  zoom?: number;
  /** @default 480 */
  height?: number | string;
  /** ESRI basemap. @default "satellite" */
  basemap?: 'satellite' | 'streets' | 'topo';
  boundary?: MineMapBoundary;
  routes?: MineMapRoute[];
  markers?: MineMapMarker[];
  /** @default true */
  showLegend?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Requires Leaflet loaded globally before mount:
 *   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
 *   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
 * Basemap tiles are ESRI (World_Imagery / World_Street_Map / World_Topo_Map).
 */
export declare function MineMap(props: MineMapProps): JSX.Element;
