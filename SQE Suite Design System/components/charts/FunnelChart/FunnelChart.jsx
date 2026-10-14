/**
 * FunnelChart — Horizon Design System
 *   <FunnelChart data={[{name:'Visits',value:9000}, …]} index="name" category="value" />
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
function hzShade(hex, t) {
  const h = hex.replace('#', ''), n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const m = v => Math.round(v + (255 - v) * t);
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}

export function FunnelChart({
  data = [], index, category, colors, valueFormatter = v => String(v),
  variant = 'trapezoid', height = 320, gap = 6, showValues = true,
  showConversion = true, conversionMode = 'previous', color = 'blue',
  className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);

  const labelW = 150, valueW = 96;
  const chartW = Math.max(0, width - labelW - valueW);
  const stages = data.map((r, i) => ({
    name: String(r[index]), value: Number(r[category]) || 0,
    color: colors ? hzColor(colors[i], i) : hzShade(hzColor(color, 0), (i / Math.max(1, data.length - 1)) * 0.55),
  }));
  const first = stages.length ? stages[0].value : 0;
  const max = Math.max(...stages.map(s => s.value), 1);
  const rowH = data.length ? (height - gap * (data.length - 1)) / data.length : 0;

  const widthOf = v => (v / max) * chartW;
  const shape = (i) => {
    const wTop = widthOf(stages[i].value);
    const wBot = variant === 'trapezoid' && i < stages.length - 1 ? widthOf(stages[i + 1].value) : wTop;
    const y = i * (rowH + gap), cx = chartW / 2;
    if (variant === 'bars') return `M${cx - wTop / 2},${y}h${wTop}v${rowH}h${-wTop}Z`;
    return `M${cx - wTop / 2},${y}L${cx + wTop / 2},${y}L${cx + wBot / 2},${y + rowH}L${cx - wBot / 2},${y + rowH}Z`;
  };

  return React.createElement('div', { ref, className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
      React.createElement('g', { transform:`translate(${labelW},0)` },
        stages.map((s, i) => {
          const prev = i > 0 ? stages[i - 1].value : s.value;
          const conv = conversionMode === 'first' ? (first ? s.value / first : 0) : (prev ? s.value / prev : 0);
          const y = i * (rowH + gap);
          return React.createElement('g', { key:s.name + i, onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) },
            React.createElement('path', { d:shape(i), fill:s.color, opacity:hover == null || hover === i ? 1 : .45, style:{ transition:'opacity .15s' } }),
            React.createElement('text', { x:-labelW + 8, y:y + rowH / 2 - 2, ...{ fontFamily:"var(--hz-font-sans, Inter, sans-serif)" },
              fontSize:13, fontWeight:600, fill:'var(--hz-text-primary, #1E252E)' }, s.name),
            showConversion && React.createElement('text', { x:-labelW + 8, y:y + rowH / 2 + 15, fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:11, fill:'var(--hz-text-tertiary, #8490A1)' },
              (conv * 100).toFixed(1) + '%' + (i === 0 ? '' : conversionMode === 'first' ? ' of total' : ' of previous')),
            showValues && React.createElement('text', { x:chartW + 12, y:y + rowH / 2 + 4, fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:13, fontWeight:600, fill:'var(--hz-text-primary, #1E252E)' }, valueFormatter(s.value)),
            i > 0 && React.createElement('text', { x:chartW / 2, y:y - gap / 2 + 3, textAnchor:'middle', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:10, fill:'var(--hz-neutral-0, #fff)' }, ''));
        }))));
}
