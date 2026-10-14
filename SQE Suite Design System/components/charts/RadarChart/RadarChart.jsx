/**
 * RadarChart — multi-axis comparison polygons. Horizon Design System · MUI-inspired.
 *   <RadarChart data={rows} index="metric" categories={['Now','Target']} />
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
const HZ_AXIS = { fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:11, fill:'var(--hz-neutral-500, #8490A1)' };
const HZ_TIP = {
  position:'absolute', pointerEvents:'none', zIndex:5, background:'var(--hz-surface-card, #fff)',
  border:'1px solid var(--hz-border-subtle, #D5DBE5)', borderRadius:'var(--hz-radius-lg, 8px)',
  boxShadow:'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))', padding:'8px 10px',
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)', minWidth:120,
};

export function RadarChart({
  data = [], index, categories = [], colors, valueFormatter = v => String(v),
  height = 340, maxValue, rings = 4, shape = 'polygon', fillOpacity = 0.18,
  showLegend = true, showDots = true, labelOffset = 18, className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const series = categories.map((c, i) => ({ key:c, color:hzColor(colors && colors[i], i) }));

  const cx = width / 2, cy = height / 2;
  const r = Math.max(0, Math.min(width, height) / 2 - 46);
  const n = data.length;
  const max = maxValue != null ? maxValue : Math.max(1, ...data.flatMap(row => categories.map(c => Number(row[c]) || 0)));
  const ang = i => -Math.PI / 2 + (i / Math.max(1, n)) * Math.PI * 2;
  const pt = (i, v) => [cx + (v / max) * r * Math.cos(ang(i)), cy + (v / max) * r * Math.sin(ang(i))];
  const ringPath = f => shape === 'circle' ? null : 'M' + data.map((_, i) => pt(i, max * f).join(',')).join('L') + 'Z';

  return React.createElement('div', { className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    showLegend && React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:16, marginBottom:6 } },
      series.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--hz-text-secondary, #505D6E)' } },
        React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color } }), s.key))),
    React.createElement('div', { ref, style:{ position:'relative', width:'100%', height } },
      width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
        Array.from({ length:rings }, (_, k) => {
          const f = (k + 1) / rings;
          return shape === 'circle'
            ? React.createElement('circle', { key:k, cx, cy, r:r * f, fill:'none', stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:k === rings - 1 ? '' : '3 3' })
            : React.createElement('path', { key:k, d:ringPath(f), fill:'none', stroke:'var(--hz-border-subtle, #D5DBE5)', strokeDasharray:k === rings - 1 ? '' : '3 3' });
        }),
        data.map((row, i) => React.createElement('line', { key:'sp' + i, x1:cx, y1:cy, x2:pt(i, max)[0], y2:pt(i, max)[1], stroke:'var(--hz-border-subtle, #D5DBE5)' })),
        data.map((row, i) => {
          const [lx, ly] = pt(i, max);
          const dx = lx - cx, dy = ly - cy, len = Math.hypot(dx, dy) || 1;
          return React.createElement('text', { key:'lb' + i, x:lx + (dx / len) * labelOffset, y:ly + (dy / len) * labelOffset + 4,
            textAnchor:Math.abs(dx) < 4 ? 'middle' : dx > 0 ? 'start' : 'end', ...HZ_AXIS,
            fill:hover === i ? 'var(--hz-text-primary, #1E252E)' : HZ_AXIS.fill, fontWeight:hover === i ? 600 : 400 }, String(row[index]));
        }),
        series.map(s => {
          const pts = data.map((row, i) => pt(i, Number(row[s.key]) || 0));
          const d = 'M' + pts.map(p => p.join(',')).join('L') + 'Z';
          return React.createElement('g', { key:s.key },
            React.createElement('path', { d, fill:s.color, fillOpacity, stroke:s.color, strokeWidth:2, strokeLinejoin:'round' }),
            showDots && pts.map((p, i) => React.createElement('circle', { key:i, cx:p[0], cy:p[1], r:3.5, fill:'var(--hz-surface-card, #fff)', stroke:s.color, strokeWidth:2 })));
        }),
        data.map((row, i) => React.createElement('circle', { key:'hit' + i, cx:pt(i, max)[0], cy:pt(i, max)[1], r:22, fill:'transparent',
          onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null) }))),
      hover != null && React.createElement('div', { style:{ ...HZ_TIP, left:Math.min(Math.max(pt(hover, max)[0] + 16, 0), Math.max(width - 150, 0)), top:Math.max(pt(hover, max)[1] - 10, 0) } },
        React.createElement('div', { style:{ fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginBottom:6 } }, String(data[hover][index])),
        series.map(s => React.createElement('div', { key:s.key, style:{ display:'flex', alignItems:'center', gap:8, marginTop:3 } },
          React.createElement('span', { style:{ width:8, height:8, borderRadius:2, background:s.color, flex:'none' } }),
          React.createElement('span', { style:{ color:'var(--hz-text-secondary, #505D6E)', flex:1 } }, s.key),
          React.createElement('span', { style:{ fontWeight:600 } }, valueFormatter(Number(data[hover][s.key]) || 0)))))));
}
