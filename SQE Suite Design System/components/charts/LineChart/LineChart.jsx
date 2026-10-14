/**
 * LineChart — Horizon Design System
 *   <LineChart data={rows} index="date" categories={['Revenue','Cost']} />
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
function hzTicks(min, max, n) {
  if (!isFinite(min) || !isFinite(max)) return [0, 1];
  if (min === max) { max = min + 1; }
  const step0 = (max - min) / n, mag = Math.pow(10, Math.floor(Math.log10(step0))), norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = { fontFamily: "var(--hz-font-sans, Inter, sans-serif)", fontSize: 11, fill: 'var(--hz-neutral-500, #8490A1)' };
const HZ_TIP = {
  position:'absolute', pointerEvents:'none', zIndex:5, background:'var(--hz-surface-card, #fff)',
  border:'1px solid var(--hz-border-subtle, #D5DBE5)', borderRadius:'var(--hz-radius-lg, 8px)',
  boxShadow:'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))', padding:'8px 10px',
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)', minWidth:120,
};
function hzSmoothPath(pts) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function LineChart({
  data = [], index, categories = [], colors, valueFormatter = v => String(v),
  height = 288, curve = 'smooth', strokeWidth = 2, showDots = false, dashed = [],
  showLegend = true, showGridLines = true, showXAxis = true, showYAxis = true,
  yAxisWidth = 56, minValue, maxValue, startEndOnly = false, connectNulls = true,
  className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);

  const pad = { t: 10, r: 12, b: showXAxis ? 26 : 8, l: showYAxis ? yAxisWidth : 8 };
  const w = Math.max(0, width - pad.l - pad.r), h = Math.max(0, height - pad.t - pad.b);
  const series = categories.map((c, i) => ({ key:c, color:hzColor(colors && colors[i], i), dash:dashed.indexOf(c) > -1 }));

  const nums = data.flatMap(r => categories.map(c => Number(r[c])).filter(v => isFinite(v)));
  const lo = minValue != null ? minValue : Math.min(...nums, 0);
  const hi = maxValue != null ? maxValue : Math.max(...nums, 0);
  const tk = hzTicks(lo, hi, 4), y0 = tk[0], y1 = tk[tk.length - 1];
  const yS = v => h - ((v - y0) / (y1 - y0 || 1)) * h;
  const xS = i => (data.length <= 1 ? w / 2 : (i / (data.length - 1)) * w);

  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    if (!data.length) return;
    const x = e.clientX - r.left - pad.l;
    setHover(Math.max(0, Math.min(data.length - 1, Math.round((x / (w || 1)) * (data.length - 1)))));
  };

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    showLegend && React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:10, paddingLeft:pad.l } },
      series.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--hz-text-secondary, #505D6E)' } },
        React.createElement('span', { style:{ width:14, height:2, borderRadius:2, background:s.dash ? `repeating-linear-gradient(90deg,${s.color} 0 4px,transparent 4px 7px)` : s.color } }), s.key))),
    React.createElement('div', { ref, style:{ position:'relative', width:'100%', height } },
      width > 0 && React.createElement('svg', { width:'100%', height, onMouseMove:onMove, onMouseLeave:() => setHover(null), style:{ display:'block', overflow:'visible' } },
        React.createElement('g', { transform:`translate(${pad.l},${pad.t})` },
          showGridLines && tk.map(t => React.createElement('line', { key:t, x1:0, x2:w, y1:yS(t), y2:yS(t), stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:t === 0 ? '' : '3 3' })),
          showYAxis && tk.map(t => React.createElement('text', { key:t, x:-10, y:yS(t) + 4, textAnchor:'end', ...HZ_AXIS }, valueFormatter(t))),
          showXAxis && data.map((row, i) => (startEndOnly && i !== 0 && i !== data.length - 1) ? null :
            React.createElement('text', { key:i, x:xS(i), y:h + 18, textAnchor:i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle', ...HZ_AXIS }, String(row[index]))),
          series.map(s => {
            const pts = data.map((r, i) => [xS(i), Number(r[s.key])]).filter(p => isFinite(p[1]) || !connectNulls).map(p => [p[0], yS(p[1])]);
            return React.createElement('g', { key:s.key },
              React.createElement('path', { d: curve === 'smooth' ? hzSmoothPath(pts) : 'M' + pts.map(p => p.join(',')).join('L'),
                fill:'none', stroke:s.color, strokeWidth, strokeLinecap:'round', strokeLinejoin:'round', strokeDasharray:s.dash ? '5 4' : '' }),
              showDots && pts.map((p, i) => React.createElement('circle', { key:i, cx:p[0], cy:p[1], r:3, fill:'var(--hz-surface-card,#fff)', stroke:s.color, strokeWidth:2 })));
          }),
          hover != null && React.createElement('g', null,
            React.createElement('line', { x1:xS(hover), x2:xS(hover), y1:0, y2:h, stroke:'var(--hz-border-default, #BAC3D1)' }),
            series.map(s => isFinite(Number(data[hover][s.key])) && React.createElement('circle', { key:s.key, cx:xS(hover), cy:yS(Number(data[hover][s.key])), r:4, fill:'var(--hz-surface-card,#fff)', stroke:s.color, strokeWidth:2 }))))),
      hover != null && React.createElement('div', { style:{ ...HZ_TIP, left:Math.min(Math.max(pad.l + xS(hover) + 12, 0), Math.max(width - 150, 0)), top:pad.t + 4 } },
        React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:6 } }, String(data[hover][index])),
        series.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:8, marginTop:3 } },
          React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color, flex:'none' } }),
          React.createElement('span', { style:{ color:'var(--hz-text-secondary, #505D6E)', flex:1 } }, s.key),
          React.createElement('span', { style:{ fontWeight:600 } }, valueFormatter(Number(data[hover][s.key]) || 0)))))));
}
