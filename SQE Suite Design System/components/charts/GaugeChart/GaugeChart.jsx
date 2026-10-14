/**
 * GaugeChart — single value on an arc, with optional threshold bands. Horizon Design System.
 *   <GaugeChart value={72} min={0} max={100} label="SLA" />
 */

const HZ_C = { blue:'#006CEB', teal:'#2CA7E4', purple:'#7C48E4', green:'#159367', orange:'#E45A18', magenta:'#E437AE', yellow:'#FFBF00', red:'#D92222', neutral:'#8490A1' };
const HZ_ORDER = ['blue','purple','teal','green','orange','magenta','yellow','red'];
function hzColor(c, i) { return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]]; }

function hzArcPath(cx, cy, r, a0, a1, thickness) {
  const ri = r - thickness;
  const p = (rad, a) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const [x0, y0] = p(r, a0), [x1, y1] = p(r, a1), [x2, y2] = p(ri, a1), [x3, y3] = p(ri, a0);
  return `M${x0},${y0}A${r},${r} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${ri},${ri} 0 ${large} 0 ${x3},${y3}Z`;
}

export function GaugeChart({
  value = 0, min = 0, max = 100, color = 'blue', trackColor = '#EDF0F5',
  valueFormatter = v => String(v), label, size = 200, thickness = 18,
  sweep = 240, thresholds, showTicks = true, showValue = true,
  className = '', style = {},
}) {
  const t = Math.max(0, Math.min(1, (value - min) / ((max - min) || 1)));
  const start = Math.PI / 2 + (Math.PI * 2 - (sweep * Math.PI) / 180) / 2;
  const end = start + (sweep * Math.PI) / 180;
  const at = f => start + (end - start) * f;
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 4;
  const height = sweep >= 300 ? size : size * 0.78;

  const bands = thresholds && thresholds.length
    ? thresholds.map((b, i) => ({ from:(b.from - min) / ((max - min) || 1), to:(b.to - min) / ((max - min) || 1), color:hzColor(b.color, i) }))
    : null;
  const activeColor = bands
    ? (bands.find(b => t >= b.from && t <= b.to) || bands[bands.length - 1]).color
    : hzColor(color, 0);

  return React.createElement('div', { className, style:{ position:'relative', width:size, fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    React.createElement('svg', { width:size, height, viewBox:`0 0 ${size} ${height}`, style:{ display:'block', overflow:'visible' } },
      React.createElement('path', { d:hzArcPath(cx, cy, r, start, end, thickness), fill:trackColor }),
      bands
        ? bands.map((b, i) => React.createElement('path', { key:i, d:hzArcPath(cx, cy, r, at(b.from), at(b.to), thickness), fill:b.color, opacity:.28 }))
        : null,
      t > 0 && React.createElement('path', { d:hzArcPath(cx, cy, r, start, at(t), thickness), fill:activeColor }),
      showTicks && [0, .25, .5, .75, 1].map(f => {
        const a = at(f), ri = r - thickness - 6;
        return React.createElement('line', { key:f, x1:cx + ri * Math.cos(a), y1:cy + ri * Math.sin(a),
          x2:cx + (ri - 5) * Math.cos(a), y2:cy + (ri - 5) * Math.sin(a), stroke:'var(--hz-border-default, #BAC3D1)' });
      }),
      React.createElement('circle', { cx:cx + (r - thickness / 2) * Math.cos(at(t)), cy:cy + (r - thickness / 2) * Math.sin(at(t)), r:thickness / 2 - 3,
        fill:'var(--hz-surface-card, #fff)', stroke:activeColor, strokeWidth:2.5 })),
    showValue && React.createElement('div', { style:{ position:'absolute', left:0, right:0, top:cy - 26, textAlign:'center', pointerEvents:'none' } },
      React.createElement('div', { style:{ fontSize:30, fontWeight:600, letterSpacing:'-.02em', color:'var(--hz-text-primary, #1E252E)' } }, valueFormatter(value)),
      label && React.createElement('div', { style:{ fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--hz-text-tertiary, #8490A1)', marginTop:4, fontWeight:600 } }, label)),
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--hz-text-tertiary, #8490A1)', marginTop:-4, padding:'0 6px' } },
      React.createElement('span', null, valueFormatter(min)),
      React.createElement('span', null, valueFormatter(max))));
}
