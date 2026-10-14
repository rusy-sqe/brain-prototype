/**
 * Heatmap — matrix of values as a color-scaled grid. Horizon Design System · MUI-inspired.
 *   <Heatmap data={[{x:'Mon', y:'09:00', value:12}, …]} />
 */

const HZ_C = { blue:'#006CEB', teal:'#2CA7E4', purple:'#7C48E4', green:'#159367', orange:'#E45A18', magenta:'#E437AE', yellow:'#FFBF00', red:'#D92222', neutral:'#8490A1' };
const HZ_ORDER = ['blue','purple','teal','green','orange','magenta','yellow','red'];
function hzColor(c, i) { return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]]; }
function hzUseWidth(ref) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(e => setW(e[0].contentRect.width));
    ro.observe(el); setW(el.clientWidth); return () => ro.disconnect();
  }, []);
  return w;
}
function hzRgb(hex) {
  const s = hex.replace('#', ''), n = parseInt(s.length === 3 ? s.split('').map(c => c + c).join('') : s, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function hzMix(from, to, t) {
  const a = hzRgb(from), b = hzRgb(to);
  return 'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',') + ')';
}
const HZ_AXIS = { fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:11, fill:'var(--hz-neutral-500, #8490A1)' };
const HZ_TIP = {
  position:'absolute', pointerEvents:'none', zIndex:5, background:'var(--hz-surface-card, #fff)',
  border:'1px solid var(--hz-border-subtle, #D5DBE5)', borderRadius:'var(--hz-radius-lg, 8px)',
  boxShadow:'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))', padding:'8px 10px',
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)', whiteSpace:'nowrap',
};

export function Heatmap({
  data = [], xLabels, yLabels, color = 'blue', emptyColor = '#F9FAFC',
  valueFormatter = v => String(v), cellHeight = 34, cellGap = 3, cellRadius = 4,
  minValue, maxValue, showValues = false, showLegend = true,
  yAxisWidth = 72, className = '', style = {},
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
  const shadeOf = v => v == null || !isFinite(v) ? emptyColor : hzMix(emptyColor, base, 0.08 + 0.92 * Math.max(0, Math.min(1, (v - lo) / ((hi - lo) || 1))));

  const gridW = Math.max(0, width - yAxisWidth);
  const cellW = xs.length ? (gridW - cellGap * (xs.length - 1)) / xs.length : 0;
  const height = ys.length * cellHeight + (ys.length - 1) * cellGap + 22;

  return React.createElement('div', { ref, className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
      React.createElement('g', { transform:`translate(${yAxisWidth},0)` },
        xs.map((x, xi) => React.createElement('text', { key:'x' + x, x:xi * (cellW + cellGap) + cellW / 2, y:12, textAnchor:'middle', ...HZ_AXIS }, x)),
        ys.map((y, yi) => React.createElement('text', { key:'y' + y, x:-10, y:22 + yi * (cellHeight + cellGap) + cellHeight / 2 + 4, textAnchor:'end', ...HZ_AXIS }, y)),
        ys.map((y, yi) => xs.map((x, xi) => {
          const v = lookup.get(x + '\u0000' + y);
          const on = hover && hover.x === x && hover.y === y;
          const cx = xi * (cellW + cellGap), cy = 22 + yi * (cellHeight + cellGap);
          const dark = v != null && isFinite(v) && (v - lo) / ((hi - lo) || 1) > 0.55;
          return React.createElement('g', { key:x + y,
            onMouseEnter:() => setHover({ x, y, v, cx, cy }), onMouseLeave:() => setHover(null) },
            React.createElement('rect', { x:cx, y:cy, width:Math.max(1, cellW), height:cellHeight, rx:cellRadius,
              fill:shadeOf(v), stroke:on ? 'var(--hz-text-primary, #1E252E)' : 'none', strokeWidth:on ? 1.5 : 0 }),
            showValues && v != null && isFinite(v) && React.createElement('text', { x:cx + cellW / 2, y:cy + cellHeight / 2 + 4, textAnchor:'middle',
              fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:11, fontWeight:600,
              fill:dark ? 'var(--hz-neutral-0, #fff)' : 'var(--hz-text-secondary, #505D6E)' }, valueFormatter(v)));
        })))),
    showLegend && React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginTop:14, paddingLeft:yAxisWidth } },
      React.createElement('span', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)' } }, valueFormatter(lo)),
      React.createElement('div', { style:{ flex:'none', width:140, height:8, borderRadius:999, background:`linear-gradient(90deg, ${shadeOf(lo)}, ${base})` } }),
      React.createElement('span', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)' } }, valueFormatter(hi))),
    hover && React.createElement('div', { style:{ ...HZ_TIP, left:Math.min(yAxisWidth + hover.cx + 12, Math.max(width - 150, 0)), top:hover.cy - 8 } },
      React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:4 } }, hover.x + ' · ' + hover.y),
      React.createElement('div', { style:{ fontWeight:600 } }, hover.v == null || !isFinite(hover.v) ? 'No data' : valueFormatter(hover.v))));
}
