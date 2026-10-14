/**
 * WaterfallChart — cumulative contributions, with connectors and total bars.
 * Horizon Design System.
 *   <WaterfallChart data={[{name:'Start', value:120, type:'total'}, {name:'New', value:34}, …]} />
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
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)', minWidth:120,
};

export function WaterfallChart({
  data = [], valueFormatter = v => String(v), height = 300,
  increaseColor = 'green', decreaseColor = 'red', totalColor = 'blue',
  barRadius = 3, barGap = 0.34, showConnectors = true, showValues = true,
  showGridLines = true, yAxisWidth = 56, className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);

  const pad = { t:showValues ? 22 : 10, r:14, b:28, l:yAxisWidth };
  const w = Math.max(0, width - pad.l - pad.r), h = Math.max(0, height - pad.t - pad.b);

  let running = 0;
  const bars = data.map(d => {
    const v = Number(d.value) || 0;
    const isTotal = d.type === 'total';
    const from = isTotal ? 0 : running;
    const to = isTotal ? v : running + v;
    running = to;
    return { name:String(d.name), value:v, from, to, isTotal,
      color:hzColor(d.color || (isTotal ? totalColor : v >= 0 ? increaseColor : decreaseColor), 0) };
  });
  const vals = bars.flatMap(b => [b.from, b.to]);
  const tk = hzTicks(Math.min(0, ...vals), Math.max(...vals, 0), 4);
  const y0 = tk[0], y1 = tk[tk.length - 1];
  const yS = v => h - ((v - y0) / ((y1 - y0) || 1)) * h;
  const band = w / Math.max(1, bars.length);
  const bw = band * (1 - barGap);

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    React.createElement('div', { ref, style:{ position:'relative', width:'100%', height } },
      width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
        React.createElement('g', { transform:`translate(${pad.l},${pad.t})` },
          showGridLines && tk.map(t => React.createElement('line', { key:t, x1:0, x2:w, y1:yS(t), y2:yS(t), stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:t === 0 ? '' : '3 3' })),
          tk.map(t => React.createElement('text', { key:t, x:-10, y:yS(t) + 4, textAnchor:'end', ...HZ_AXIS }, valueFormatter(t))),
          bars.map((b, i) => React.createElement('text', { key:'lb' + i, x:i * band + band / 2, y:h + 18, textAnchor:'middle', ...HZ_AXIS }, b.name)),
          showConnectors && bars.slice(0, -1).map((b, i) => React.createElement('line', { key:'cn' + i,
            x1:i * band + band / 2 + bw / 2, x2:(i + 1) * band + band / 2 - bw / 2, y1:yS(b.to), y2:yS(b.to),
            stroke:'var(--hz-border-default, #BAC3D1)', strokeDasharray:'2 3' })),
          bars.map((b, i) => {
            const top = yS(Math.max(b.from, b.to)), len = Math.max(2, Math.abs(yS(b.to) - yS(b.from)));
            return React.createElement('g', { key:b.name + i, onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) },
              React.createElement('rect', { x:i * band + (band - bw) / 2, y:top, width:bw, height:len, rx:barRadius, fill:b.color, opacity:hover == null || hover === i ? 1 : .5 }),
              showValues && React.createElement('text', { x:i * band + band / 2, y:top - 7, textAnchor:'middle',
                fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:11, fontWeight:600,
                fill:b.isTotal ? 'var(--hz-text-primary, #1E252E)' : b.color },
                (b.isTotal || b.value < 0 ? '' : '+') + valueFormatter(b.value)));
          })))),
      hover != null && React.createElement('div', { style:{ ...HZ_TIP, left:Math.min(pad.l + hover * band + band / 2 + 10, Math.max(width - 160, 0)), top:pad.t } },
        React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:4 } }, bars[hover].name),
        React.createElement('div', { style:{ fontWeight:600 } }, (bars[hover].isTotal || bars[hover].value < 0 ? '' : '+') + valueFormatter(bars[hover].value)),
        React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginTop:2 } }, 'Running · ' + valueFormatter(bars[hover].to))));
}
