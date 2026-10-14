/**
 * BarChart — Horizon Design System
 *   <BarChart data={rows} index="month" categories={['New','Returning']} type="stacked" />
 *   <BarChart data={rows} index="team" categories={['Score']} layout="horizontal" />
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
const HZ_AXIS = { fontFamily: "var(--hz-font-sans, Inter, sans-serif)", fontSize: 11, fill: 'var(--hz-neutral-500, #8490A1)' };
const HZ_TIP = {
  position:'absolute', pointerEvents:'none', zIndex:5, background:'var(--hz-surface-card, #fff)',
  border:'1px solid var(--hz-border-subtle, #D5DBE5)', borderRadius:'var(--hz-radius-lg, 8px)',
  boxShadow:'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))', padding:'8px 10px',
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)', minWidth:120,
};

export function BarChart({
  data = [], index, categories = [], colors, valueFormatter = v => String(v),
  height = 288, type = 'grouped', layout = 'vertical', barRadius = 4, barGap = 0.28,
  showLegend = true, showGridLines = true, showXAxis = true, showYAxis = true,
  yAxisWidth, maxValue, className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const horizontal = layout === 'horizontal';
  const stacked = type === 'stacked' || type === 'percent';

  const gutter = yAxisWidth != null ? yAxisWidth : (horizontal ? 96 : 56);
  const pad = { t:10, r:14, b:showXAxis ? 26 : 8, l:showYAxis || horizontal ? gutter : 8 };
  const w = Math.max(0, width - pad.l - pad.r), h = Math.max(0, height - pad.t - pad.b);
  const series = categories.map((c, i) => ({ key:c, color:hzColor(colors && colors[i], i) }));

  const rows = data.map(r => {
    const raw = categories.map(c => Number(r[c]) || 0);
    const total = raw.reduce((a, b) => a + b, 0);
    const vals = type === 'percent' && total ? raw.map(v => (v / total) * 100) : raw;
    let acc = 0;
    const segs = vals.map(v => { const s = acc; acc += v; return [s, acc]; });
    return { row:r, raw, vals, segs, total:vals.reduce((a, b) => a + b, 0) };
  });
  const hiRaw = maxValue != null ? maxValue : (type === 'percent' ? 100 : Math.max(0, ...rows.map(r => stacked ? r.total : Math.max(...r.vals))));
  const tk = type === 'percent' ? [0, 25, 50, 75, 100] : hzTicks(0, hiRaw, 4);
  const vMax = tk[tk.length - 1];
  const fmtTick = t => type === 'percent' ? t + '%' : valueFormatter(t);

  const bandSize = (horizontal ? h : w) / Math.max(1, data.length);
  const bandPad = bandSize * barGap / 2;
  const groupSize = bandSize - bandPad * 2;
  const barSize = stacked ? Math.min(groupSize, 44) : Math.min(groupSize / Math.max(1, series.length), 36);
  const lenOf = v => (v / (vMax || 1)) * (horizontal ? w : h);

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    showLegend && React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:10, paddingLeft:pad.l } },
      series.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--hz-text-secondary, #505D6E)' } },
        React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color } }), s.key))),
    React.createElement('div', { ref, style:{ position:'relative', width:'100%', height } },
      width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
        React.createElement('g', { transform:`translate(${pad.l},${pad.t})` },
          showGridLines && tk.map(t => horizontal
            ? React.createElement('line', { key:t, x1:lenOf(t), x2:lenOf(t), y1:0, y2:h, stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:t === 0 ? '' : '3 3' })
            : React.createElement('line', { key:t, x1:0, x2:w, y1:h - lenOf(t), y2:h - lenOf(t), stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:t === 0 ? '' : '3 3' })),
          horizontal
            ? showXAxis && tk.map(t => React.createElement('text', { key:t, x:lenOf(t), y:h + 18, textAnchor:'middle', ...HZ_AXIS }, fmtTick(t)))
            : showYAxis && tk.map(t => React.createElement('text', { key:t, x:-10, y:h - lenOf(t) + 4, textAnchor:'end', ...HZ_AXIS }, fmtTick(t))),
          data.map((row, i) => horizontal
            ? React.createElement('text', { key:i, x:-10, y:i * bandSize + bandSize / 2 + 4, textAnchor:'end', ...HZ_AXIS }, String(row[index]))
            : showXAxis && React.createElement('text', { key:i, x:i * bandSize + bandSize / 2, y:h + 18, textAnchor:'middle', ...HZ_AXIS }, String(row[index]))),
          rows.map((r, i) => React.createElement('g', { key:i,
            onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) },
            React.createElement('rect', { x:horizontal ? 0 : i * bandSize, y:horizontal ? i * bandSize : 0, width:horizontal ? w : bandSize, height:horizontal ? bandSize : h, fill:hover === i ? 'var(--hz-neutral-100, #EDF0F5)' : 'transparent', opacity:.6 }),
            series.map((s, si) => {
              const [from, to] = r.segs[si], v = r.vals[si];
              if (!v) return null;
              const off = stacked ? (bandSize - barSize) / 2 : bandPad + si * barSize + (groupSize - barSize * series.length) / 2;
              const len = lenOf(stacked ? to - from : v);
              return horizontal
                ? React.createElement('rect', { key:s.key, x:stacked ? lenOf(from) : 0, y:i * bandSize + off, width:Math.max(1, len), height:Math.max(1, barSize - 2), rx:barRadius, fill:s.color })
                : React.createElement('rect', { key:s.key, x:i * bandSize + off, y:h - lenOf(stacked ? to : v), width:Math.max(1, barSize - 2), height:Math.max(1, len), rx:barRadius, fill:s.color });
            }))))),
      hover != null && React.createElement('div', { style:{ ...HZ_TIP,
        left:Math.min(horizontal ? pad.l + 24 : pad.l + hover * bandSize + bandSize / 2 + 12, Math.max(width - 160, 0)),
        top:horizontal ? Math.min(pad.t + hover * bandSize, height - 40) : pad.t + 4 } },
        React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:6 } }, String(data[hover][index])),
        series.map((s, si) => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:8, marginTop:3 } },
          React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color, flex:'none' } }),
          React.createElement('span', { style:{ color:'var(--hz-text-secondary, #505D6E)', flex:1 } }, s.key),
          React.createElement('span', { style:{ fontWeight:600 } }, type === 'percent' ? rows[hover].vals[si].toFixed(1) + '%' : valueFormatter(rows[hover].raw[si])))))));
}
