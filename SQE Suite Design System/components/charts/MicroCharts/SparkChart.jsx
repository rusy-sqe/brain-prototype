/**
 * SparkChart — axis-free micro chart for KPI cards. Horizon Design System.
 *   <SparkChart data={rows} index="date" categories={['Revenue']} type="area" />
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
function hzSmoothPath(pts) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function SparkChart({
  data = [], index, categories = [], colors, type = 'area',
  height = 56, curve = 'smooth', strokeWidth = 2, showLastDot = false,
  fill = 'gradient', className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const uid = React.useMemo(() => 'hzsp' + Math.random().toString(36).slice(2, 8), []);
  const pad = 3;
  const w = Math.max(0, width - pad * 2), h = Math.max(0, height - pad * 2);
  const series = categories.map((c, i) => ({ key:c, color:hzColor(colors && colors[i], i) }));
  const nums = data.flatMap(r => categories.map(c => Number(r[c]) || 0));
  const lo = Math.min(...nums, 0), hi = Math.max(...nums, 0);
  const yS = v => h - ((v - lo) / ((hi - lo) || 1)) * h;
  const xS = i => (data.length <= 1 ? w / 2 : (i / (data.length - 1)) * w);

  return React.createElement('div', { ref, className, style:{ width:'100%', height, ...style } },
    width > 0 && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
      React.createElement('defs', null, series.map(s =>
        React.createElement('linearGradient', { key:s.key, id:`${uid}-${s.key.replace(/\W/g,'')}`, x1:0, y1:0, x2:0, y2:1 },
          React.createElement('stop', { offset:'0%', stopColor:s.color, stopOpacity:.32 }),
          React.createElement('stop', { offset:'100%', stopColor:s.color, stopOpacity:.02 })))),
      React.createElement('g', { transform:`translate(${pad},${pad})` },
        type === 'bar'
          ? series.map((s, si) => data.map((r, i) => {
              const bw = Math.max(1, (w / Math.max(1, data.length)) / series.length - 2);
              const v = Number(r[s.key]) || 0, top = yS(v);
              return React.createElement('rect', { key:s.key + i, x:(w / data.length) * i + si * (bw + 1), y:Math.min(top, h - 1), width:bw, height:Math.max(1, h - top), rx:2, fill:s.color });
            }))
          : series.map(s => {
              const pts = data.map((r, i) => [xS(i), yS(Number(r[s.key]) || 0)]);
              const line = curve === 'smooth' ? hzSmoothPath(pts) : 'M' + pts.map(p => p.join(',')).join('L');
              return React.createElement('g', { key:s.key },
                type === 'area' && fill !== 'none' && React.createElement('path', {
                  d:`${line}L${w},${h}L0,${h}Z`,
                  fill: fill === 'gradient' ? `url(#${uid}-${s.key.replace(/\W/g,'')})` : s.color, fillOpacity: fill === 'gradient' ? 1 : .18 }),
                React.createElement('path', { d:line, fill:'none', stroke:s.color, strokeWidth, strokeLinecap:'round', strokeLinejoin:'round' }),
                showLastDot && pts.length > 0 && React.createElement('circle', { cx:pts[pts.length - 1][0], cy:pts[pts.length - 1][1], r:3, fill:s.color }));
            }))));
}
