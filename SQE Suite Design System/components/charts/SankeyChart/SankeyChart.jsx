/**
 * SankeyChart — flow diagram (nodes + weighted links). Horizon Design System · MUI-inspired API.
 *
 *   <SankeyChart links={[{source:'Ads', target:'Signup', value:120}, …]} />
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
const HZ_TIP = {
  position:'absolute', pointerEvents:'none', zIndex:5, background:'var(--hz-surface-card, #fff)',
  border:'1px solid var(--hz-border-subtle, #D5DBE5)', borderRadius:'var(--hz-radius-lg, 8px)',
  boxShadow:'var(--hz-shadow-lg, 0 10px 15px -3px rgb(0 0 0/.1))', padding:'8px 10px',
  fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12, color:'var(--hz-text-primary, #1E252E)',
};

function hzSankeyLayout(links, nodesIn, w, h, nodeWidth, nodePadding) {
  const map = new Map();
  const touch = id => { if (!map.has(id)) map.set(id, { id, in:[], out:[], depth:0 }); return map.get(id); };
  (nodesIn || []).forEach(n => Object.assign(touch(n.id), n));
  links.forEach(l => { const s = touch(l.source), t = touch(l.target); s.out.push(l); t.in.push(l); });

  // longest-path depth
  const nodes = [...map.values()];
  for (let pass = 0; pass < nodes.length; pass++) {
    let moved = false;
    links.forEach(l => {
      const s = map.get(l.source), t = map.get(l.target);
      if (t.depth < s.depth + 1) { t.depth = s.depth + 1; moved = true; }
    });
    if (!moved) break;
  }
  const maxDepth = Math.max(...nodes.map(n => n.depth));
  // sinks pushed to last column
  nodes.forEach(n => { if (n.out.length === 0 && n.in.length) n.depth = maxDepth; });

  const cols = [];
  nodes.forEach(n => { (cols[n.depth] = cols[n.depth] || []).push(n); });
  nodes.forEach(n => {
    n.value = Math.max(n.in.reduce((a, l) => a + l.value, 0), n.out.reduce((a, l) => a + l.value, 0));
  });
  const colTotals = cols.map(c => c.reduce((a, n) => a + n.value, 0));
  const maxTotal = Math.max(...colTotals);
  const tallest = cols[colTotals.indexOf(maxTotal)] || [];
  const scale = (h - nodePadding * Math.max(0, tallest.length - 1)) / (maxTotal || 1);

  const colX = d => (cols.length <= 1 ? 0 : (d / (cols.length - 1)) * (w - nodeWidth));
  cols.forEach((col, d) => {
    const total = col.reduce((a, n) => a + n.value * scale, 0) + nodePadding * (col.length - 1);
    let y = (h - total) / 2;
    col.forEach((n, i) => {
      n.x = colX(d); n.h = Math.max(2, n.value * scale); n.y = y; n.idx = i; y += n.h + nodePadding;
    });
  });

  const laid = links.map((l, i) => ({ ...l, i }));
  const off = new Map();
  const take = (id, key, v) => { const k = id + '|' + key; const cur = off.get(k) || 0; off.set(k, cur + v); return cur; };
  cols.forEach(col => col.forEach(n => {
    n.out.slice().sort((a, b) => map.get(a.target).y - map.get(b.target).y).forEach(l => { l.__so = take(n.id, 'out', l.value * scale); });
  }));
  cols.forEach(col => col.forEach(n => {
    n.in.slice().sort((a, b) => map.get(a.source).y - map.get(b.source).y).forEach(l => { l.__ti = take(n.id, 'in', l.value * scale); });
  }));

  return { nodes, cols, links: laid.map(l => {
    const s = map.get(l.source), t = map.get(l.target);
    const orig = links[l.i];
    return { ...l, sy: s.y + (orig.__so || 0), ty: t.y + (orig.__ti || 0), th: Math.max(1, l.value * scale), sx: s.x + nodeWidth, tx: t.x, s, t };
  }) };
}

export function SankeyChart({
  links = [], nodes: nodesIn, colors, valueFormatter = v => String(v),
  height = 360, nodeWidth = 14, nodePadding = 18, linkOpacity = 0.32,
  linkColorMode = 'source', showLabels = true, showValues = true,
  className = '', style = {},
}) {
  const ref = React.useRef(null);
  const width = hzUseWidth(ref);
  const [hover, setHover] = React.useState(null);
  const pad = { t:10, r:110, b:10, l:8 };
  const w = Math.max(0, width - pad.l - pad.r), h = Math.max(0, height - pad.t - pad.b);

  const layout = React.useMemo(
    () => (w > 0 ? hzSankeyLayout(links.map(l => ({ ...l })), nodesIn, w, h, nodeWidth, nodePadding) : null),
    [JSON.stringify(links), JSON.stringify(nodesIn), w, h, nodeWidth, nodePadding]);

  const colorOf = n => hzColor(n.color || (colors && colors[layout.nodes.indexOf(n) % (colors.length || 1)]), layout.nodes.indexOf(n));

  return React.createElement('div', { ref, className, style:{ position:'relative', width:'100%', fontFamily:"var(--hz-font-sans, Inter, sans-serif)", ...style } },
    layout && React.createElement('svg', { width:'100%', height, style:{ display:'block', overflow:'visible' } },
      React.createElement('g', { transform:`translate(${pad.l},${pad.t})` },
        layout.links.map((l, i) => {
          const x0 = l.sx, x1 = l.tx, cx = (x0 + x1) / 2;
          const c = linkColorMode === 'target' ? colorOf(l.t) : colorOf(l.s);
          const d = `M${x0},${l.sy}C${cx},${l.sy} ${cx},${l.ty} ${x1},${l.ty}` +
                    `L${x1},${l.ty + l.th}C${cx},${l.ty + l.th} ${cx},${l.sy + l.th} ${x0},${l.sy + l.th}Z`;
          const on = hover && hover.type === 'link' && hover.i === i;
          const dim = hover && !(on || (hover.type === 'node' && (hover.id === l.source || hover.id === l.target)));
          return React.createElement('path', { key:i, d, fill:c, fillOpacity:dim ? .08 : on ? .6 : linkOpacity,
            style:{ transition:'fill-opacity .15s' },
            onMouseEnter:() => setHover({ type:'link', i, l }), onMouseLeave:() => setHover(null) });
        }),
        layout.nodes.map(n => React.createElement('g', { key:n.id,
          onMouseEnter:() => setHover({ type:'node', id:n.id, n }), onMouseLeave:() => setHover(null) },
          React.createElement('rect', { x:n.x, y:n.y, width:nodeWidth, height:n.h, rx:3, fill:colorOf(n),
            opacity:hover && hover.type === 'node' && hover.id !== n.id ? .45 : 1 }),
          showLabels && React.createElement('text', {
            x:n.x + (n.out.length === 0 ? nodeWidth + 10 : n.in.length === 0 ? nodeWidth + 10 : nodeWidth + 10),
            y:n.y + n.h / 2 + 4, fontFamily:"var(--hz-font-sans, Inter, sans-serif)", fontSize:12,
            fontWeight:600, fill:'var(--hz-text-primary, #1E252E)' }, n.label || n.id),
          showLabels && showValues && React.createElement('text', {
            x:n.x + nodeWidth + 10, y:n.y + n.h / 2 + 18, fontFamily:"var(--hz-font-sans, Inter, sans-serif)",
            fontSize:11, fill:'var(--hz-text-tertiary, #8490A1)' }, valueFormatter(n.value)))))),
    hover && React.createElement('div', { style:{ ...HZ_TIP, left:12, top:8 } },
      hover.type === 'link'
        ? React.createElement('span', null,
            React.createElement('b', null, hover.l.source), ' → ', React.createElement('b', null, hover.l.target),
            React.createElement('span', { style:{ color:'var(--hz-text-tertiary,#8490A1)' } }, '  ' + valueFormatter(hover.l.value)))
        : React.createElement('span', null, React.createElement('b', null, hover.n.label || hover.n.id),
            React.createElement('span', { style:{ color:'var(--hz-text-tertiary,#8490A1)' } }, '  ' + valueFormatter(hover.n.value)))));
}
