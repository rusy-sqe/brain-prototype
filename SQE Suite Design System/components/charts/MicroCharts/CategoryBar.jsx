/**
 * CategoryBar — segmented proportion bar with an optional marker. Horizon Design System.
 *   <CategoryBar values={[40, 30, 20, 10]} colors={['green','yellow','orange','red']} marker={62} />
 */

const HZ_C = { blue:'#006CEB', teal:'#2CA7E4', purple:'#7C48E4', green:'#159367', orange:'#E45A18', magenta:'#E437AE', yellow:'#FFBF00', red:'#D92222', neutral:'#8490A1' };
const HZ_ORDER = ['blue','purple','teal','green','orange','magenta','yellow','red'];
function hzColor(c, i) { return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]]; }

export function CategoryBar({
  values = [], colors, labels, marker, markerLabel, valueFormatter = v => String(v),
  barHeight = 10, showLabels = true, className = '', style = {},
}) {
  const total = values.reduce((a, b) => a + (Number(b) || 0), 0) || 1;
  let acc = 0;
  const segs = values.map((v, i) => { const from = acc; acc += Number(v) || 0; return { v:Number(v) || 0, from, color:hzColor(colors && colors[i], i) }; });
  const markerPct = marker != null ? Math.max(0, Math.min(100, (marker / total) * 100)) : null;

  return React.createElement('div', { className, style:{ fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    showLabels && React.createElement('div', { style:{ display:'flex', marginBottom:6 } },
      segs.map((s, i) => React.createElement('div', { key:i, style:{ width:(s.v / total) * 100 + '%', fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', whiteSpace:'nowrap', overflow:'hidden' } },
        (labels && labels[i]) || valueFormatter(s.v)))),
    React.createElement('div', { style:{ position:'relative' } },
      React.createElement('div', { style:{ display:'flex', gap:2, height:barHeight } },
        segs.map((s, i) => React.createElement('div', { key:i, style:{ width:(s.v / total) * 100 + '%', background:s.color, borderRadius:'var(--hz-radius-full, 9999px)' } }))),
      markerPct != null && React.createElement('div', { style:{ position:'absolute', top:-4, left:`calc(${markerPct}% - 2px)`, width:4, height:barHeight + 8, borderRadius:2, background:'var(--hz-text-primary, #1E252E)', boxShadow:'0 0 0 2px var(--hz-surface-card, #fff)' } }),
      markerPct != null && markerLabel && React.createElement('div', { style:{ position:'absolute', top:barHeight + 10, left:markerPct + '%', transform:'translateX(-50%)', fontSize:11, fontWeight:600, color:'var(--hz-text-primary, #1E252E)', whiteSpace:'nowrap' } }, markerLabel)));
}
