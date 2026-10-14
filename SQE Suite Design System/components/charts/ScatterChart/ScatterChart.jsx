/**
 * ScatterChart — Horizon Design System (Tremor API + MUI-style bubble sizing)
 *   <ScatterChart data={rows} x="hours" y="score" size="deals" category="region" />
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
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)',
};

export function ScatterChart({
  data = [], x, y, size, category, label, colors,
  valueFormatter = {}, height = 320, dotSize = 6, sizeRange = [5, 18],
  xAxisLabel, yAxisLabel, showLegend = true, showGridLines = true,
  yAxisWidth = 56, className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const fx = valueFormatter.x || (v => String(v));
  const fy = valueFormatter.y || (v => String(v));
  const fs = valueFormatter.size || (v => String(v));

  const pad = { t:12, r:16, b:xAxisLabel ? 46 : 30, l:yAxisWidth };
  const w = Math.max(0, width - pad.l - pad.r), h = Math.max(0, height - pad.t - pad.b);

  const groups = category ? Array.from(new Set(data.map(r => r[category]))) : [];
  const colorOf = r => category ? hzColor(colors && colors[groups.indexOf(r[category])], groups.indexOf(r[category])) : hzColor(colors && colors[0], 0);

  const xs = data.map(r => Number(r[x])), ys = data.map(r => Number(r[y]));
  const xtk = hzTicks(Math.min(...xs), Math.max(...xs), 5), ytk = hzTicks(Math.min(...ys), Math.max(...ys), 4);
  const xS = v => ((v - xtk[0]) / ((xtk[xtk.length - 1] - xtk[0]) || 1)) * w;
  const yS = v => h - ((v - ytk[0]) / ((ytk[ytk.length - 1] - ytk[0]) || 1)) * h;
  const sVals = size ? data.map(r => Number(r[size]) || 0) : [];
  const sMin = size ? Math.min(...sVals) : 0, sMax = size ? Math.max(...sVals) : 1;
  const rOf = r => size ? sizeRange[0] + ((Number(r[size]) - sMin) / ((sMax - sMin) || 1)) * (sizeRange[1] - sizeRange[0]) : dotSize;

  const tipRows = (size ? [[x, fx], [y, fy], [size, fs]] : [[x, fx], [y, fy]]).map(pair => React.createElement(
    'div', { key:pair[0], style:{ color:'var(--hz-text-secondary, #505D6E)' } },
    pair[0] + ': ',
    React.createElement('b', { style:{ color:'var(--hz-text-primary,#1E252E)' } }, pair[1](Number(hover != null ? data[hover][pair[0]] : 0)))
  ));
  const tooltip = hover == null ? null : React.createElement(
    'div', { style:{ ...HZ_TIP,
      left:Math.min(pad.l + xS(Number(data[hover][x])) + 14, Math.max(width - 170, 0)),
      top:Math.max(pad.t + yS(Number(data[hover][y])) - 16, 0) } },
    label ? React.createElement('div', { style:{ fontWeight:600, marginBottom:4 } }, String(data[hover][label])) : null,
    category ? React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:4 } }, String(data[hover][category])) : null,
    tipRows
  );

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    showLegend && groups.length > 0 && React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:10, paddingLeft:pad.l } },
      groups.map((g, i) => React.createElement('div', { key:String(g), style:{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--hz-text-secondary, #505D6E)' } },
        React.createElement('span', { style:{ width:8, height:8, borderRadius:'50%', background:hzColor(colors && colors[i], i) } }), String(g)))),
    React.createElement('div', { ref, style:{ position:'relative', width:'100%', height } },
      width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
        React.createElement('g', { transform:`translate(${pad.l},${pad.t})` },
          showGridLines && ytk.map(t => React.createElement('line', { key:'y' + t, x1:0, x2:w, y1:yS(t), y2:yS(t), stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:'3 3' })),
          showGridLines && xtk.map(t => React.createElement('line', { key:'x' + t, x1:xS(t), x2:xS(t), y1:0, y2:h, stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:'3 3' })),
          ytk.map(t => React.createElement('text', { key:t, x:-10, y:yS(t) + 4, textAnchor:'end', ...HZ_AXIS }, fy(t))),
          xtk.map(t => React.createElement('text', { key:t, x:xS(t), y:h + 18, textAnchor:'middle', ...HZ_AXIS }, fx(t))),
          xAxisLabel && React.createElement('text', { x:w / 2, y:h + 40, textAnchor:'middle', ...HZ_AXIS, fill:'var(--hz-text-secondary, #505D6E)' }, xAxisLabel),
          yAxisLabel && React.createElement('text', { x:0, y:0, transform:`translate(${-yAxisWidth + 12},${h / 2}) rotate(-90)`, textAnchor:'middle', ...HZ_AXIS, fill:'var(--hz-text-secondary, #505D6E)' }, yAxisLabel),
          data.map((r, i) => React.createElement('circle', { key:i, cx:xS(Number(r[x])), cy:yS(Number(r[y])), r:rOf(r),
            fill:colorOf(r), fillOpacity:hover === i ? .95 : .6, stroke:colorOf(r), strokeWidth:hover === i ? 2 : 1,
            style:{ transition:'fill-opacity .12s' }, onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) })))),
      tooltip
    )
  );
}
