/**
 * MineMap — site map view on ESRI basemaps (satellite / streets / topo)
 * Horizon Design System
 *
 * Renders site boundary, haul/vessel/rail routes, and asset markers
 * (stockpiles, vessels, ports, plant, equipment) over a real map.
 * Requires Leaflet loaded globally (see MineMap.d.ts) before mount.
 */

const HZ_MAP_C = { blue:'#006CEB', teal:'#2CA7E4', purple:'#7C48E4', green:'#159367', orange:'#E45A18', magenta:'#E437AE', yellow:'#FFBF00', red:'#D92222', neutral:'#8490A1' };
function hzMapColor(c) { return HZ_MAP_C[c] || c || HZ_MAP_C.neutral; }

const HZ_TILE_URLS = {
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  streets:   'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  topo:      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
};
const HZ_TILE_ATTR = 'Tiles &copy; Esri &mdash; Esri, Maxar, Earthstar Geographics';

const HZ_ROUTE_DEFAULT = { haul:'orange', vessel:'blue', rail:'purple', other:'neutral' };
const HZ_MARKER_DEFAULT = { stockpile:'orange', vessel:'blue', port:'teal', asset:'neutral', plant:'purple', other:'neutral' };
const HZ_MARKER_ICON = { stockpile:'fa-boxes', vessel:'fa-sailboat', port:'fa-anchor', asset:'fa-truck', plant:'fa-building', other:'fa-map-marker-alt' };

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
  style = {},
}) {
  const ref = React.useRef(null);
  const mapRef = React.useRef(null);
  const layersRef = React.useRef([]);
  const [ready, setReady] = React.useState(false);
  const [missingLeaflet, setMissingLeaflet] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || mapRef.current) return;
    if (!window.L) { setMissingLeaflet(true); return; }
    const map = window.L.map(ref.current, { zoomControl:false, attributionControl:true }).setView(center, zoom);
    window.L.control.zoom({ position:'bottomright' }).addTo(map);
    mapRef.current = map;
    setReady(true);
    return () => { map.remove(); mapRef.current = null; };
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

    const tile = window.L.tileLayer(HZ_TILE_URLS[basemap] || HZ_TILE_URLS.satellite, { attribution:HZ_TILE_ATTR, maxZoom:19 }).addTo(map);
    layersRef.current.push(tile);

    if (boundary && boundary.positions && boundary.positions.length) {
      const poly = window.L.polygon(boundary.positions, { color:hzMapColor(boundary.color || 'yellow'), weight:2, fillOpacity:.08, dashArray:'6 4' }).addTo(map);
      if (boundary.label) poly.bindTooltip(boundary.label, { className:'hz-map-tip' });
      layersRef.current.push(poly);
    }

    routes.forEach((r, i) => {
      const type = r.type || 'other';
      const line = window.L.polyline(r.positions, {
        color: hzMapColor(r.color || HZ_ROUTE_DEFAULT[type]),
        weight: type === 'vessel' ? 2.5 : 3.5,
        dashArray: r.dashed || type === 'vessel' ? '2 7' : null,
        opacity: .9, lineCap:'round',
      }).addTo(map);
      if (r.label) line.bindTooltip(r.label, { sticky:true, className:'hz-map-tip' });
      layersRef.current.push(line);
    });

    markers.forEach((m, i) => {
      const type = m.type || 'other';
      const color = hzMapColor(m.color || HZ_MARKER_DEFAULT[type]);
      const icon = window.L.divIcon({ className:'', html:hzMarkerHtml(m, color), iconSize:[0,0] });
      const mk = window.L.marker(m.position, { icon }).addTo(map);
      if (m.label) mk.bindTooltip(m.label + (m.value != null ? ' \u00b7 ' + m.value : ''), { direction:'top', offset:[0,-14], className:'hz-map-tip' });
      layersRef.current.push(mk);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, basemap, boundaryKey, routesKey, markersKey]);

  const legend = [];
  if (boundary) legend.push({ label:boundary.label || 'Site boundary', color:hzMapColor(boundary.color || 'yellow'), shape:'line' });
  const seenR = {}, seenM = {};
  routes.forEach(r => { const t = r.type || 'other'; if (!seenR[t]) { seenR[t] = 1; legend.push({ label:r.label || (t[0].toUpperCase() + t.slice(1) + ' route'), color:hzMapColor(r.color || HZ_ROUTE_DEFAULT[t]), shape:'line' }); } });
  markers.forEach(m => { const t = m.type || 'other'; if (!seenM[t]) { seenM[t] = 1; legend.push({ label:t[0].toUpperCase() + t.slice(1), color:hzMapColor(m.color || HZ_MARKER_DEFAULT[t]), shape:'dot' }); } });

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', height, borderRadius:14, overflow:'hidden', border:'1px solid var(--hz-border-subtle, #D5DBE5)', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", background:'#0b1220', ...style } },
    React.createElement('style', { dangerouslySetInnerHTML:{ __html:'.hz-map-tip{background:var(--hz-neutral-950,#12161f);color:#E7EBF2;border:none;border-radius:6px;font-size:12px;font-family:var(--hz-font-sans,Inter,sans-serif);padding:5px 9px;box-shadow:0 4px 12px rgba(0,0,0,.35)}.hz-map-tip::before{border-top-color:var(--hz-neutral-950,#12161f)!important}.leaflet-control-zoom a{color:#1E252E!important}' } }),
    React.createElement('div', { ref, style:{ position:'absolute', inset:0 } }),
    missingLeaflet && React.createElement('div', { style:{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#8490A1', fontSize:13, textAlign:'center', padding:24 } }, 'Leaflet not found \u2014 load leaflet.css/leaflet.js before mounting MineMap.'),
    showLegend && legend.length > 0 && React.createElement('div', { style:{ position:'absolute', top:12, left:12, background:'rgba(18,22,31,.82)', backdropFilter:'blur(6px)', borderRadius:10, padding:'10px 14px', display:'flex', flexDirection:'column', gap:7, zIndex:1000 } },
      legend.map(it => React.createElement('div', { key:it.label, style:{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#E7EBF2' } },
        it.shape === 'line'
          ? React.createElement('span', { style:{ width:16, height:2, background:it.color, flex:'none', borderRadius:1 } })
          : React.createElement('span', { style:{ width:9, height:9, borderRadius:999, background:it.color, flex:'none' } }),
        it.label)))
  );
}

export { MineMap };
