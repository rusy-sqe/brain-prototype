/**
 * ComboChart — bars + lines on independent axes. Horizon Design System.
 *   <ComboChart data={rows} index="month" barCategories={['Volume']} lineCategories={['Margin']} />
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
  if (min === max) { max = min + 1; }
  const step0 = (max - min) / n, mag = Math.pow(10, Math.floor(Math.log10(step0))), norm = step0 / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
  return out;
}
const HZ_AXIS = { fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:11, fill:'var(--hz-neutral-500, #8490A1)' };
const HZ_TIP = {
  position:'absolute', pointerEvents:'none', zIndex:5, background:'var(--hz-surface-card, #fff)',
  border:'1px solid var(--hz-border-subtle, #D5DBE5)', borderRadius:'var(--hz-radius-lg, 8px)',
  boxShadow:'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))', padding:'8px 10px',
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)', minWidth:130,
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

export function ComboChart({
  data = [], index, barCategories = [], lineCategories = [],
  barColors, lineColors, valueFormatter = v => String(v), lineValueFormatter,
  height = 288, stackBars = false, curve = 'smooth', barRadius = 4,
  showLegend = true, showGridLines = true, yAxisWidth = 56, rightAxisWidth = 48,
  className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const fmtR = lineValueFormatter || valueFormatter;

  const pad = { t:10, r:lineCategories.length ? rightAxisWidth : 12, b:26, l:yAxisWidth };
  const w = Math.max(0, width - pad.l - pad.r), h = Math.max(0, height - pad.t - pad.b);
  const bars = barCategories.map((c, i) => ({ key:c, color:hzColor(barColors && barColors[i], i) }));
  const lines = lineCategories.map((c, i) => ({ key:c, color:hzColor(lineColors && lineColors[i], i + barCategories.length) }));

  const barRows = data.map(r => {
    const raw = barCategories.map(c => Number(r[c]) || 0);
    let acc = 0; const segs = raw.map(v => { const s = acc; acc += v; return [s, acc]; });
    return { raw, segs, total:acc };
  });
  const lMax = Math.max(0, ...barRows.map(r => stackBars ? r.total : Math.max(...r.raw, 0)));
  const rMax = Math.max(0, ...data.map(r => Math.max(...lineCategories.map(c => Number(r[c]) || 0))));
  const rMin = Math.min(0, ...data.map(r => Math.min(...lineCategories.map(c => Number(r[c]) || 0))));
  const ltk = hzTicks(0, lMax, 4), rtk = hzTicks(rMin, rMax, 4);
  const lTop = ltk[ltk.length - 1], rTop = rtk[rtk.length - 1], rBot = rtk[0];
  const yL = v => h - (v / (lTop || 1)) * h;
  const yR = v => h - ((v - rBot) / ((rTop - rBot) || 1)) * h;

  const band = w / Math.max(1, data.length);
  const barSize = stackBars ? Math.min(band * .55, 40) : Math.min((band * .62) / Math.max(1, bars.length), 26);
  const cx = i => i * band + band / 2;

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    showLegend && React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:10, paddingLeft:pad.l } },
      bars.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--hz-text-secondary, #505D6E)' } },
        React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color } }), s.key)).concat(
      lines.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--hz-text-secondary, #505D6E)' } },
        React.createElement('span', { style:{ width:14, height:2, borderRadius:2, background:s.color } }), s.key)))),
    React.createElement('div', { ref, style:{ position:'relative', width:'100%', height } },
      width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
        React.createElement('g', { transform:`translate(${pad.l},${pad.t})` },
          showGridLines && ltk.map(t => React.createElement('line', { key:t, x1:0, x2:w, y1:yL(t), y2:yL(t), stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:t === 0 ? '' : '3 3' })),
          ltk.map(t => React.createElement('text', { key:t, x:-10, y:yL(t) + 4, textAnchor:'end', ...HZ_AXIS }, valueFormatter(t))),
          lines.length > 0 && rtk.map(t => React.createElement('text', { key:'r' + t, x:w + 10, y:yR(t) + 4, textAnchor:'start', ...HZ_AXIS, fill:lines[0].color }, fmtR(t))),
          data.map((row, i) => React.createElement('text', { key:i, x:cx(i), y:h + 18, textAnchor:'middle', ...HZ_AXIS }, String(row[index]))),
          data.map((row, i) => React.createElement('g', { key:i, onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) },
            React.createElement('rect', { x:i * band, y:0, width:band, height:h, fill:hover === i ? 'var(--hz-neutral-100, #EDF0F5)' : 'transparent', opacity:.7 }),
            bars.map((s, si) => {
              const v = barRows[i].raw[si]; if (!v) return null;
              const off = stackBars ? -barSize / 2 : -(barSize * bars.length) / 2 + si * barSize;
              const top = stackBars ? yL(barRows[i].segs[si][1]) : yL(v);
              const len = stackBars ? yL(barRows[i].segs[si][0]) - top : h - yL(v);
              return React.createElement('rect', { key:s.key, x:cx(i) + off, y:top, width:Math.max(1, barSize - 2), height:Math.max(1, len), rx:barRadius, fill:s.color });
            }))),
          lines.map(s => {
            const pts = data.map((r, i) => [cx(i), yR(Number(r[s.key]) || 0)]);
            return React.createElement('g', { key:s.key },
              React.createElement('path', { d:curve === 'smooth' ? hzSmoothPath(pts) : 'M' + pts.map(p => p.join(',')).join('L'), fill:'none', stroke:s.color, strokeWidth:2.5, strokeLinecap:'round' }),
              pts.map((p, i) => React.createElement('circle', { key:i, cx:p[0], cy:p[1], r:3.5, fill:'var(--hz-surface-card,#fff)', stroke:s.color, strokeWidth:2 })));
          }))),
      hover != null && React.createElement('div', { style:{ ...HZ_TIP, left:Math.min(pad.l + cx(hover) + 12, Math.max(width - 170, 0)), top:pad.t + 4 } },
        React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:6 } }, String(data[hover][index])),
        bars.map((s, si) => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:8, marginTop:3 } },
          React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color, flex:'none' } }),
          React.createElement('span', { style:{ color:'var(--hz-text-secondary, #505D6E)', flex:1 } }, s.key),
          React.createElement('span', { style:{ fontWeight:600 } }, valueFormatter(barRows[hover].raw[si])))).concat(
        lines.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:8, marginTop:3 } },
          React.createElement('span', { style:{ width:8, height:2, background:s.color, flex:'none' } }),
          React.createElement('span', { style:{ color:'var(--hz-text-secondary, #505D6E)', flex:1 } }, s.key),
          React.createElement('span', { style:{ fontWeight:600 } }, fmtR(Number(data[hover][s.key]) || 0))))))));
}
