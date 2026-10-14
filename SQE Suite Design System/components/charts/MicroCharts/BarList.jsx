/**
 * BarList — ranked horizontal bars with inline labels. Horizon Design System.
 *   <BarList data={[{name:'/home', value:843}, …]} />
 */

const HZ_C = { blue:'#006CEB', teal:'#2CA7E4', purple:'#7C48E4', green:'#159367', orange:'#E45A18', magenta:'#E437AE', yellow:'#FFBF00', red:'#D92222', neutral:'#8490A1' };
const HZ_ORDER = ['blue','purple','teal','green','orange','magenta','yellow','red'];
function hzColor(c, i) { return HZ_C[c] || c || HZ_C[HZ_ORDER[i % HZ_ORDER.length]]; }

export function BarList({
  data = [], valueFormatter = v => String(v), color = 'blue', colors,
  sortOrder = 'descending', maxValue, barHeight = 32, gap = 8,
  showValues = true, className = '', style = {},
}) {
  const rows = React.useMemo(() => {
    const r = data.map((d, i) => ({ ...d, __i:i }));
    if (sortOrder === 'descending') r.sort((a, b) => b.value - a.value);
    if (sortOrder === 'ascending') r.sort((a, b) => a.value - b.value);
    return r;
  }, [JSON.stringify(data), sortOrder]);
  const max = maxValue != null ? maxValue : Math.max(...rows.map(r => Number(r.value) || 0), 1);

  return React.createElement('div', { className, style:{ display:'flex', flexDirection:'column', gap, fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    rows.map((r, i) => {
      const c = hzColor(r.color || (colors && colors[i]) || color, i);
      const pct = ((Number(r.value) || 0) / max) * 100;
      return React.createElement('div', { key:String(r.name) + i, style:{ display:'flex', alignItems:'center', gap:12 } },
        React.createElement('div', { style:{ position:'relative', flex:1, height:barHeight, borderRadius:'var(--hz-radius-md, 6px)', background:'var(--hz-neutral-100, #EDF0F5)', overflow:'hidden' } },
          React.createElement('div', { style:{ position:'absolute', inset:'0 auto 0 0', width:pct + '%', background:c, opacity:.22, transition:'width .3s ease' } }),
          React.createElement('div', { style:{ position:'absolute', inset:'0 auto 0 0', width:3, background:c } }),
          React.createElement('div', { style:{ position:'relative', height:'100%', display:'flex', alignItems:'center', padding:'0 12px', fontSize:13, color:'var(--hz-text-primary, #1E252E)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } },
            r.href ? React.createElement('a', { href:r.href, style:{ color:'inherit', textDecoration:'none' } }, r.name) : r.name)),
        showValues && React.createElement('div', { style:{ width:72, textAlign:'right', fontSize:13, fontWeight:600, color:'var(--hz-text-primary, #1E252E)', fontVariantNumeric:'tabular-nums' } }, valueFormatter(Number(r.value) || 0)));
    }));
}
