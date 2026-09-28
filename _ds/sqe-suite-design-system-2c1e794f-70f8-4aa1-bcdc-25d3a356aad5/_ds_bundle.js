/* @ds-bundle: {"format":4,"namespace":"SQESuiteDesignSystem_2c1e79","components":[{"name":"Icon","sourcePath":"components/Icon/Icon.jsx"},{"name":"MineMap","sourcePath":"components/Map/MineMap.jsx"},{"name":"AreaChart","sourcePath":"components/charts/AreaChart/AreaChart.jsx"},{"name":"BarChart","sourcePath":"components/charts/BarChart/BarChart.jsx"},{"name":"ComboChart","sourcePath":"components/charts/ComboChart/ComboChart.jsx"},{"name":"DonutChart","sourcePath":"components/charts/DonutChart/DonutChart.jsx"},{"name":"FunnelChart","sourcePath":"components/charts/FunnelChart/FunnelChart.jsx"},{"name":"GaugeChart","sourcePath":"components/charts/GaugeChart/GaugeChart.jsx"},{"name":"Heatmap","sourcePath":"components/charts/Heatmap/Heatmap.jsx"},{"name":"LineChart","sourcePath":"components/charts/LineChart/LineChart.jsx"},{"name":"BarList","sourcePath":"components/charts/MicroCharts/BarList.jsx"},{"name":"CategoryBar","sourcePath":"components/charts/MicroCharts/CategoryBar.jsx"},{"name":"SparkChart","sourcePath":"components/charts/MicroCharts/SparkChart.jsx"},{"name":"Tracker","sourcePath":"components/charts/MicroCharts/Tracker.jsx"},{"name":"RadarChart","sourcePath":"components/charts/RadarChart/RadarChart.jsx"},{"name":"RangeBarChart","sourcePath":"components/charts/RangeBarChart/RangeBarChart.jsx"},{"name":"SankeyChart","sourcePath":"components/charts/SankeyChart/SankeyChart.jsx"},{"name":"ScatterChart","sourcePath":"components/charts/ScatterChart/ScatterChart.jsx"},{"name":"TreemapChart","sourcePath":"components/charts/TreemapChart/TreemapChart.jsx"},{"name":"WaterfallChart","sourcePath":"components/charts/WaterfallChart/WaterfallChart.jsx"}],"sourceHashes":{"components/Icon/Icon.jsx":"b8b360e322cc","components/Map/MineMap.jsx":"6a37c743629b","components/charts/AreaChart/AreaChart.jsx":"3a6460d2adbb","components/charts/BarChart/BarChart.jsx":"3fbfff0a6327","components/charts/ComboChart/ComboChart.jsx":"569d84657b99","components/charts/DonutChart/DonutChart.jsx":"0fd89c69d08f","components/charts/FunnelChart/FunnelChart.jsx":"46fe4c90427f","components/charts/GaugeChart/GaugeChart.jsx":"4be2aca793e1","components/charts/Heatmap/Heatmap.jsx":"1b605856572d","components/charts/LineChart/LineChart.jsx":"81d1d7a1c6c1","components/charts/MicroCharts/BarList.jsx":"a30ce95f7b7b","components/charts/MicroCharts/CategoryBar.jsx":"e66b5ec3b661","components/charts/MicroCharts/SparkChart.jsx":"1de85ccb474e","components/charts/MicroCharts/Tracker.jsx":"57bb926aff38","components/charts/RadarChart/RadarChart.jsx":"05a437f67c4a","components/charts/RangeBarChart/RangeBarChart.jsx":"9ace64165c9a","components/charts/SankeyChart/SankeyChart.jsx":"d25e2687cfe7","components/charts/ScatterChart/ScatterChart.jsx":"daf35d22a26c","components/charts/TreemapChart/TreemapChart.jsx":"95cae889fb4b","components/charts/WaterfallChart/WaterfallChart.jsx":"65f1c0e8cf5e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SQESuiteDesignSystem_2c1e79 = window.SQESuiteDesignSystem_2c1e79 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Icon/Icon.jsx
try { (() => {
/**
 * Icon — FontAwesome Pro 5 wrapper
 * Horizon Design System
 *
 * Usage:
 *   <Icon name="home" />
 *   <Icon name="user" variant="regular" />
 *   <Icon name="github" variant="brands" />
 *   <Icon name="spinner" spin />
 *   <Icon name="home" size="2x" color="var(--hz-horizon-primary)" />
 */

function Icon({
  name,
  variant = 'solid',
  size,
  fw = false,
  spin = false,
  pulse = false,
  color,
  className = '',
  style: styleProp = {},
  'aria-label': ariaLabel
}) {
  const variantMap = {
    solid: 'fas',
    regular: 'far',
    light: 'fal',
    brands: 'fab',
    duotone: 'fad'
  };
  const cls = [variantMap[variant] ?? 'fas', 'fa-' + name, size && 'fa-' + size, fw && 'fa-fw', spin && 'fa-spin', pulse && 'fa-pulse', className].filter(Boolean).join(' ');
  return React.createElement('i', {
    className: cls,
    style: color ? {
      color,
      ...styleProp
    } : styleProp,
    'aria-hidden': ariaLabel ? undefined : 'true',
    'aria-label': ariaLabel,
    role: ariaLabel ? 'img' : undefined
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/Map/MineMap.jsx
try { (() => {
/**
 * MineMap — site map view on ESRI basemaps (satellite / streets / topo)
 * Horizon Design System
 *
 * Renders site boundary, haul/vessel/rail routes, and asset markers
 * (stockpiles, vessels, ports, plant, equipment) over a real map.
 * Requires Leaflet loaded globally (see MineMap.d.ts) before mount.
 */

const HZ_MAP_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
function hzMapColor(c) {
  return HZ_MAP_C[c] || c || HZ_MAP_C.neutral;
}
const HZ_TILE_URLS = {
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  streets: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  topo: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
};
const HZ_TILE_ATTR = 'Tiles &copy; Esri &mdash; Esri, Maxar, Earthstar Geographics';
const HZ_ROUTE_DEFAULT = {
  haul: 'orange',
  vessel: 'blue',
  rail: 'purple',
  other: 'neutral'
};
const HZ_MARKER_DEFAULT = {
  stockpile: 'orange',
  vessel: 'blue',
  port: 'teal',
  asset: 'neutral',
  plant: 'purple',
  other: 'neutral'
};
const HZ_MARKER_ICON = {
  stockpile: 'fa-boxes',
  vessel: 'fa-sailboat',
  port: 'fa-anchor',
  asset: 'fa-truck',
  plant: 'fa-building',
  other: 'fa-map-marker-alt'
};
function hzMarkerHtml(m, color) {
  const type = m.type || 'other';
  const icon = m.icon || HZ_MARKER_ICON[type] || HZ_MARKER_ICON.other;
  const size = type === 'stockpile' || type === 'plant' ? 32 : 26;
  const radius = type === 'stockpile' || type === 'plant' ? 8 : 999;
  return '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:' + radius + 'px;background:' + color + ';border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;color:#fff;font-size:' + Math.round(size * 0.42) + 'px"><i class="fas ' + icon + '"></i></div>';
}
function MineMap({
  center,
  zoom = 13,
  height = 480,
  basemap = 'satellite',
  boundary,
  routes = [],
  markers = [],
  showLegend = true,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const mapRef = React.useRef(null);
  const layersRef = React.useRef([]);
  const [ready, setReady] = React.useState(false);
  const [missingLeaflet, setMissingLeaflet] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || mapRef.current) return;
    if (!window.L) {
      setMissingLeaflet(true);
      return;
    }
    const map = window.L.map(ref.current, {
      zoomControl: false,
      attributionControl: true
    }).setView(center, zoom);
    window.L.control.zoom({
      position: 'bottomright'
    }).addTo(map);
    mapRef.current = map;
    setReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const boundaryKey = JSON.stringify(boundary || null);
  const routesKey = JSON.stringify(routes);
  const markersKey = JSON.stringify(markers);
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.L) return;
    layersRef.current.forEach(l => map.removeLayer(l));
    layersRef.current = [];
    const tile = window.L.tileLayer(HZ_TILE_URLS[basemap] || HZ_TILE_URLS.satellite, {
      attribution: HZ_TILE_ATTR,
      maxZoom: 19
    }).addTo(map);
    layersRef.current.push(tile);
    if (boundary && boundary.positions && boundary.positions.length) {
      const poly = window.L.polygon(boundary.positions, {
        color: hzMapColor(boundary.color || 'yellow'),
        weight: 2,
        fillOpacity: .08,
        dashArray: '6 4'
      }).addTo(map);
      if (boundary.label) poly.bindTooltip(boundary.label, {
        className: 'hz-map-tip'
      });
      layersRef.current.push(poly);
    }
    routes.forEach((r, i) => {
      const type = r.type || 'other';
      const line = window.L.polyline(r.positions, {
        color: hzMapColor(r.color || HZ_ROUTE_DEFAULT[type]),
        weight: type === 'vessel' ? 2.5 : 3.5,
        dashArray: r.dashed || type === 'vessel' ? '2 7' : null,
        opacity: .9,
        lineCap: 'round'
      }).addTo(map);
      if (r.label) line.bindTooltip(r.label, {
        sticky: true,
        className: 'hz-map-tip'
      });
      layersRef.current.push(line);
    });
    markers.forEach((m, i) => {
      const type = m.type || 'other';
      const color = hzMapColor(m.color || HZ_MARKER_DEFAULT[type]);
      const icon = window.L.divIcon({
        className: '',
        html: hzMarkerHtml(m, color),
        iconSize: [0, 0]
      });
      const mk = window.L.marker(m.position, {
        icon
      }).addTo(map);
      if (m.label) mk.bindTooltip(m.label + (m.value != null ? ' \u00b7 ' + m.value : ''), {
        direction: 'top',
        offset: [0, -14],
        className: 'hz-map-tip'
      });
      layersRef.current.push(mk);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, basemap, boundaryKey, routesKey, markersKey]);
  const legend = [];
  if (boundary) legend.push({
    label: boundary.label || 'Site boundary',
    color: hzMapColor(boundary.color || 'yellow'),
    shape: 'line'
  });
  const seenR = {},
    seenM = {};
  routes.forEach(r => {
    const t = r.type || 'other';
    if (!seenR[t]) {
      seenR[t] = 1;
      legend.push({
        label: r.label || t[0].toUpperCase() + t.slice(1) + ' route',
        color: hzMapColor(r.color || HZ_ROUTE_DEFAULT[t]),
        shape: 'line'
      });
    }
  });
  markers.forEach(m => {
    const t = m.type || 'other';
    if (!seenM[t]) {
      seenM[t] = 1;
      legend.push({
        label: t[0].toUpperCase() + t.slice(1),
        color: hzMapColor(m.color || HZ_MARKER_DEFAULT[t]),
        shape: 'dot'
      });
    }
  });
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      height,
      borderRadius: 14,
      overflow: 'hidden',
      border: '1px solid var(--hz-border-subtle, #D5DBE5)',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      background: '#0b1220',
      ...style
    }
  }, React.createElement('style', {
    dangerouslySetInnerHTML: {
      __html: '.hz-map-tip{background:var(--hz-neutral-950,#12161f);color:#E7EBF2;border:none;border-radius:6px;font-size:12px;font-family:var(--hz-font-sans,Inter,sans-serif);padding:5px 9px;box-shadow:0 4px 12px rgba(0,0,0,.35)}.hz-map-tip::before{border-top-color:var(--hz-neutral-950,#12161f)!important}.leaflet-control-zoom a{color:#1E252E!important}'
    }
  }), React.createElement('div', {
    ref,
    style: {
      position: 'absolute',
      inset: 0
    }
  }), missingLeaflet && React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#8490A1',
      fontSize: 13,
      textAlign: 'center',
      padding: 24
    }
  }, 'Leaflet not found \u2014 load leaflet.css/leaflet.js before mounting MineMap.'), showLegend && legend.length > 0 && React.createElement('div', {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      background: 'rgba(18,22,31,.82)',
      backdropFilter: 'blur(6px)',
      borderRadius: 10,
      padding: '10px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      zIndex: 1000
    }
  }, legend.map(it => React.createElement('div', {
    key: it.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 12,
      color: '#E7EBF2'
    }
  }, it.shape === 'line' ? React.createElement('span', {
    style: {
      width: 16,
      height: 2,
      background: it.color,
      flex: 'none',
      borderRadius: 1
    }
  }) : React.createElement('span', {
    style: {
      width: 9,
      height: 9,
      borderRadius: 999,
      background: it.color,
      flex: 'none'
    }
  }), it.label))));
}
Object.assign(__ds_scope, { MineMap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Map/MineMap.jsx", error: String((e && e.message) || e) }); }

// components/charts/AreaChart/AreaChart.jsx
try { (() => {
/**
 * AreaChart — Horizon Design System
 * Tremor-compatible API, dependency-free SVG rendering.
 *
 *   <AreaChart data={rows} index="date" categories={['Revenue','Cost']} stack />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzTicks(min, max, n) {
  if (!isFinite(min) || !isFinite(max)) return [0, 1];
  if (min === max) {
    max = min + 1;
  }
  const step0 = (max - min) / n,
    mag = Math.pow(10, Math.floor(Math.log10(step0))),
    norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  minWidth: 120
};
function hzSmoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6,
      c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6,
      c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}
function AreaChart({
  data = [],
  index,
  categories = [],
  colors,
  valueFormatter = v => String(v),
  height = 288,
  stack = false,
  curve = 'smooth',
  fill = 'gradient',
  showLegend = true,
  showGridLines = true,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 56,
  minValue,
  maxValue,
  startEndOnly = false,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const uid = React.useMemo(() => 'hzac' + Math.random().toString(36).slice(2, 8), []);
  const pad = {
    t: 10,
    r: 12,
    b: showXAxis ? 26 : 8,
    l: showYAxis ? yAxisWidth : 8
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  const series = categories.map((c, i) => ({
    key: c,
    color: hzColor(colors && colors[i], i)
  }));
  const stacked = data.map(row => {
    let acc = 0;
    return categories.map(c => {
      const v = Number(row[c]) || 0;
      const from = acc;
      acc += v;
      return stack ? [from, acc] : [0, v];
    });
  });
  const vals = stacked.flat().flat();
  const lo = minValue != null ? minValue : Math.min(0, ...vals);
  const hi = maxValue != null ? maxValue : Math.max(...vals, 0);
  const tk = hzTicks(lo, hi, 4);
  const y0 = tk[0],
    y1 = tk[tk.length - 1];
  const yS = v => h - (v - y0) / (y1 - y0 || 1) * h;
  const xS = i => data.length <= 1 ? w / 2 : i / (data.length - 1) * w;
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - pad.l;
    if (data.length === 0) return;
    const i = Math.max(0, Math.min(data.length - 1, Math.round(x / (w || 1) * (data.length - 1))));
    setHover(i);
  };
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLegend && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 10,
      paddingLeft: pad.l
    }
  }, series.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: s.color
    }
  }), s.key))), React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    onMouseMove: onMove,
    onMouseLeave: () => setHover(null),
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('defs', null, series.map(s => React.createElement('linearGradient', {
    key: s.key,
    id: `${uid}-${s.key.replace(/\W/g, '')}`,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 1
  }, React.createElement('stop', {
    offset: '0%',
    stopColor: s.color,
    stopOpacity: .28
  }), React.createElement('stop', {
    offset: '100%',
    stopColor: s.color,
    stopOpacity: .02
  })))), React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, showGridLines && tk.map(t => React.createElement('line', {
    key: t,
    x1: 0,
    x2: w,
    y1: yS(t),
    y2: yS(t),
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeWidth: 1,
    strokeDasharray: t === 0 ? '' : '3 3'
  })), showYAxis && tk.map(t => React.createElement('text', {
    key: t,
    x: -10,
    y: yS(t) + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, valueFormatter(t))), showXAxis && data.map((row, i) => {
    if (startEndOnly && i !== 0 && i !== data.length - 1) return null;
    return React.createElement('text', {
      key: i,
      x: xS(i),
      y: h + 18,
      textAnchor: i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle',
      ...HZ_AXIS
    }, String(row[index]));
  }), series.map((s, si) => {
    const top = data.map((_, i) => [xS(i), yS(stacked[i][si][1])]);
    const bottom = data.map((_, i) => [xS(i), yS(stacked[i][si][0])]).reverse();
    const line = curve === 'smooth' ? hzSmoothPath(top) : 'M' + top.map(p => p.join(',')).join('L');
    const back = curve === 'smooth' ? hzSmoothPath(bottom) : 'M' + bottom.map(p => p.join(',')).join('L');
    const area = fill === 'none' ? null : line + back.replace('M', 'L') + 'Z';
    return React.createElement('g', {
      key: s.key
    }, area && React.createElement('path', {
      d: area,
      fill: fill === 'gradient' ? `url(#${uid}-${s.key.replace(/\W/g, '')})` : s.color,
      fillOpacity: fill === 'gradient' ? 1 : .2
    }), React.createElement('path', {
      d: line,
      fill: 'none',
      stroke: s.color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }));
  }), hover != null && React.createElement('g', null, React.createElement('line', {
    x1: xS(hover),
    x2: xS(hover),
    y1: 0,
    y2: h,
    stroke: 'var(--hz-border-default, #BAC3D1)',
    strokeWidth: 1
  }), series.map((s, si) => React.createElement('circle', {
    key: s.key,
    cx: xS(hover),
    cy: yS(stacked[hover][si][1]),
    r: 4,
    fill: 'var(--hz-surface-card,#fff)',
    stroke: s.color,
    strokeWidth: 2
  }))))), hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(Math.max(pad.l + xS(hover) + 12, 0), Math.max(width - 150, 0)),
      top: pad.t + 4
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 6
    }
  }, String(data[hover][index])), series.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary, #505D6E)',
      flex: 1
    }
  }, s.key), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, valueFormatter(Number(data[hover][s.key]) || 0)))))));
}
Object.assign(__ds_scope, { AreaChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/AreaChart/AreaChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/BarChart/BarChart.jsx
try { (() => {
/**
 * BarChart — Horizon Design System
 *   <BarChart data={rows} index="month" categories={['New','Returning']} type="stacked" />
 *   <BarChart data={rows} index="team" categories={['Score']} layout="horizontal" />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzTicks(min, max, n) {
  if (min === max) {
    max = min + 1;
  }
  const step0 = (max - min) / n,
    mag = Math.pow(10, Math.floor(Math.log10(step0))),
    norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  minWidth: 120
};
function BarChart({
  data = [],
  index,
  categories = [],
  colors,
  valueFormatter = v => String(v),
  height = 288,
  type = 'grouped',
  layout = 'vertical',
  barRadius = 4,
  barGap = 0.28,
  showLegend = true,
  showGridLines = true,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth,
  maxValue,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const horizontal = layout === 'horizontal';
  const stacked = type === 'stacked' || type === 'percent';
  const gutter = yAxisWidth != null ? yAxisWidth : horizontal ? 96 : 56;
  const pad = {
    t: 10,
    r: 14,
    b: showXAxis ? 26 : 8,
    l: showYAxis || horizontal ? gutter : 8
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  const series = categories.map((c, i) => ({
    key: c,
    color: hzColor(colors && colors[i], i)
  }));
  const rows = data.map(r => {
    const raw = categories.map(c => Number(r[c]) || 0);
    const total = raw.reduce((a, b) => a + b, 0);
    const vals = type === 'percent' && total ? raw.map(v => v / total * 100) : raw;
    let acc = 0;
    const segs = vals.map(v => {
      const s = acc;
      acc += v;
      return [s, acc];
    });
    return {
      row: r,
      raw,
      vals,
      segs,
      total: vals.reduce((a, b) => a + b, 0)
    };
  });
  const hiRaw = maxValue != null ? maxValue : type === 'percent' ? 100 : Math.max(0, ...rows.map(r => stacked ? r.total : Math.max(...r.vals)));
  const tk = type === 'percent' ? [0, 25, 50, 75, 100] : hzTicks(0, hiRaw, 4);
  const vMax = tk[tk.length - 1];
  const fmtTick = t => type === 'percent' ? t + '%' : valueFormatter(t);
  const bandSize = (horizontal ? h : w) / Math.max(1, data.length);
  const bandPad = bandSize * barGap / 2;
  const groupSize = bandSize - bandPad * 2;
  const barSize = stacked ? Math.min(groupSize, 44) : Math.min(groupSize / Math.max(1, series.length), 36);
  const lenOf = v => v / (vMax || 1) * (horizontal ? w : h);
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLegend && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 10,
      paddingLeft: pad.l
    }
  }, series.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color
    }
  }), s.key))), React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, showGridLines && tk.map(t => horizontal ? React.createElement('line', {
    key: t,
    x1: lenOf(t),
    x2: lenOf(t),
    y1: 0,
    y2: h,
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: t === 0 ? '' : '3 3'
  }) : React.createElement('line', {
    key: t,
    x1: 0,
    x2: w,
    y1: h - lenOf(t),
    y2: h - lenOf(t),
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: t === 0 ? '' : '3 3'
  })), horizontal ? showXAxis && tk.map(t => React.createElement('text', {
    key: t,
    x: lenOf(t),
    y: h + 18,
    textAnchor: 'middle',
    ...HZ_AXIS
  }, fmtTick(t))) : showYAxis && tk.map(t => React.createElement('text', {
    key: t,
    x: -10,
    y: h - lenOf(t) + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, fmtTick(t))), data.map((row, i) => horizontal ? React.createElement('text', {
    key: i,
    x: -10,
    y: i * bandSize + bandSize / 2 + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, String(row[index])) : showXAxis && React.createElement('text', {
    key: i,
    x: i * bandSize + bandSize / 2,
    y: h + 18,
    textAnchor: 'middle',
    ...HZ_AXIS
  }, String(row[index]))), rows.map((r, i) => React.createElement('g', {
    key: i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null)
  }, React.createElement('rect', {
    x: horizontal ? 0 : i * bandSize,
    y: horizontal ? i * bandSize : 0,
    width: horizontal ? w : bandSize,
    height: horizontal ? bandSize : h,
    fill: hover === i ? 'var(--hz-neutral-100, #EDF0F5)' : 'transparent',
    opacity: .6
  }), series.map((s, si) => {
    const [from, to] = r.segs[si],
      v = r.vals[si];
    if (!v) return null;
    const off = stacked ? (bandSize - barSize) / 2 : bandPad + si * barSize + (groupSize - barSize * series.length) / 2;
    const len = lenOf(stacked ? to - from : v);
    return horizontal ? React.createElement('rect', {
      key: s.key,
      x: stacked ? lenOf(from) : 0,
      y: i * bandSize + off,
      width: Math.max(1, len),
      height: Math.max(1, barSize - 2),
      rx: barRadius,
      fill: s.color
    }) : React.createElement('rect', {
      key: s.key,
      x: i * bandSize + off,
      y: h - lenOf(stacked ? to : v),
      width: Math.max(1, barSize - 2),
      height: Math.max(1, len),
      rx: barRadius,
      fill: s.color
    });
  }))))), hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(horizontal ? pad.l + 24 : pad.l + hover * bandSize + bandSize / 2 + 12, Math.max(width - 160, 0)),
      top: horizontal ? Math.min(pad.t + hover * bandSize, height - 40) : pad.t + 4
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 6
    }
  }, String(data[hover][index])), series.map((s, si) => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary, #505D6E)',
      flex: 1
    }
  }, s.key), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, type === 'percent' ? rows[hover].vals[si].toFixed(1) + '%' : valueFormatter(rows[hover].raw[si])))))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/BarChart/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/ComboChart/ComboChart.jsx
try { (() => {
/**
 * ComboChart — bars + lines on independent axes. Horizon Design System.
 *   <ComboChart data={rows} index="month" barCategories={['Volume']} lineCategories={['Margin']} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzTicks(min, max, n) {
  if (min === max) {
    max = min + 1;
  }
  const step0 = (max - min) / n,
    mag = Math.pow(10, Math.floor(Math.log10(step0))),
    norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  minWidth: 130
};
function hzSmoothPath(pts) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}
function ComboChart({
  data = [],
  index,
  barCategories = [],
  lineCategories = [],
  barColors,
  lineColors,
  valueFormatter = v => String(v),
  lineValueFormatter,
  height = 288,
  stackBars = false,
  curve = 'smooth',
  barRadius = 4,
  showLegend = true,
  showGridLines = true,
  yAxisWidth = 56,
  rightAxisWidth = 48,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const fmtR = lineValueFormatter || valueFormatter;
  const pad = {
    t: 10,
    r: lineCategories.length ? rightAxisWidth : 12,
    b: 26,
    l: yAxisWidth
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  const bars = barCategories.map((c, i) => ({
    key: c,
    color: hzColor(barColors && barColors[i], i)
  }));
  const lines = lineCategories.map((c, i) => ({
    key: c,
    color: hzColor(lineColors && lineColors[i], i + barCategories.length)
  }));
  const barRows = data.map(r => {
    const raw = barCategories.map(c => Number(r[c]) || 0);
    let acc = 0;
    const segs = raw.map(v => {
      const s = acc;
      acc += v;
      return [s, acc];
    });
    return {
      raw,
      segs,
      total: acc
    };
  });
  const lMax = Math.max(0, ...barRows.map(r => stackBars ? r.total : Math.max(...r.raw, 0)));
  const rMax = Math.max(0, ...data.map(r => Math.max(...lineCategories.map(c => Number(r[c]) || 0))));
  const rMin = Math.min(0, ...data.map(r => Math.min(...lineCategories.map(c => Number(r[c]) || 0))));
  const ltk = hzTicks(0, lMax, 4),
    rtk = hzTicks(rMin, rMax, 4);
  const lTop = ltk[ltk.length - 1],
    rTop = rtk[rtk.length - 1],
    rBot = rtk[0];
  const yL = v => h - v / (lTop || 1) * h;
  const yR = v => h - (v - rBot) / (rTop - rBot || 1) * h;
  const band = w / Math.max(1, data.length);
  const barSize = stackBars ? Math.min(band * .55, 40) : Math.min(band * .62 / Math.max(1, bars.length), 26);
  const cx = i => i * band + band / 2;
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLegend && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 10,
      paddingLeft: pad.l
    }
  }, bars.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color
    }
  }), s.key)).concat(lines.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 14,
      height: 2,
      borderRadius: 2,
      background: s.color
    }
  }), s.key)))), React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, showGridLines && ltk.map(t => React.createElement('line', {
    key: t,
    x1: 0,
    x2: w,
    y1: yL(t),
    y2: yL(t),
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: t === 0 ? '' : '3 3'
  })), ltk.map(t => React.createElement('text', {
    key: t,
    x: -10,
    y: yL(t) + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, valueFormatter(t))), lines.length > 0 && rtk.map(t => React.createElement('text', {
    key: 'r' + t,
    x: w + 10,
    y: yR(t) + 4,
    textAnchor: 'start',
    ...HZ_AXIS,
    fill: lines[0].color
  }, fmtR(t))), data.map((row, i) => React.createElement('text', {
    key: i,
    x: cx(i),
    y: h + 18,
    textAnchor: 'middle',
    ...HZ_AXIS
  }, String(row[index]))), data.map((row, i) => React.createElement('g', {
    key: i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null)
  }, React.createElement('rect', {
    x: i * band,
    y: 0,
    width: band,
    height: h,
    fill: hover === i ? 'var(--hz-neutral-100, #EDF0F5)' : 'transparent',
    opacity: .7
  }), bars.map((s, si) => {
    const v = barRows[i].raw[si];
    if (!v) return null;
    const off = stackBars ? -barSize / 2 : -(barSize * bars.length) / 2 + si * barSize;
    const top = stackBars ? yL(barRows[i].segs[si][1]) : yL(v);
    const len = stackBars ? yL(barRows[i].segs[si][0]) - top : h - yL(v);
    return React.createElement('rect', {
      key: s.key,
      x: cx(i) + off,
      y: top,
      width: Math.max(1, barSize - 2),
      height: Math.max(1, len),
      rx: barRadius,
      fill: s.color
    });
  }))), lines.map(s => {
    const pts = data.map((r, i) => [cx(i), yR(Number(r[s.key]) || 0)]);
    return React.createElement('g', {
      key: s.key
    }, React.createElement('path', {
      d: curve === 'smooth' ? hzSmoothPath(pts) : 'M' + pts.map(p => p.join(',')).join('L'),
      fill: 'none',
      stroke: s.color,
      strokeWidth: 2.5,
      strokeLinecap: 'round'
    }), pts.map((p, i) => React.createElement('circle', {
      key: i,
      cx: p[0],
      cy: p[1],
      r: 3.5,
      fill: 'var(--hz-surface-card,#fff)',
      stroke: s.color,
      strokeWidth: 2
    })));
  }))), hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(pad.l + cx(hover) + 12, Math.max(width - 170, 0)),
      top: pad.t + 4
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 6
    }
  }, String(data[hover][index])), bars.map((s, si) => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary, #505D6E)',
      flex: 1
    }
  }, s.key), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, valueFormatter(barRows[hover].raw[si])))).concat(lines.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 2,
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary, #505D6E)',
      flex: 1
    }
  }, s.key), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, fmtR(Number(data[hover][s.key]) || 0))))))));
}
Object.assign(__ds_scope, { ComboChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/ComboChart/ComboChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/DonutChart/DonutChart.jsx
try { (() => {
/**
 * DonutChart — Horizon Design System
 *   <DonutChart data={rows} index="name" category="value" variant="donut" label="$9.1K" />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)'
};
function hzArc(cx, cy, rOuter, rInner, a0, a1) {
  const p = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = p(rOuter, a0),
    [x1, y1] = p(rOuter, a1),
    [x2, y2] = p(rInner, a1),
    [x3, y3] = p(rInner, a0);
  if (rInner <= 0) return `M${cx},${cy}L${x0},${y0}A${rOuter},${rOuter} 0 ${large} 1 ${x1},${y1}Z`;
  return `M${x0},${y0}A${rOuter},${rOuter} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${rInner},${rInner} 0 ${large} 0 ${x3},${y3}Z`;
}
function DonutChart({
  data = [],
  index,
  category,
  colors,
  valueFormatter = v => String(v),
  variant = 'donut',
  size = 220,
  thickness = 28,
  gap = 1.5,
  label,
  showLabel = true,
  showLegend = true,
  legendPosition = 'right',
  className = '',
  style = {}
}) {
  const [hover, setHover] = React.useState(null);
  const total = data.reduce((a, r) => a + (Number(r[category]) || 0), 0);
  const rOuter = size / 2,
    rInner = variant === 'pie' ? 0 : Math.max(0, rOuter - thickness);
  let angle = -Math.PI / 2;
  const slices = data.map((r, i) => {
    const v = Number(r[category]) || 0;
    const span = total ? v / total * Math.PI * 2 : 0;
    const g = total && span > 0.02 ? gap * Math.PI / 180 : 0;
    const s = {
      key: String(r[index]),
      value: v,
      color: hzColor(colors && colors[i] || r.color, i),
      a0: angle + g / 2,
      a1: angle + span - g / 2
    };
    angle += span;
    return s;
  });
  const centerValue = label != null ? label : valueFormatter(total);
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      flexDirection: legendPosition === 'bottom' ? 'column' : 'row',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: 'none'
    }
  }, React.createElement('svg', {
    width: size,
    height: size,
    style: {
      display: 'block'
    }
  }, React.createElement('g', null, slices.map((s, i) => React.createElement('path', {
    key: s.key + i,
    d: hzArc(rOuter, rOuter, hover === i ? rOuter : rOuter - 2, rInner ? rInner : 0, s.a0, s.a1),
    fill: s.color,
    opacity: hover == null || hover === i ? 1 : .35,
    style: {
      transition: 'opacity .15s, d .15s'
    },
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null)
  })))), variant === 'donut' && showLabel && React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--hz-text-tertiary, #8490A1)'
    }
  }, hover != null ? slices[hover].key : 'Total'), React.createElement('div', {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--hz-text-primary, #1E252E)',
      marginTop: 2
    }
  }, hover != null ? valueFormatter(slices[hover].value) : centerValue))), showLegend && React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: legendPosition === 'bottom' ? 'row' : 'column',
      flexWrap: 'wrap',
      gap: legendPosition === 'bottom' ? 16 : 10
    }
  }, slices.map((s, i) => React.createElement('div', {
    key: s.key + i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13,
      color: 'var(--hz-text-secondary, #505D6E)',
      opacity: hover == null || hover === i ? 1 : .5,
      cursor: 'default'
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      flex: 1,
      whiteSpace: 'nowrap'
    }
  }, s.key), React.createElement('span', {
    style: {
      fontWeight: 600,
      color: 'var(--hz-text-primary, #1E252E)',
      marginLeft: 8
    }
  }, valueFormatter(s.value)), React.createElement('span', {
    style: {
      color: 'var(--hz-text-tertiary, #8490A1)',
      width: 44,
      textAlign: 'right'
    }
  }, total ? (s.value / total * 100).toFixed(1) + '%' : '–')))), variant === 'pie' && hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: size / 2,
      top: -8
    }
  }, React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary,#505D6E)'
    }
  }, slices[hover].key + ' · '), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, valueFormatter(slices[hover].value))));
}
Object.assign(__ds_scope, { DonutChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/DonutChart/DonutChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/FunnelChart/FunnelChart.jsx
try { (() => {
/**
 * FunnelChart — Horizon Design System
 *   <FunnelChart data={[{name:'Visits',value:9000}, …]} index="name" category="value" />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzShade(hex, t) {
  const h = hex.replace('#', ''),
    n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  const m = v => Math.round(v + (255 - v) * t);
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}
function FunnelChart({
  data = [],
  index,
  category,
  colors,
  valueFormatter = v => String(v),
  variant = 'trapezoid',
  height = 320,
  gap = 6,
  showValues = true,
  showConversion = true,
  conversionMode = 'previous',
  color = 'blue',
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const labelW = 150,
    valueW = 96;
  const chartW = Math.max(0, width - labelW - valueW);
  const stages = data.map((r, i) => ({
    name: String(r[index]),
    value: Number(r[category]) || 0,
    color: colors ? hzColor(colors[i], i) : hzShade(hzColor(color, 0), i / Math.max(1, data.length - 1) * 0.55)
  }));
  const first = stages.length ? stages[0].value : 0;
  const max = Math.max(...stages.map(s => s.value), 1);
  const rowH = data.length ? (height - gap * (data.length - 1)) / data.length : 0;
  const widthOf = v => v / max * chartW;
  const shape = i => {
    const wTop = widthOf(stages[i].value);
    const wBot = variant === 'trapezoid' && i < stages.length - 1 ? widthOf(stages[i + 1].value) : wTop;
    const y = i * (rowH + gap),
      cx = chartW / 2;
    if (variant === 'bars') return `M${cx - wTop / 2},${y}h${wTop}v${rowH}h${-wTop}Z`;
    return `M${cx - wTop / 2},${y}L${cx + wTop / 2},${y}L${cx + wBot / 2},${y + rowH}L${cx - wBot / 2},${y + rowH}Z`;
  };
  return React.createElement('div', {
    ref,
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${labelW},0)`
  }, stages.map((s, i) => {
    const prev = i > 0 ? stages[i - 1].value : s.value;
    const conv = conversionMode === 'first' ? first ? s.value / first : 0 : prev ? s.value / prev : 0;
    const y = i * (rowH + gap);
    return React.createElement('g', {
      key: s.name + i,
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null)
    }, React.createElement('path', {
      d: shape(i),
      fill: s.color,
      opacity: hover == null || hover === i ? 1 : .45,
      style: {
        transition: 'opacity .15s'
      }
    }), React.createElement('text', {
      x: -labelW + 8,
      y: y + rowH / 2 - 2,
      ...{
        fontFamily: "var(--hz-font-sans, Inter, sans-serif)"
      },
      fontSize: 13,
      fontWeight: 600,
      fill: 'var(--hz-text-primary, #1E252E)'
    }, s.name), showConversion && React.createElement('text', {
      x: -labelW + 8,
      y: y + rowH / 2 + 15,
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      fontSize: 11,
      fill: 'var(--hz-text-tertiary, #8490A1)'
    }, (conv * 100).toFixed(1) + '%' + (i === 0 ? '' : conversionMode === 'first' ? ' of total' : ' of previous')), showValues && React.createElement('text', {
      x: chartW + 12,
      y: y + rowH / 2 + 4,
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      fontSize: 13,
      fontWeight: 600,
      fill: 'var(--hz-text-primary, #1E252E)'
    }, valueFormatter(s.value)), i > 0 && React.createElement('text', {
      x: chartW / 2,
      y: y - gap / 2 + 3,
      textAnchor: 'middle',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      fontSize: 10,
      fill: 'var(--hz-neutral-0, #fff)'
    }, ''));
  }))));
}
Object.assign(__ds_scope, { FunnelChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/FunnelChart/FunnelChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/GaugeChart/GaugeChart.jsx
try { (() => {
/**
 * GaugeChart — single value on an arc, with optional threshold bands. Horizon Design System.
 *   <GaugeChart value={72} min={0} max={100} label="SLA" />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzArcPath(cx, cy, r, a0, a1, thickness) {
  const ri = r - thickness;
  const p = (rad, a) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const [x0, y0] = p(r, a0),
    [x1, y1] = p(r, a1),
    [x2, y2] = p(ri, a1),
    [x3, y3] = p(ri, a0);
  return `M${x0},${y0}A${r},${r} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${ri},${ri} 0 ${large} 0 ${x3},${y3}Z`;
}
function GaugeChart({
  value = 0,
  min = 0,
  max = 100,
  color = 'blue',
  trackColor = '#EDF0F5',
  valueFormatter = v => String(v),
  label,
  size = 200,
  thickness = 18,
  sweep = 240,
  thresholds,
  showTicks = true,
  showValue = true,
  className = '',
  style = {}
}) {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  const start = Math.PI / 2 + (Math.PI * 2 - sweep * Math.PI / 180) / 2;
  const end = start + sweep * Math.PI / 180;
  const at = f => start + (end - start) * f;
  const cx = size / 2,
    cy = size / 2;
  const r = size / 2 - 4;
  const height = sweep >= 300 ? size : size * 0.78;
  const bands = thresholds && thresholds.length ? thresholds.map((b, i) => ({
    from: (b.from - min) / (max - min || 1),
    to: (b.to - min) / (max - min || 1),
    color: hzColor(b.color, i)
  })) : null;
  const activeColor = bands ? (bands.find(b => t >= b.from && t <= b.to) || bands[bands.length - 1]).color : hzColor(color, 0);
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: size,
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, React.createElement('svg', {
    width: size,
    height,
    viewBox: `0 0 ${size} ${height}`,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('path', {
    d: hzArcPath(cx, cy, r, start, end, thickness),
    fill: trackColor
  }), bands ? bands.map((b, i) => React.createElement('path', {
    key: i,
    d: hzArcPath(cx, cy, r, at(b.from), at(b.to), thickness),
    fill: b.color,
    opacity: .28
  })) : null, t > 0 && React.createElement('path', {
    d: hzArcPath(cx, cy, r, start, at(t), thickness),
    fill: activeColor
  }), showTicks && [0, .25, .5, .75, 1].map(f => {
    const a = at(f),
      ri = r - thickness - 6;
    return React.createElement('line', {
      key: f,
      x1: cx + ri * Math.cos(a),
      y1: cy + ri * Math.sin(a),
      x2: cx + (ri - 5) * Math.cos(a),
      y2: cy + (ri - 5) * Math.sin(a),
      stroke: 'var(--hz-border-default, #BAC3D1)'
    });
  }), React.createElement('circle', {
    cx: cx + (r - thickness / 2) * Math.cos(at(t)),
    cy: cy + (r - thickness / 2) * Math.sin(at(t)),
    r: thickness / 2 - 3,
    fill: 'var(--hz-surface-card, #fff)',
    stroke: activeColor,
    strokeWidth: 2.5
  })), showValue && React.createElement('div', {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: cy - 26,
      textAlign: 'center',
      pointerEvents: 'none'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: '-.02em',
      color: 'var(--hz-text-primary, #1E252E)'
    }
  }, valueFormatter(value)), label && React.createElement('div', {
    style: {
      fontSize: 11,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginTop: 4,
      fontWeight: 600
    }
  }, label)), React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginTop: -4,
      padding: '0 6px'
    }
  }, React.createElement('span', null, valueFormatter(min)), React.createElement('span', null, valueFormatter(max))));
}
Object.assign(__ds_scope, { GaugeChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/GaugeChart/GaugeChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/Heatmap/Heatmap.jsx
try { (() => {
/**
 * Heatmap — matrix of values as a color-scaled grid. Horizon Design System · MUI-inspired.
 *   <Heatmap data={[{x:'Mon', y:'09:00', value:12}, …]} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzRgb(hex) {
  const s = hex.replace('#', ''),
    n = parseInt(s.length === 3 ? s.split('').map(c => c + c).join('') : s, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function hzMix(from, to, t) {
  const a = hzRgb(from),
    b = hzRgb(to);
  return 'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',') + ')';
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  whiteSpace: 'nowrap'
};
function Heatmap({
  data = [],
  xLabels,
  yLabels,
  color = 'blue',
  emptyColor = '#F9FAFC',
  valueFormatter = v => String(v),
  cellHeight = 34,
  cellGap = 3,
  cellRadius = 4,
  minValue,
  maxValue,
  showValues = false,
  showLegend = true,
  yAxisWidth = 72,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const xs = xLabels || Array.from(new Set(data.map(d => String(d.x))));
  const ys = yLabels || Array.from(new Set(data.map(d => String(d.y))));
  const lookup = new Map(data.map(d => [String(d.x) + '\u0000' + String(d.y), Number(d.value)]));
  const vals = data.map(d => Number(d.value)).filter(isFinite);
  const lo = minValue != null ? minValue : Math.min(...vals, 0);
  const hi = maxValue != null ? maxValue : Math.max(...vals, 1);
  const base = hzColor(color, 0);
  const shadeOf = v => v == null || !isFinite(v) ? emptyColor : hzMix(emptyColor, base, 0.08 + 0.92 * Math.max(0, Math.min(1, (v - lo) / (hi - lo || 1))));
  const gridW = Math.max(0, width - yAxisWidth);
  const cellW = xs.length ? (gridW - cellGap * (xs.length - 1)) / xs.length : 0;
  const height = ys.length * cellHeight + (ys.length - 1) * cellGap + 22;
  return React.createElement('div', {
    ref,
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${yAxisWidth},0)`
  }, xs.map((x, xi) => React.createElement('text', {
    key: 'x' + x,
    x: xi * (cellW + cellGap) + cellW / 2,
    y: 12,
    textAnchor: 'middle',
    ...HZ_AXIS
  }, x)), ys.map((y, yi) => React.createElement('text', {
    key: 'y' + y,
    x: -10,
    y: 22 + yi * (cellHeight + cellGap) + cellHeight / 2 + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, y)), ys.map((y, yi) => xs.map((x, xi) => {
    const v = lookup.get(x + '\u0000' + y);
    const on = hover && hover.x === x && hover.y === y;
    const cx = xi * (cellW + cellGap),
      cy = 22 + yi * (cellHeight + cellGap);
    const dark = v != null && isFinite(v) && (v - lo) / (hi - lo || 1) > 0.55;
    return React.createElement('g', {
      key: x + y,
      onMouseEnter: () => setHover({
        x,
        y,
        v,
        cx,
        cy
      }),
      onMouseLeave: () => setHover(null)
    }, React.createElement('rect', {
      x: cx,
      y: cy,
      width: Math.max(1, cellW),
      height: cellHeight,
      rx: cellRadius,
      fill: shadeOf(v),
      stroke: on ? 'var(--hz-text-primary, #1E252E)' : 'none',
      strokeWidth: on ? 1.5 : 0
    }), showValues && v != null && isFinite(v) && React.createElement('text', {
      x: cx + cellW / 2,
      y: cy + cellHeight / 2 + 4,
      textAnchor: 'middle',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      fontSize: 11,
      fontWeight: 600,
      fill: dark ? 'var(--hz-neutral-0, #fff)' : 'var(--hz-text-secondary, #505D6E)'
    }, valueFormatter(v)));
  })))), showLegend && React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 14,
      paddingLeft: yAxisWidth
    }
  }, React.createElement('span', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)'
    }
  }, valueFormatter(lo)), React.createElement('div', {
    style: {
      flex: 'none',
      width: 140,
      height: 8,
      borderRadius: 999,
      background: `linear-gradient(90deg, ${shadeOf(lo)}, ${base})`
    }
  }), React.createElement('span', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)'
    }
  }, valueFormatter(hi))), hover && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(yAxisWidth + hover.cx + 12, Math.max(width - 150, 0)),
      top: hover.cy - 8
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 4
    }
  }, hover.x + ' · ' + hover.y), React.createElement('div', {
    style: {
      fontWeight: 600
    }
  }, hover.v == null || !isFinite(hover.v) ? 'No data' : valueFormatter(hover.v))));
}
Object.assign(__ds_scope, { Heatmap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/Heatmap/Heatmap.jsx", error: String((e && e.message) || e) }); }

// components/charts/LineChart/LineChart.jsx
try { (() => {
/**
 * LineChart — Horizon Design System
 *   <LineChart data={rows} index="date" categories={['Revenue','Cost']} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzTicks(min, max, n) {
  if (!isFinite(min) || !isFinite(max)) return [0, 1];
  if (min === max) {
    max = min + 1;
  }
  const step0 = (max - min) / n,
    mag = Math.pow(10, Math.floor(Math.log10(step0))),
    norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  minWidth: 120
};
function hzSmoothPath(pts) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}
function LineChart({
  data = [],
  index,
  categories = [],
  colors,
  valueFormatter = v => String(v),
  height = 288,
  curve = 'smooth',
  strokeWidth = 2,
  showDots = false,
  dashed = [],
  showLegend = true,
  showGridLines = true,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 56,
  minValue,
  maxValue,
  startEndOnly = false,
  connectNulls = true,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const pad = {
    t: 10,
    r: 12,
    b: showXAxis ? 26 : 8,
    l: showYAxis ? yAxisWidth : 8
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  const series = categories.map((c, i) => ({
    key: c,
    color: hzColor(colors && colors[i], i),
    dash: dashed.indexOf(c) > -1
  }));
  const nums = data.flatMap(r => categories.map(c => Number(r[c])).filter(v => isFinite(v)));
  const lo = minValue != null ? minValue : Math.min(...nums, 0);
  const hi = maxValue != null ? maxValue : Math.max(...nums, 0);
  const tk = hzTicks(lo, hi, 4),
    y0 = tk[0],
    y1 = tk[tk.length - 1];
  const yS = v => h - (v - y0) / (y1 - y0 || 1) * h;
  const xS = i => data.length <= 1 ? w / 2 : i / (data.length - 1) * w;
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    if (!data.length) return;
    const x = e.clientX - r.left - pad.l;
    setHover(Math.max(0, Math.min(data.length - 1, Math.round(x / (w || 1) * (data.length - 1)))));
  };
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLegend && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 10,
      paddingLeft: pad.l
    }
  }, series.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 14,
      height: 2,
      borderRadius: 2,
      background: s.dash ? `repeating-linear-gradient(90deg,${s.color} 0 4px,transparent 4px 7px)` : s.color
    }
  }), s.key))), React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    onMouseMove: onMove,
    onMouseLeave: () => setHover(null),
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, showGridLines && tk.map(t => React.createElement('line', {
    key: t,
    x1: 0,
    x2: w,
    y1: yS(t),
    y2: yS(t),
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: t === 0 ? '' : '3 3'
  })), showYAxis && tk.map(t => React.createElement('text', {
    key: t,
    x: -10,
    y: yS(t) + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, valueFormatter(t))), showXAxis && data.map((row, i) => startEndOnly && i !== 0 && i !== data.length - 1 ? null : React.createElement('text', {
    key: i,
    x: xS(i),
    y: h + 18,
    textAnchor: i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle',
    ...HZ_AXIS
  }, String(row[index]))), series.map(s => {
    const pts = data.map((r, i) => [xS(i), Number(r[s.key])]).filter(p => isFinite(p[1]) || !connectNulls).map(p => [p[0], yS(p[1])]);
    return React.createElement('g', {
      key: s.key
    }, React.createElement('path', {
      d: curve === 'smooth' ? hzSmoothPath(pts) : 'M' + pts.map(p => p.join(',')).join('L'),
      fill: 'none',
      stroke: s.color,
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeDasharray: s.dash ? '5 4' : ''
    }), showDots && pts.map((p, i) => React.createElement('circle', {
      key: i,
      cx: p[0],
      cy: p[1],
      r: 3,
      fill: 'var(--hz-surface-card,#fff)',
      stroke: s.color,
      strokeWidth: 2
    })));
  }), hover != null && React.createElement('g', null, React.createElement('line', {
    x1: xS(hover),
    x2: xS(hover),
    y1: 0,
    y2: h,
    stroke: 'var(--hz-border-default, #BAC3D1)'
  }), series.map(s => isFinite(Number(data[hover][s.key])) && React.createElement('circle', {
    key: s.key,
    cx: xS(hover),
    cy: yS(Number(data[hover][s.key])),
    r: 4,
    fill: 'var(--hz-surface-card,#fff)',
    stroke: s.color,
    strokeWidth: 2
  }))))), hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(Math.max(pad.l + xS(hover) + 12, 0), Math.max(width - 150, 0)),
      top: pad.t + 4
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 6
    }
  }, String(data[hover][index])), series.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary, #505D6E)',
      flex: 1
    }
  }, s.key), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, valueFormatter(Number(data[hover][s.key]) || 0)))))));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/LineChart/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/MicroCharts/BarList.jsx
try { (() => {
/**
 * BarList — ranked horizontal bars with inline labels. Horizon Design System.
 *   <BarList data={[{name:'/home', value:843}, …]} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function BarList({
  data = [],
  valueFormatter = v => String(v),
  color = 'blue',
  colors,
  sortOrder = 'descending',
  maxValue,
  barHeight = 32,
  gap = 8,
  showValues = true,
  className = '',
  style = {}
}) {
  const rows = React.useMemo(() => {
    const r = data.map((d, i) => ({
      ...d,
      __i: i
    }));
    if (sortOrder === 'descending') r.sort((a, b) => b.value - a.value);
    if (sortOrder === 'ascending') r.sort((a, b) => a.value - b.value);
    return r;
  }, [JSON.stringify(data), sortOrder]);
  const max = maxValue != null ? maxValue : Math.max(...rows.map(r => Number(r.value) || 0), 1);
  return React.createElement('div', {
    className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap,
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, rows.map((r, i) => {
    const c = hzColor(r.color || colors && colors[i] || color, i);
    const pct = (Number(r.value) || 0) / max * 100;
    return React.createElement('div', {
      key: String(r.name) + i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, React.createElement('div', {
      style: {
        position: 'relative',
        flex: 1,
        height: barHeight,
        borderRadius: 'var(--hz-radius-md, 6px)',
        background: 'var(--hz-neutral-100, #EDF0F5)',
        overflow: 'hidden'
      }
    }, React.createElement('div', {
      style: {
        position: 'absolute',
        inset: '0 auto 0 0',
        width: pct + '%',
        background: c,
        opacity: .22,
        transition: 'width .3s ease'
      }
    }), React.createElement('div', {
      style: {
        position: 'absolute',
        inset: '0 auto 0 0',
        width: 3,
        background: c
      }
    }), React.createElement('div', {
      style: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        fontSize: 13,
        color: 'var(--hz-text-primary, #1E252E)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, r.href ? React.createElement('a', {
      href: r.href,
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, r.name) : r.name)), showValues && React.createElement('div', {
      style: {
        width: 72,
        textAlign: 'right',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--hz-text-primary, #1E252E)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, valueFormatter(Number(r.value) || 0)));
  }));
}
Object.assign(__ds_scope, { BarList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/MicroCharts/BarList.jsx", error: String((e && e.message) || e) }); }

// components/charts/MicroCharts/CategoryBar.jsx
try { (() => {
/**
 * CategoryBar — segmented proportion bar with an optional marker. Horizon Design System.
 *   <CategoryBar values={[40, 30, 20, 10]} colors={['green','yellow','orange','red']} marker={62} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function CategoryBar({
  values = [],
  colors,
  labels,
  marker,
  markerLabel,
  valueFormatter = v => String(v),
  barHeight = 10,
  showLabels = true,
  className = '',
  style = {}
}) {
  const total = values.reduce((a, b) => a + (Number(b) || 0), 0) || 1;
  let acc = 0;
  const segs = values.map((v, i) => {
    const from = acc;
    acc += Number(v) || 0;
    return {
      v: Number(v) || 0,
      from,
      color: hzColor(colors && colors[i], i)
    };
  });
  const markerPct = marker != null ? Math.max(0, Math.min(100, marker / total * 100)) : null;
  return React.createElement('div', {
    className,
    style: {
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLabels && React.createElement('div', {
    style: {
      display: 'flex',
      marginBottom: 6
    }
  }, segs.map((s, i) => React.createElement('div', {
    key: i,
    style: {
      width: s.v / total * 100 + '%',
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }
  }, labels && labels[i] || valueFormatter(s.v)))), React.createElement('div', {
    style: {
      position: 'relative'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 2,
      height: barHeight
    }
  }, segs.map((s, i) => React.createElement('div', {
    key: i,
    style: {
      width: s.v / total * 100 + '%',
      background: s.color,
      borderRadius: 'var(--hz-radius-full, 9999px)'
    }
  }))), markerPct != null && React.createElement('div', {
    style: {
      position: 'absolute',
      top: -4,
      left: `calc(${markerPct}% - 2px)`,
      width: 4,
      height: barHeight + 8,
      borderRadius: 2,
      background: 'var(--hz-text-primary, #1E252E)',
      boxShadow: '0 0 0 2px var(--hz-surface-card, #fff)'
    }
  }), markerPct != null && markerLabel && React.createElement('div', {
    style: {
      position: 'absolute',
      top: barHeight + 10,
      left: markerPct + '%',
      transform: 'translateX(-50%)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--hz-text-primary, #1E252E)',
      whiteSpace: 'nowrap'
    }
  }, markerLabel)));
}
Object.assign(__ds_scope, { CategoryBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/MicroCharts/CategoryBar.jsx", error: String((e && e.message) || e) }); }

// components/charts/MicroCharts/SparkChart.jsx
try { (() => {
/**
 * SparkChart — axis-free micro chart for KPI cards. Horizon Design System.
 *   <SparkChart data={rows} index="date" categories={['Revenue']} type="area" />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzSmoothPath(pts) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}
function SparkChart({
  data = [],
  index,
  categories = [],
  colors,
  type = 'area',
  height = 56,
  curve = 'smooth',
  strokeWidth = 2,
  showLastDot = false,
  fill = 'gradient',
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const uid = React.useMemo(() => 'hzsp' + Math.random().toString(36).slice(2, 8), []);
  const pad = 3;
  const w = Math.max(0, width - pad * 2),
    h = Math.max(0, height - pad * 2);
  const series = categories.map((c, i) => ({
    key: c,
    color: hzColor(colors && colors[i], i)
  }));
  const nums = data.flatMap(r => categories.map(c => Number(r[c]) || 0));
  const lo = Math.min(...nums, 0),
    hi = Math.max(...nums, 0);
  const yS = v => h - (v - lo) / (hi - lo || 1) * h;
  const xS = i => data.length <= 1 ? w / 2 : i / (data.length - 1) * w;
  return React.createElement('div', {
    ref,
    className,
    style: {
      width: '100%',
      height,
      ...style
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('defs', null, series.map(s => React.createElement('linearGradient', {
    key: s.key,
    id: `${uid}-${s.key.replace(/\W/g, '')}`,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 1
  }, React.createElement('stop', {
    offset: '0%',
    stopColor: s.color,
    stopOpacity: .32
  }), React.createElement('stop', {
    offset: '100%',
    stopColor: s.color,
    stopOpacity: .02
  })))), React.createElement('g', {
    transform: `translate(${pad},${pad})`
  }, type === 'bar' ? series.map((s, si) => data.map((r, i) => {
    const bw = Math.max(1, w / Math.max(1, data.length) / series.length - 2);
    const v = Number(r[s.key]) || 0,
      top = yS(v);
    return React.createElement('rect', {
      key: s.key + i,
      x: w / data.length * i + si * (bw + 1),
      y: Math.min(top, h - 1),
      width: bw,
      height: Math.max(1, h - top),
      rx: 2,
      fill: s.color
    });
  })) : series.map(s => {
    const pts = data.map((r, i) => [xS(i), yS(Number(r[s.key]) || 0)]);
    const line = curve === 'smooth' ? hzSmoothPath(pts) : 'M' + pts.map(p => p.join(',')).join('L');
    return React.createElement('g', {
      key: s.key
    }, type === 'area' && fill !== 'none' && React.createElement('path', {
      d: `${line}L${w},${h}L0,${h}Z`,
      fill: fill === 'gradient' ? `url(#${uid}-${s.key.replace(/\W/g, '')})` : s.color,
      fillOpacity: fill === 'gradient' ? 1 : .18
    }), React.createElement('path', {
      d: line,
      fill: 'none',
      stroke: s.color,
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }), showLastDot && pts.length > 0 && React.createElement('circle', {
      cx: pts[pts.length - 1][0],
      cy: pts[pts.length - 1][1],
      r: 3,
      fill: s.color
    }));
  }))));
}
Object.assign(__ds_scope, { SparkChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/MicroCharts/SparkChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/MicroCharts/Tracker.jsx
try { (() => {
/**
 * Tracker — a row of status blocks (uptime, streaks, SLA days). Horizon Design System.
 *   <Tracker data={[{ color:'green', tooltip:'Operational' }, …]} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function Tracker({
  data = [],
  blockHeight = 34,
  gap = 2,
  radius = 3,
  startLabel,
  endLabel,
  className = '',
  style = {}
}) {
  const [hover, setHover] = React.useState(null);
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap,
      alignItems: 'stretch'
    }
  }, data.map((d, i) => React.createElement('div', {
    key: i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    style: {
      flex: 1,
      height: blockHeight,
      borderRadius: radius,
      background: hzColor(d.color, 0),
      opacity: hover == null || hover === i ? 1 : .55,
      transition: 'opacity .12s',
      cursor: 'default'
    }
  }))), (startLabel || endLabel) && React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)'
    }
  }, React.createElement('span', null, startLabel || ''), React.createElement('span', null, endLabel || '')), hover != null && data[hover].tooltip && React.createElement('div', {
    style: {
      position: 'absolute',
      left: `calc(${(hover + 0.5) / Math.max(1, data.length) * 100}% )`,
      transform: 'translateX(-50%)',
      top: blockHeight + 10,
      background: 'var(--hz-neutral-950, #1E252E)',
      color: '#fff',
      fontSize: 11,
      padding: '5px 8px',
      borderRadius: 6,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: 5
    }
  }, data[hover].tooltip));
}
Object.assign(__ds_scope, { Tracker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/MicroCharts/Tracker.jsx", error: String((e && e.message) || e) }); }

// components/charts/RadarChart/RadarChart.jsx
try { (() => {
/**
 * RadarChart — multi-axis comparison polygons. Horizon Design System · MUI-inspired.
 *   <RadarChart data={rows} index="metric" categories={['Now','Target']} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  minWidth: 120
};
function RadarChart({
  data = [],
  index,
  categories = [],
  colors,
  valueFormatter = v => String(v),
  height = 340,
  maxValue,
  rings = 4,
  shape = 'polygon',
  fillOpacity = 0.18,
  showLegend = true,
  showDots = true,
  labelOffset = 18,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const series = categories.map((c, i) => ({
    key: c,
    color: hzColor(colors && colors[i], i)
  }));
  const cx = width / 2,
    cy = height / 2;
  const r = Math.max(0, Math.min(width, height) / 2 - 46);
  const n = data.length;
  const max = maxValue != null ? maxValue : Math.max(1, ...data.flatMap(row => categories.map(c => Number(row[c]) || 0)));
  const ang = i => -Math.PI / 2 + i / Math.max(1, n) * Math.PI * 2;
  const pt = (i, v) => [cx + v / max * r * Math.cos(ang(i)), cy + v / max * r * Math.sin(ang(i))];
  const ringPath = f => shape === 'circle' ? null : 'M' + data.map((_, i) => pt(i, max * f).join(',')).join('L') + 'Z';
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLegend && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 6
    }
  }, series.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color
    }
  }), s.key))), React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, Array.from({
    length: rings
  }, (_, k) => {
    const f = (k + 1) / rings;
    return shape === 'circle' ? React.createElement('circle', {
      key: k,
      cx,
      cy,
      r: r * f,
      fill: 'none',
      stroke: 'var(--hz-border-subtle, #D5DBE5)',
      strokeDasharray: k === rings - 1 ? '' : '3 3'
    }) : React.createElement('path', {
      key: k,
      d: ringPath(f),
      fill: 'none',
      stroke: 'var(--hz-border-subtle, #D5DBE5)',
      strokeDasharray: k === rings - 1 ? '' : '3 3'
    });
  }), data.map((row, i) => React.createElement('line', {
    key: 'sp' + i,
    x1: cx,
    y1: cy,
    x2: pt(i, max)[0],
    y2: pt(i, max)[1],
    stroke: 'var(--hz-border-subtle, #D5DBE5)'
  })), data.map((row, i) => {
    const [lx, ly] = pt(i, max);
    const dx = lx - cx,
      dy = ly - cy,
      len = Math.hypot(dx, dy) || 1;
    return React.createElement('text', {
      key: 'lb' + i,
      x: lx + dx / len * labelOffset,
      y: ly + dy / len * labelOffset + 4,
      textAnchor: Math.abs(dx) < 4 ? 'middle' : dx > 0 ? 'start' : 'end',
      ...HZ_AXIS,
      fill: hover === i ? 'var(--hz-text-primary, #1E252E)' : HZ_AXIS.fill,
      fontWeight: hover === i ? 600 : 400
    }, String(row[index]));
  }), series.map(s => {
    const pts = data.map((row, i) => pt(i, Number(row[s.key]) || 0));
    const d = 'M' + pts.map(p => p.join(',')).join('L') + 'Z';
    return React.createElement('g', {
      key: s.key
    }, React.createElement('path', {
      d,
      fill: s.color,
      fillOpacity,
      stroke: s.color,
      strokeWidth: 2,
      strokeLinejoin: 'round'
    }), showDots && pts.map((p, i) => React.createElement('circle', {
      key: i,
      cx: p[0],
      cy: p[1],
      r: 3.5,
      fill: 'var(--hz-surface-card, #fff)',
      stroke: s.color,
      strokeWidth: 2
    })));
  }), data.map((row, i) => React.createElement('circle', {
    key: 'hit' + i,
    cx: pt(i, max)[0],
    cy: pt(i, max)[1],
    r: 22,
    fill: 'transparent',
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null)
  }))), hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(Math.max(pt(hover, max)[0] + 16, 0), Math.max(width - 150, 0)),
      top: Math.max(pt(hover, max)[1] - 10, 0)
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 6
    }
  }, String(data[hover][index])), series.map(s => React.createElement('div', {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary, #505D6E)',
      flex: 1
    }
  }, s.key), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, valueFormatter(Number(data[hover][s.key]) || 0)))))));
}
Object.assign(__ds_scope, { RadarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/RadarChart/RadarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/RangeBarChart/RangeBarChart.jsx
try { (() => {
/**
 * RangeBarChart — floating bars between a low and a high value (ranges, gantt, min/max spreads).
 * Horizon Design System · MUI-inspired API.
 *
 *   <RangeBarChart data={rows} index="month" series={[{name:'Temp', low:'min', high:'max'}]} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzTicks(min, max, n) {
  if (min === max) {
    max = min + 1;
  }
  const step0 = (max - min) / n,
    mag = Math.pow(10, Math.floor(Math.log10(step0))),
    norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  minWidth: 140
};
function RangeBarChart({
  data = [],
  index,
  series = [],
  valueFormatter = v => String(v),
  height = 300,
  layout = 'horizontal',
  barRadius = 999,
  barThickness,
  showLegend = true,
  showGridLines = true,
  showEndCaps = false,
  labelWidth,
  minValue,
  maxValue,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const horizontal = layout === 'horizontal';
  const rows = series.map((s, i) => ({
    ...s,
    color: hzColor(s.color, i)
  }));
  const gutter = labelWidth != null ? labelWidth : horizontal ? 104 : 56;
  const pad = {
    t: 10,
    r: 18,
    b: 26,
    l: gutter
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  const all = data.flatMap(r => rows.flatMap(s => [Number(r[s.low]), Number(r[s.high])])).filter(isFinite);
  const tk = hzTicks(minValue != null ? minValue : Math.min(...all), maxValue != null ? maxValue : Math.max(...all), 5);
  const v0 = tk[0],
    v1 = tk[tk.length - 1];
  const pos = v => (v - v0) / (v1 - v0 || 1) * (horizontal ? w : h);
  const band = (horizontal ? h : w) / Math.max(1, data.length);
  const thick = barThickness != null ? barThickness : Math.min(horizontal ? band * .5 : band * .42, 22);
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLegend && rows.length > 0 && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 10,
      paddingLeft: pad.l
    }
  }, rows.map(s => React.createElement('div', {
    key: s.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 16,
      height: 8,
      borderRadius: 999,
      background: s.color
    }
  }), s.name))), React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, tk.map(t => horizontal ? React.createElement('g', {
    key: t
  }, showGridLines && React.createElement('line', {
    x1: pos(t),
    x2: pos(t),
    y1: 0,
    y2: h,
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: '3 3'
  }), React.createElement('text', {
    x: pos(t),
    y: h + 18,
    textAnchor: 'middle',
    ...HZ_AXIS
  }, valueFormatter(t))) : React.createElement('g', {
    key: t
  }, showGridLines && React.createElement('line', {
    x1: 0,
    x2: w,
    y1: h - pos(t),
    y2: h - pos(t),
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: '3 3'
  }), React.createElement('text', {
    x: -10,
    y: h - pos(t) + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, valueFormatter(t)))), data.map((row, i) => React.createElement('g', {
    key: i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null)
  }, horizontal ? React.createElement('text', {
    x: -12,
    y: i * band + band / 2 + 4,
    textAnchor: 'end',
    ...HZ_AXIS,
    fill: 'var(--hz-text-secondary, #505D6E)'
  }, String(row[index])) : React.createElement('text', {
    x: i * band + band / 2,
    y: h + 18,
    textAnchor: 'middle',
    ...HZ_AXIS,
    fill: 'var(--hz-text-secondary, #505D6E)'
  }, String(row[index])), React.createElement('rect', {
    x: horizontal ? 0 : i * band,
    y: horizontal ? i * band : 0,
    width: horizontal ? w : band,
    height: horizontal ? band : h,
    fill: hover === i ? 'var(--hz-neutral-100, #EDF0F5)' : 'transparent',
    opacity: .6
  }), rows.map((s, si) => {
    const lo = Number(row[s.low]),
      hi = Number(row[s.high]);
    if (!isFinite(lo) || !isFinite(hi)) return null;
    const off = (band - thick * rows.length - 4 * (rows.length - 1)) / 2 + si * (thick + 4);
    const a = pos(Math.min(lo, hi)),
      b = pos(Math.max(lo, hi));
    const len = Math.max(3, b - a);
    return React.createElement('g', {
      key: s.name
    }, horizontal ? React.createElement('rect', {
      x: a,
      y: i * band + off,
      width: len,
      height: thick,
      rx: Math.min(barRadius, thick / 2),
      fill: s.color,
      opacity: hover == null || hover === i ? .92 : .4
    }) : React.createElement('rect', {
      x: i * band + off,
      y: h - b,
      width: thick,
      height: len,
      rx: Math.min(barRadius, thick / 2),
      fill: s.color,
      opacity: hover == null || hover === i ? .92 : .4
    }), showEndCaps && [a, b].map((p, k) => horizontal ? React.createElement('circle', {
      key: k,
      cx: p,
      cy: i * band + off + thick / 2,
      r: 3,
      fill: 'var(--hz-surface-card, #fff)',
      stroke: s.color,
      strokeWidth: 2
    }) : React.createElement('circle', {
      key: k,
      cx: i * band + off + thick / 2,
      cy: h - p,
      r: 3,
      fill: 'var(--hz-surface-card, #fff)',
      stroke: s.color,
      strokeWidth: 2
    })));
  }))))), hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(horizontal ? pad.l + 28 : pad.l + hover * band + band / 2 + 12, Math.max(width - 180, 0)),
      top: horizontal ? Math.min(pad.t + hover * band, Math.max(height - 60, 0)) : pad.t + 4
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 6
    }
  }, String(data[hover][index])), rows.map(s => React.createElement('div', {
    key: s.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: s.color,
      flex: 'none'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--hz-text-secondary, #505D6E)',
      flex: 1
    }
  }, s.name), React.createElement('span', {
    style: {
      fontWeight: 600
    }
  }, valueFormatter(Number(data[hover][s.low])) + ' – ' + valueFormatter(Number(data[hover][s.high]))))))));
}
Object.assign(__ds_scope, { RangeBarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/RangeBarChart/RangeBarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/SankeyChart/SankeyChart.jsx
try { (() => {
/**
 * SankeyChart — flow diagram (nodes + weighted links). Horizon Design System · MUI-inspired API.
 *
 *   <SankeyChart links={[{source:'Ads', target:'Signup', value:120}, …]} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)'
};
function hzSankeyLayout(links, nodesIn, w, h, nodeWidth, nodePadding) {
  const map = new Map();
  const touch = id => {
    if (!map.has(id)) map.set(id, {
      id,
      in: [],
      out: [],
      depth: 0
    });
    return map.get(id);
  };
  (nodesIn || []).forEach(n => Object.assign(touch(n.id), n));
  links.forEach(l => {
    const s = touch(l.source),
      t = touch(l.target);
    s.out.push(l);
    t.in.push(l);
  });

  // longest-path depth
  const nodes = [...map.values()];
  for (let pass = 0; pass < nodes.length; pass++) {
    let moved = false;
    links.forEach(l => {
      const s = map.get(l.source),
        t = map.get(l.target);
      if (t.depth < s.depth + 1) {
        t.depth = s.depth + 1;
        moved = true;
      }
    });
    if (!moved) break;
  }
  const maxDepth = Math.max(...nodes.map(n => n.depth));
  // sinks pushed to last column
  nodes.forEach(n => {
    if (n.out.length === 0 && n.in.length) n.depth = maxDepth;
  });
  const cols = [];
  nodes.forEach(n => {
    (cols[n.depth] = cols[n.depth] || []).push(n);
  });
  nodes.forEach(n => {
    n.value = Math.max(n.in.reduce((a, l) => a + l.value, 0), n.out.reduce((a, l) => a + l.value, 0));
  });
  const colTotals = cols.map(c => c.reduce((a, n) => a + n.value, 0));
  const maxTotal = Math.max(...colTotals);
  const tallest = cols[colTotals.indexOf(maxTotal)] || [];
  const scale = (h - nodePadding * Math.max(0, tallest.length - 1)) / (maxTotal || 1);
  const colX = d => cols.length <= 1 ? 0 : d / (cols.length - 1) * (w - nodeWidth);
  cols.forEach((col, d) => {
    const total = col.reduce((a, n) => a + n.value * scale, 0) + nodePadding * (col.length - 1);
    let y = (h - total) / 2;
    col.forEach((n, i) => {
      n.x = colX(d);
      n.h = Math.max(2, n.value * scale);
      n.y = y;
      n.idx = i;
      y += n.h + nodePadding;
    });
  });
  const laid = links.map((l, i) => ({
    ...l,
    i
  }));
  const off = new Map();
  const take = (id, key, v) => {
    const k = id + '|' + key;
    const cur = off.get(k) || 0;
    off.set(k, cur + v);
    return cur;
  };
  cols.forEach(col => col.forEach(n => {
    n.out.slice().sort((a, b) => map.get(a.target).y - map.get(b.target).y).forEach(l => {
      l.__so = take(n.id, 'out', l.value * scale);
    });
  }));
  cols.forEach(col => col.forEach(n => {
    n.in.slice().sort((a, b) => map.get(a.source).y - map.get(b.source).y).forEach(l => {
      l.__ti = take(n.id, 'in', l.value * scale);
    });
  }));
  return {
    nodes,
    cols,
    links: laid.map(l => {
      const s = map.get(l.source),
        t = map.get(l.target);
      const orig = links[l.i];
      return {
        ...l,
        sy: s.y + (orig.__so || 0),
        ty: t.y + (orig.__ti || 0),
        th: Math.max(1, l.value * scale),
        sx: s.x + nodeWidth,
        tx: t.x,
        s,
        t
      };
    })
  };
}
function SankeyChart({
  links = [],
  nodes: nodesIn,
  colors,
  valueFormatter = v => String(v),
  height = 360,
  nodeWidth = 14,
  nodePadding = 18,
  linkOpacity = 0.32,
  linkColorMode = 'source',
  showLabels = true,
  showValues = true,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const pad = {
    t: 10,
    r: 110,
    b: 10,
    l: 8
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  const layout = React.useMemo(() => w > 0 ? hzSankeyLayout(links.map(l => ({
    ...l
  })), nodesIn, w, h, nodeWidth, nodePadding) : null, [JSON.stringify(links), JSON.stringify(nodesIn), w, h, nodeWidth, nodePadding]);
  const colorOf = n => hzColor(n.color || colors && colors[layout.nodes.indexOf(n) % (colors.length || 1)], layout.nodes.indexOf(n));
  return React.createElement('div', {
    ref,
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, layout && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, layout.links.map((l, i) => {
    const x0 = l.sx,
      x1 = l.tx,
      cx = (x0 + x1) / 2;
    const c = linkColorMode === 'target' ? colorOf(l.t) : colorOf(l.s);
    const d = `M${x0},${l.sy}C${cx},${l.sy} ${cx},${l.ty} ${x1},${l.ty}` + `L${x1},${l.ty + l.th}C${cx},${l.ty + l.th} ${cx},${l.sy + l.th} ${x0},${l.sy + l.th}Z`;
    const on = hover && hover.type === 'link' && hover.i === i;
    const dim = hover && !(on || hover.type === 'node' && (hover.id === l.source || hover.id === l.target));
    return React.createElement('path', {
      key: i,
      d,
      fill: c,
      fillOpacity: dim ? .08 : on ? .6 : linkOpacity,
      style: {
        transition: 'fill-opacity .15s'
      },
      onMouseEnter: () => setHover({
        type: 'link',
        i,
        l
      }),
      onMouseLeave: () => setHover(null)
    });
  }), layout.nodes.map(n => React.createElement('g', {
    key: n.id,
    onMouseEnter: () => setHover({
      type: 'node',
      id: n.id,
      n
    }),
    onMouseLeave: () => setHover(null)
  }, React.createElement('rect', {
    x: n.x,
    y: n.y,
    width: nodeWidth,
    height: n.h,
    rx: 3,
    fill: colorOf(n),
    opacity: hover && hover.type === 'node' && hover.id !== n.id ? .45 : 1
  }), showLabels && React.createElement('text', {
    x: n.x + (n.out.length === 0 ? nodeWidth + 10 : n.in.length === 0 ? nodeWidth + 10 : nodeWidth + 10),
    y: n.y + n.h / 2 + 4,
    fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
    fontSize: 12,
    fontWeight: 600,
    fill: 'var(--hz-text-primary, #1E252E)'
  }, n.label || n.id), showLabels && showValues && React.createElement('text', {
    x: n.x + nodeWidth + 10,
    y: n.y + n.h / 2 + 18,
    fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
    fontSize: 11,
    fill: 'var(--hz-text-tertiary, #8490A1)'
  }, valueFormatter(n.value)))))), hover && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: 12,
      top: 8
    }
  }, hover.type === 'link' ? React.createElement('span', null, React.createElement('b', null, hover.l.source), ' → ', React.createElement('b', null, hover.l.target), React.createElement('span', {
    style: {
      color: 'var(--hz-text-tertiary,#8490A1)'
    }
  }, '  ' + valueFormatter(hover.l.value))) : React.createElement('span', null, React.createElement('b', null, hover.n.label || hover.n.id), React.createElement('span', {
    style: {
      color: 'var(--hz-text-tertiary,#8490A1)'
    }
  }, '  ' + valueFormatter(hover.n.value)))));
}
Object.assign(__ds_scope, { SankeyChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/SankeyChart/SankeyChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/ScatterChart/ScatterChart.jsx
try { (() => {
/**
 * ScatterChart — Horizon Design System (Tremor API + MUI-style bubble sizing)
 *   <ScatterChart data={rows} x="hours" y="score" size="deals" category="region" />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzTicks(min, max, n) {
  if (min === max) {
    max = min + 1;
  }
  const step0 = (max - min) / n,
    mag = Math.pow(10, Math.floor(Math.log10(step0))),
    norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)'
};
function ScatterChart({
  data = [],
  x,
  y,
  size,
  category,
  label,
  colors,
  valueFormatter = {},
  height = 320,
  dotSize = 6,
  sizeRange = [5, 18],
  xAxisLabel,
  yAxisLabel,
  showLegend = true,
  showGridLines = true,
  yAxisWidth = 56,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const fx = valueFormatter.x || (v => String(v));
  const fy = valueFormatter.y || (v => String(v));
  const fs = valueFormatter.size || (v => String(v));
  const pad = {
    t: 12,
    r: 16,
    b: xAxisLabel ? 46 : 30,
    l: yAxisWidth
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  const groups = category ? Array.from(new Set(data.map(r => r[category]))) : [];
  const colorOf = r => category ? hzColor(colors && colors[groups.indexOf(r[category])], groups.indexOf(r[category])) : hzColor(colors && colors[0], 0);
  const xs = data.map(r => Number(r[x])),
    ys = data.map(r => Number(r[y]));
  const xtk = hzTicks(Math.min(...xs), Math.max(...xs), 5),
    ytk = hzTicks(Math.min(...ys), Math.max(...ys), 4);
  const xS = v => (v - xtk[0]) / (xtk[xtk.length - 1] - xtk[0] || 1) * w;
  const yS = v => h - (v - ytk[0]) / (ytk[ytk.length - 1] - ytk[0] || 1) * h;
  const sVals = size ? data.map(r => Number(r[size]) || 0) : [];
  const sMin = size ? Math.min(...sVals) : 0,
    sMax = size ? Math.max(...sVals) : 1;
  const rOf = r => size ? sizeRange[0] + (Number(r[size]) - sMin) / (sMax - sMin || 1) * (sizeRange[1] - sizeRange[0]) : dotSize;
  const tipRows = (size ? [[x, fx], [y, fy], [size, fs]] : [[x, fx], [y, fy]]).map(pair => React.createElement('div', {
    key: pair[0],
    style: {
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, pair[0] + ': ', React.createElement('b', {
    style: {
      color: 'var(--hz-text-primary,#1E252E)'
    }
  }, pair[1](Number(hover != null ? data[hover][pair[0]] : 0)))));
  const tooltip = hover == null ? null : React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(pad.l + xS(Number(data[hover][x])) + 14, Math.max(width - 170, 0)),
      top: Math.max(pad.t + yS(Number(data[hover][y])) - 16, 0)
    }
  }, label ? React.createElement('div', {
    style: {
      fontWeight: 600,
      marginBottom: 4
    }
  }, String(data[hover][label])) : null, category ? React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 4
    }
  }, String(data[hover][category])) : null, tipRows);
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, showLegend && groups.length > 0 && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 10,
      paddingLeft: pad.l
    }
  }, groups.map((g, i) => React.createElement('div', {
    key: String(g),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--hz-text-secondary, #505D6E)'
    }
  }, React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: hzColor(colors && colors[i], i)
    }
  }), String(g)))), React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, showGridLines && ytk.map(t => React.createElement('line', {
    key: 'y' + t,
    x1: 0,
    x2: w,
    y1: yS(t),
    y2: yS(t),
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: '3 3'
  })), showGridLines && xtk.map(t => React.createElement('line', {
    key: 'x' + t,
    x1: xS(t),
    x2: xS(t),
    y1: 0,
    y2: h,
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: '3 3'
  })), ytk.map(t => React.createElement('text', {
    key: t,
    x: -10,
    y: yS(t) + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, fy(t))), xtk.map(t => React.createElement('text', {
    key: t,
    x: xS(t),
    y: h + 18,
    textAnchor: 'middle',
    ...HZ_AXIS
  }, fx(t))), xAxisLabel && React.createElement('text', {
    x: w / 2,
    y: h + 40,
    textAnchor: 'middle',
    ...HZ_AXIS,
    fill: 'var(--hz-text-secondary, #505D6E)'
  }, xAxisLabel), yAxisLabel && React.createElement('text', {
    x: 0,
    y: 0,
    transform: `translate(${-yAxisWidth + 12},${h / 2}) rotate(-90)`,
    textAnchor: 'middle',
    ...HZ_AXIS,
    fill: 'var(--hz-text-secondary, #505D6E)'
  }, yAxisLabel), data.map((r, i) => React.createElement('circle', {
    key: i,
    cx: xS(Number(r[x])),
    cy: yS(Number(r[y])),
    r: rOf(r),
    fill: colorOf(r),
    fillOpacity: hover === i ? .95 : .6,
    stroke: colorOf(r),
    strokeWidth: hover === i ? 2 : 1,
    style: {
      transition: 'fill-opacity .12s'
    },
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null)
  })))), tooltip));
}
Object.assign(__ds_scope, { ScatterChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/ScatterChart/ScatterChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/TreemapChart/TreemapChart.jsx
try { (() => {
/**
 * TreemapChart — nested rectangles sized by value (squarified layout). Horizon Design System.
 *   <TreemapChart data={[{name:'Enterprise', value:42100}, …]} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzSquarify(items, x, y, w, h) {
  const out = [];
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  let rest = items.slice(),
    rx = x,
    ry = y,
    rw = w,
    rh = h,
    remaining = total;
  while (rest.length) {
    const horizontal = rw >= rh;
    const side = horizontal ? rh : rw;
    let row = [],
      rowSum = 0,
      best = Infinity;
    for (let i = 0; i < rest.length; i++) {
      const trial = rowSum + rest[i].value;
      const thickness = trial / remaining * (horizontal ? rw : rh);
      const worst = Math.max(...row.concat([rest[i]]).map(it => {
        const len = it.value / trial * side;
        return Math.max(thickness / (len || 1), (len || 1) / thickness);
      }));
      if (worst > best && row.length) break;
      row.push(rest[i]);
      rowSum = trial;
      best = worst;
    }
    const thickness = rowSum / remaining * (horizontal ? rw : rh);
    let off = 0;
    row.forEach(it => {
      const len = it.value / (rowSum || 1) * side;
      out.push(horizontal ? {
        ...it,
        x: rx,
        y: ry + off,
        w: thickness,
        h: len
      } : {
        ...it,
        x: rx + off,
        y: ry,
        w: len,
        h: thickness
      });
      off += len;
    });
    if (horizontal) {
      rx += thickness;
      rw -= thickness;
    } else {
      ry += thickness;
      rh -= thickness;
    }
    remaining -= rowSum;
    rest = rest.slice(row.length);
  }
  return out;
}
function TreemapChart({
  data = [],
  colors,
  valueFormatter = v => String(v),
  height = 320,
  gap = 4,
  radius = 6,
  showValues = true,
  showShare = true,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const items = data.map((d, i) => ({
    name: String(d.name),
    value: Number(d.value) || 0,
    color: hzColor(d.color || colors && colors[i], i)
  })).sort((a, b) => b.value - a.value);
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  const tiles = width > 0 ? hzSquarify(items, 0, 0, width, height) : [];
  return React.createElement('div', {
    ref,
    className,
    style: {
      position: 'relative',
      width: '100%',
      height,
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, tiles.map((t, i) => React.createElement('div', {
    key: t.name + i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    style: {
      position: 'absolute',
      left: t.x,
      top: t.y,
      width: Math.max(0, t.w - gap),
      height: Math.max(0, t.h - gap),
      background: t.color,
      borderRadius: radius,
      padding: '10px 12px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      opacity: hover == null || hover === i ? 1 : .55,
      transition: 'opacity .15s',
      cursor: 'default'
    }
  }, React.createElement('div', {
    style: {
      fontSize: t.w > 130 && t.h > 60 ? 13 : 11,
      fontWeight: 600,
      color: '#fff',
      lineHeight: 1.25,
      textShadow: '0 1px 2px rgb(0 0 0/.15)'
    }
  }, t.name), showValues && t.h > 46 && React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'rgb(255 255 255/.88)',
      marginTop: 2
    }
  }, valueFormatter(t.value)), showShare && t.h > 70 && React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'rgb(255 255 255/.7)',
      marginTop: 1
    }
  }, (t.value / total * 100).toFixed(1) + '%'))));
}
Object.assign(__ds_scope, { TreemapChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/TreemapChart/TreemapChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/WaterfallChart/WaterfallChart.jsx
try { (() => {
/**
 * WaterfallChart — cumulative contributions, with connectors and total bars.
 * Horizon Design System.
 *   <WaterfallChart data={[{name:'Start', value:120, type:'total'}, {name:'New', value:34}, …]} />
 */

const HZ_C = {
  blue: '#006CEB',
  teal: '#2CA7E4',
  purple: '#7C48E4',
  green: '#159367',
  orange: '#E45A18',
  magenta: '#E437AE',
  yellow: '#FFBF00',
  red: '#D92222',
  neutral: '#8490A1'
};
const HZ_ORDER = ['blue', 'purple', 'teal', 'green', 'orange', 'magenta', 'yellow', 'red'];
function hzColor(c, i) {
  return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]];
}
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return w;
}
function hzTicks(min, max, n) {
  if (min === max) {
    max = min + 1;
  }
  const step0 = (max - min) / n,
    mag = Math.pow(10, Math.floor(Math.log10(step0))),
    norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = {
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 11,
  fill: 'var(--hz-neutral-500, #8490A1)'
};
const HZ_TIP = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 5,
  background: 'var(--hz-surface-card, #fff)',
  border: '1px solid var(--hz-border-subtle, #D5DBE5)',
  borderRadius: 'var(--hz-radius-lg, 8px)',
  boxShadow: 'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))',
  padding: '8px 10px',
  fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
  fontSize: 12,
  color: 'var(--hz-text-primary, #1E252E)',
  minWidth: 120
};
function WaterfallChart({
  data = [],
  valueFormatter = v => String(v),
  height = 300,
  increaseColor = 'green',
  decreaseColor = 'red',
  totalColor = 'blue',
  barRadius = 3,
  barGap = 0.34,
  showConnectors = true,
  showValues = true,
  showGridLines = true,
  yAxisWidth = 56,
  className = '',
  style = {}
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const pad = {
    t: showValues ? 22 : 10,
    r: 14,
    b: 28,
    l: yAxisWidth
  };
  const w = Math.max(0, width - pad.l - pad.r),
    h = Math.max(0, height - pad.t - pad.b);
  let running = 0;
  const bars = data.map(d => {
    const v = Number(d.value) || 0;
    const isTotal = d.type === 'total';
    const from = isTotal ? 0 : running;
    const to = isTotal ? v : running + v;
    running = to;
    return {
      name: String(d.name),
      value: v,
      from,
      to,
      isTotal,
      color: hzColor(d.color || (isTotal ? totalColor : v >= 0 ? increaseColor : decreaseColor), 0)
    };
  });
  const vals = bars.flatMap(b => [b.from, b.to]);
  const tk = hzTicks(Math.min(0, ...vals), Math.max(...vals, 0), 4);
  const y0 = tk[0],
    y1 = tk[tk.length - 1];
  const yS = v => h - (v - y0) / (y1 - y0 || 1) * h;
  const band = w / Math.max(1, bars.length);
  const bw = band * (1 - barGap);
  return React.createElement('div', {
    className,
    style: {
      position: 'relative',
      width: '100%',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      ...style
    }
  }, React.createElement('div', {
    ref,
    style: {
      position: 'relative',
      width: '100%',
      height
    }
  }, width > 0 && React.createElement('svg', {
    width: '100%',
    height,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement('g', {
    transform: `translate(${pad.l},${pad.t})`
  }, showGridLines && tk.map(t => React.createElement('line', {
    key: t,
    x1: 0,
    x2: w,
    y1: yS(t),
    y2: yS(t),
    stroke: 'var(--hz-border-subtle, #D5DBE5)',
    strokeDasharray: t === 0 ? '' : '3 3'
  })), tk.map(t => React.createElement('text', {
    key: t,
    x: -10,
    y: yS(t) + 4,
    textAnchor: 'end',
    ...HZ_AXIS
  }, valueFormatter(t))), bars.map((b, i) => React.createElement('text', {
    key: 'lb' + i,
    x: i * band + band / 2,
    y: h + 18,
    textAnchor: 'middle',
    ...HZ_AXIS
  }, b.name)), showConnectors && bars.slice(0, -1).map((b, i) => React.createElement('line', {
    key: 'cn' + i,
    x1: i * band + band / 2 + bw / 2,
    x2: (i + 1) * band + band / 2 - bw / 2,
    y1: yS(b.to),
    y2: yS(b.to),
    stroke: 'var(--hz-border-default, #BAC3D1)',
    strokeDasharray: '2 3'
  })), bars.map((b, i) => {
    const top = yS(Math.max(b.from, b.to)),
      len = Math.max(2, Math.abs(yS(b.to) - yS(b.from)));
    return React.createElement('g', {
      key: b.name + i,
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null)
    }, React.createElement('rect', {
      x: i * band + (band - bw) / 2,
      y: top,
      width: bw,
      height: len,
      rx: barRadius,
      fill: b.color,
      opacity: hover == null || hover === i ? 1 : .5
    }), showValues && React.createElement('text', {
      x: i * band + band / 2,
      y: top - 7,
      textAnchor: 'middle',
      fontFamily: "var(--hz-font-sans, Inter, sans-serif)",
      fontSize: 11,
      fontWeight: 600,
      fill: b.isTotal ? 'var(--hz-text-primary, #1E252E)' : b.color
    }, (b.isTotal || b.value < 0 ? '' : '+') + valueFormatter(b.value)));
  })))), hover != null && React.createElement('div', {
    style: {
      ...HZ_TIP,
      left: Math.min(pad.l + hover * band + band / 2 + 10, Math.max(width - 160, 0)),
      top: pad.t
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginBottom: 4
    }
  }, bars[hover].name), React.createElement('div', {
    style: {
      fontWeight: 600
    }
  }, (bars[hover].isTotal || bars[hover].value < 0 ? '' : '+') + valueFormatter(bars[hover].value)), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--hz-text-tertiary, #8490A1)',
      marginTop: 2
    }
  }, 'Running · ' + valueFormatter(bars[hover].to))));
}
Object.assign(__ds_scope, { WaterfallChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/WaterfallChart/WaterfallChart.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.MineMap = __ds_scope.MineMap;

__ds_ns.AreaChart = __ds_scope.AreaChart;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.ComboChart = __ds_scope.ComboChart;

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.FunnelChart = __ds_scope.FunnelChart;

__ds_ns.GaugeChart = __ds_scope.GaugeChart;

__ds_ns.Heatmap = __ds_scope.Heatmap;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.BarList = __ds_scope.BarList;

__ds_ns.CategoryBar = __ds_scope.CategoryBar;

__ds_ns.SparkChart = __ds_scope.SparkChart;

__ds_ns.Tracker = __ds_scope.Tracker;

__ds_ns.RadarChart = __ds_scope.RadarChart;

__ds_ns.RangeBarChart = __ds_scope.RangeBarChart;

__ds_ns.SankeyChart = __ds_scope.SankeyChart;

__ds_ns.ScatterChart = __ds_scope.ScatterChart;

__ds_ns.TreemapChart = __ds_scope.TreemapChart;

__ds_ns.WaterfallChart = __ds_scope.WaterfallChart;

})();
