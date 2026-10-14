/**
 * Tracker — a row of status blocks (uptime, streaks, SLA days). Horizon Design System.
 *   <Tracker data={[{ color:'green', tooltip:'Operational' }, …]} />
 */

const HZ_C = { blue:'#006CEB', teal:'#2CA7E4', purple:'#7C48E4', green:'#159367', orange:'#E45A18', magenta:'#E437AE', yellow:'#FFBF00', red:'#D92222', neutral:'#8490A1' };
const HZ_ORDER = ['blue','purple','teal','green','orange','magenta','yellow','red'];
function hzColor(c, i) { return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]]; }

export function Tracker({
  data = [], blockHeight = 34, gap = 2, radius = 3,
  startLabel, endLabel, className = '', style = {},
}) {
  const [hover, setHover] = React.useState(null);
  return React.createElement('div', { className, style:{ position:'relative', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    React.createElement('div', { style:{ display:'flex', gap, alignItems:'stretch' } },
      data.map((d, i) => React.createElement('div', { key:i,
        onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null),
        style:{ flex:1, height:blockHeight, borderRadius:radius, background:hzColor(d.color, 0),
          opacity:hover == null || hover === i ? 1 : .55, transition:'opacity .12s', cursor:'default' } }))),
    (startLabel || endLabel) && React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:11, color:'var(--hz-text-tertiary, #8490A1)' } },
      React.createElement('span', null, startLabel || ''), React.createElement('span', null, endLabel || '')),
    hover != null && data[hover].tooltip && React.createElement('div', {
      style:{ position:'absolute', left:`calc(${((hover + 0.5) / Math.max(1, data.length)) * 100}% )`, transform:'translateX(-50%)', top:blockHeight + 10,
        background:'var(--hz-neutral-950, #1E252E)', color:'#fff', fontSize:11, padding:'5px 8px', borderRadius:6, whiteSpace:'nowrap', pointerEvents:'none', zIndex:5 } },
      data[hover].tooltip));
}
