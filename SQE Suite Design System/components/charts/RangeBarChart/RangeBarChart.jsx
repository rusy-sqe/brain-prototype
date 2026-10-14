/**
 * RangeBarChart — floating bars between a low and a high value (ranges, gantt, min/max spreads).
 * Horizon Design System · MUI-inspired API.
 *
 *   <RangeBarChart data={rows} index="month" series={[{name:'Temp', low:'min', high:'max'}]} />
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
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)', minWidth:140,
};

export function RangeBarChart({
  data = [], index, series = [], valueFormatter = v => String(v),
  height = 300, layout = 'horizontal', barRadius = 999, barThickness,
  showLegend = true, showGridLines = true, showEndCaps = false,
  labelWidth, minValue, maxValue, className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const horizontal = layout === 'horizontal';
  const rows = series.map((s, i) => ({ ...s, color: hzColor(s.color, i) }));

  const gutter = labelWidth != null ? labelWidth : (horizontal ? 104 : 56);
  const pad = { t:10, r:18, b:26, l:gutter };
  const w = Math.max(0, width - pad.l - pad.r), h = Math.max(0, height - pad.t - pad.b);

  const all = data.flatMap(r => rows.flatMap(s => [Number(r[s.low]), Number(r[s.high])])).filter(isFinite);
  const tk = hzTicks(minValue != null ? minValue : Math.min(...all), maxValue != null ? maxValue : Math.max(...all), 5);
  const v0 = tk[0], v1 = tk[tk.length - 1];
  const pos = v => ((v - v0) / ((v1 - v0) || 1)) * (horizontal ? w : h);
  const band = (horizontal ? h : w) / Math.max(1, data.length);
  const thick = barThickness != null ? barThickness : Math.min(horizontal ? band * .5 : band * .42, 22);

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    showLegend && rows.length > 0 && React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:10, paddingLeft:pad.l } },
      rows.map(s => React.createElement('div', { key:s.name, style:{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--hz-text-secondary, #505D6E)' } },
        React.createElement('span', { style:{ width:16, height:8, borderRadius:999, background:s.color } }), s.name))),
    React.createElement('div', { ref, style:{ position:'relative', width:'100%', height } },
      width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
        React.createElement('g', { transform:`translate(${pad.l},${pad.t})` },
          tk.map(t => horizontal
            ? React.createElement('g', { key:t },
                showGridLines && React.createElement('line', { x1:pos(t), x2:pos(t), y1:0, y2:h, stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:'3 3' }),
                React.createElement('text', { x:pos(t), y:h + 18, textAnchor:'middle', ...HZ_AXIS }, valueFormatter(t)))
            : React.createElement('g', { key:t },
                showGridLines && React.createElement('line', { x1:0, x2:w, y1:h - pos(t), y2:h - pos(t), stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:'3 3' }),
                React.createElement('text', { x:-10, y:h - pos(t) + 4, textAnchor:'end', ...HZ_AXIS }, valueFormatter(t)))),
          data.map((row, i) => React.createElement('g', { key:i, onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) },
            horizontal
              ? React.createElement('text', { x:-12, y:i * band + band / 2 + 4, textAnchor:'end', ...HZ_AXIS, fill:'var(--hz-text-secondary, #505D6E)' }, String(row[index]))
              : React.createElement('text', { x:i * band + band / 2, y:h + 18, textAnchor:'middle', ...HZ_AXIS, fill:'var(--hz-text-secondary, #505D6E)' }, String(row[index])),
            React.createElement('rect', { x:horizontal ? 0 : i * band, y:horizontal ? i * band : 0, width:horizontal ? w : band, height:horizontal ? band : h, fill:hover === i ? 'var(--hz-neutral-100, #EDF0F5)' : 'transparent', opacity:.6 }),
            rows.map((s, si) => {
              const lo = Number(row[s.low]), hi = Number(row[s.high]);
              if (!isFinite(lo) || !isFinite(hi)) return null;
              const off = (band - thick * rows.length - 4 * (rows.length - 1)) / 2 + si * (thick + 4);
              const a = pos(Math.min(lo, hi)), b = pos(Math.max(lo, hi));
              const len = Math.max(3, b - a);
              return React.createElement('g', { key:s.name },
                horizontal
                  ? React.createElement('rect', { x:a, y:i * band + off, width:len, height:thick, rx:Math.min(barRadius, thick / 2), fill:s.color, opacity:hover == null || hover === i ? .92 : .4 })
                  : React.createElement('rect', { x:i * band + off, y:h - b, width:thick, height:len, rx:Math.min(barRadius, thick / 2), fill:s.color, opacity:hover == null || hover === i ? .92 : .4 }),
                showEndCaps && [a, b].map((p, k) => horizontal
                  ? React.createElement('circle', { key:k, cx:p, cy:i * band + off + thick / 2, r:3, fill:'var(--hz-surface-card, #fff)', stroke:s.color, strokeWidth:2 })
                  : React.createElement('circle', { key:k, cx:i * band + off + thick / 2, cy:h - p, r:3, fill:'var(--hz-surface-card, #fff)', stroke:s.color, strokeWidth:2 })));
            }))))),
      hover != null && React.createElement('div', { style:{ ...HZ_TIP,
          left:Math.min(horizontal ? pad.l + 28 : pad.l + hover * band + band / 2 + 12, Math.max(width - 180, 0)),
          top:horizontal ? Math.min(pad.t + hover * band, Math.max(height - 60, 0)) : pad.t + 4 } },
        React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:6 } }, String(data[hover][index])),
        rows.map(s => React.createElement('div', { key:s.name, style:{ display:'flex', alignItems:'center', gap:8, marginTop:3 } },
          React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color, flex:'none' } }),
          React.createElement('span', { style:{ color:'var(--hz-text-secondary, #505D6E)', flex:1 } }, s.name),
          React.createElement('span', { style:{ fontWeight:600 } }, valueFormatter(Number(data[hover][s.low])) + ' – ' + valueFormatter(Number(data[hover][s.high]))))))));
}
