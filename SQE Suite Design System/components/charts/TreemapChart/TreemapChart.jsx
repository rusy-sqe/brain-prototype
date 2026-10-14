/**
 * TreemapChart — nested rectangles sized by value (squarified layout). Horizon Design System.
 *   <TreemapChart data={[{name:'Enterprise', value:42100}, …]} />
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

function hzSquarify(items, x, y, w, h) {
  const out = [];
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  let rest = items.slice(), rx = x, ry = y, rw = w, rh = h, remaining = total;
  while (rest.length) {
    const horizontal = rw >= rh;
    const side = horizontal ? rh : rw;
    let row = [], rowSum = 0, best = Infinity;
    for (let i = 0; i < rest.length; i++) {
      const trial = rowSum + rest[i].value;
      const thickness = (trial / remaining) * (horizontal ? rw : rh);
      const worst = Math.max(...row.concat([rest[i]]).map(it => {
        const len = (it.value / trial) * side;
        return Math.max(thickness / (len || 1), (len || 1) / thickness);
      }));
      if (worst > best && row.length) break;
      row.push(rest[i]); rowSum = trial; best = worst;
    }
    const thickness = (rowSum / remaining) * (horizontal ? rw : rh);
    let off = 0;
    row.forEach(it => {
      const len = (it.value / (rowSum || 1)) * side;
      out.push(horizontal
        ? { ...it, x:rx, y:ry + off, w:thickness, h:len }
        : { ...it, x:rx + off, y:ry, w:len, h:thickness });
      off += len;
    });
    if (horizontal) { rx += thickness; rw -= thickness; } else { ry += thickness; rh -= thickness; }
    remaining -= rowSum;
    rest = rest.slice(row.length);
  }
  return out;
}

export function TreemapChart({
  data = [], colors, valueFormatter = v => String(v), height = 320,
  gap = 4, radius = 6, showValues = true, showShare = true,
  className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);

  const items = data.map((d, i) => ({ name:String(d.name), value:Number(d.value) || 0, color:hzColor(d.color || (colors && colors[i]), i) }))
    .sort((a, b) => b.value - a.value);
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  const tiles = width > 0 ? hzSquarify(items, 0, 0, width, height) : [];

  return React.createElement('div', { ref, className, style:{ position:'relative', width:'100%', height, fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    tiles.map((t, i) => React.createElement('div', { key:t.name + i,
      onMouseEnter:() => setHover(i), onMouseLeave:() => setHover(null),
      style:{ position:'absolute', left:t.x, top:t.y, width:Math.max(0, t.w - gap), height:Math.max(0, t.h - gap),
        background:t.color, borderRadius:radius, padding:'10px 12px', boxSizing:'border-box', overflow:'hidden',
        opacity:hover == null || hover === i ? 1 : .55, transition:'opacity .15s', cursor:'default' } },
      React.createElement('div', { style:{ fontSize:t.w > 130 && t.h > 60 ? 13 : 11, fontWeight:600, color:'#fff', lineHeight:1.25, textShadow:'0 1px 2px rgb(0 0 0/.15)' } }, t.name),
      showValues && t.h > 46 && React.createElement('div', { style:{ fontSize:12, color:'rgb(255 255 255/.88)', marginTop:2 } }, valueFormatter(t.value)),
      showShare && t.h > 70 && React.createElement('div', { style:{ fontSize:11, color:'rgb(255 255 255/.7)', marginTop:1 } }, ((t.value / total) * 100).toFixed(1) + '%'))));
}
