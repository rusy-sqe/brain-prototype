/**
 * DonutChart — Horizon Design System
 *   <DonutChart data={rows} index="name" category="value" variant="donut" label="$9.1K" />
 */

const HZ_C = { blue:'#006CEB', teal:'#2CA7E4', purple:'#7C48E4', green:'#159367', orange:'#E45A18', magenta:'#E437AE', yellow:'#FFBF00', red:'#D92222', neutral:'#8490A1' };
const HZ_ORDER = ['blue','purple','teal','green','orange','magenta','yellow','red'];
function hzColor(c, i) { return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]]; }
const HZ_TIP = {
  position:'absolute', pointerEvents:'none', zIndex:5, background:'var(--hz-surface-card, #fff)',
  border:'1px solid var(--hz-border-subtle, #D5DBE5)', borderRadius:'var(--hz-radius-lg, 8px)',
  boxShadow:'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))', padding:'8px 10px',
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)',
};

function hzArc(cx, cy, rOuter, rInner, a0, a1) {
  const p = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = p(rOuter, a0), [x1, y1] = p(rOuter, a1), [x2, y2] = p(rInner, a1), [x3, y3] = p(rInner, a0);
  if (rInner <= 0) return `M${cx},${cy}L${x0},${y0}A${rOuter},${rOuter} 0 ${large} 1 ${x1},${y1}Z`;
  return `M${x0},${y0}A${rOuter},${rOuter} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${rInner},${rInner} 0 ${large} 0 ${x3},${y3}Z`;
}

export function DonutChart({
  data = [], index, category, colors, valueFormatter = v => String(v),
  variant = 'donut', size = 220, thickness = 28, gap = 1.5,
  label, showLabel = true, showLegend = true, legendPosition = 'right',
  className = '', style = {},
}) {
  const [hover, setHover] = React.useState(null);
  const total = data.reduce((a, r) => a + (Number(r[category]) || 0), 0);
  const rOuter = size / 2, rInner = variant === 'pie' ? 0 : Math.max(0, rOuter - thickness);
  let angle = -Math.PI / 2;
  const slices = data.map((r, i) => {
    const v = Number(r[category]) || 0;
    const span = total ? (v / total) * Math.PI * 2 : 0;
    const g = total && span > 0.02 ? (gap * Math.PI) / 180 : 0;
    const s = { key:String(r[index]), value:v, color:hzColor((colors && colors[i]) || r.color, i), a0:angle + g / 2, a1:angle + span - g / 2 };
    angle += span;
    return s;
  });
  const centerValue = label != null ? label : valueFormatter(total);

  return React.createElement('div', { className, style:{
      position:'relative', display:'flex', alignItems:'center', gap:28,
      flexDirection:legendPosition === 'bottom' ? 'column' : 'row',
      fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    React.createElement('div', { style:{ position:'relative', width:size, height:size, flex:'none' } },
      React.createElement('svg', { width:size, height:size, style:{ display:'block' } },
        React.createElement('g', null,
          slices.map((s, i) => React.createElement('path', {
            key:s.key + i, d:hzArc(rOuter, rOuter, hover === i ? rOuter : rOuter - 2, rInner ? rInner : 0, s.a0, s.a1),
            fill:s.color, opacity:hover == null || hover === i ? 1 : .35,
            style:{ transition:'opacity .15s, d .15s' },
            onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) })))),
      variant === 'donut' && showLabel && React.createElement('div', { style:{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', pointerEvents:'none' } },
        React.createElement('div', { style:{ fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--hz-text-tertiary, #8490A1)' } }, hover != null ? slices[hover].key : 'Total'),
        React.createElement('div', { style:{ fontSize:22, fontWeight:600, color:'var(--hz-text-primary, #1E252E)', marginTop:2 } },
          hover != null ? valueFormatter(slices[hover].value) : centerValue))),
    showLegend && React.createElement('div', { style:{ display:'flex', flexDirection:legendPosition === 'bottom' ? 'row' : 'column', flexWrap:'wrap', gap:legendPosition === 'bottom' ? 16 : 10 } },
      slices.map((s, i) => React.createElement('div', { key:s.key + i,
        onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null),
        style:{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--hz-text-secondary, #505D6E)', opacity:hover == null || hover === i ? 1 : .5, cursor:'default' } },
        React.createElement('span', { style:{ width:8, height:8, borderRadius:'50%', background:s.color, flex:'none' } }),
        React.createElement('span', { style:{ flex:1, whiteSpace:'nowrap' } }, s.key),
        React.createElement('span', { style:{ fontWeight:600, color:'var(--hz-text-primary, #1E252E)', marginLeft:8 } }, valueFormatter(s.value)),
        React.createElement('span', { style:{ color:'var(--hz-text-tertiary, #8490A1)', width:44, textAlign:'right' } }, total ? ((s.value / total) * 100).toFixed(1) + '%' : '–')))),
    variant === 'pie' && hover != null && React.createElement('div', { style:{ ...HZ_TIP, left:size / 2, top:-8 } },
      React.createElement('span', { style:{ color:'var(--hz-text-secondary,#505D6E)' } }, slices[hover].key + ' · '),
      React.createElement('span', { style:{ fontWeight:600 } }, valueFormatter(slices[hover].value))));
}
