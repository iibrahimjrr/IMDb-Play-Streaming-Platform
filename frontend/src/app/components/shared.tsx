import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { Content } from '../contexts/ContentContext'


// ── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const sections = [
    {
      title: 'Pages',
      links: [
        { name: 'Movies', path: '/movies' },
        { name: 'Series', path: '/series' },
        { name: 'Trending', path: '/trending' },
        { name: 'Top Rated', path: '/top-rated' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Account', path: '/profile' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/Privacy_Policy' },
        { name: 'Terms of Service', path: '/Terms' },
        { name: 'Cookies', path: '/Cookies' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'iOS App', path: '/soon' },
        { name: 'Android App', path: '/soon' },
        { name: 'Smart TV', path: '/soon' },
      ],
    },
  ]

  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid var(--border)',
        marginTop: 60,
        padding: '48px 24px 24px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top Sections */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginBottom: 40 }}>
          {sections.map((section) => (
            <div key={section.title} style={{ minWidth: 140 }}>
              <p
                style={{
                  color: 'var(--text)',
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 14,
                }}
              >
                {section.title}
              </p>

              {section.links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    display: 'block',
                    color: 'var(--text2)',
                    fontSize: 13,
                    marginBottom: 8,
                    textDecoration: 'none',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <i
              className="fa-solid fa-clapperboard"
              style={{ color: '#ef4444', fontSize: 20 }}
            ></i>

            <span style={{ fontWeight: 800, color: 'var(--text)', fontSize: 16 }}>
              IMDb <span style={{ color: '#ef4444' }}>Play</span>
            </span>
          </div>

          <p style={{ color: 'var(--text2)', fontSize: 13 }}>
            © {new Date().getFullYear()} Created by{' '}
            <a
              href="https://github.com/iibrahimjrr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ef4444', fontWeight: 700 }}
            >
              Ibrahim Elsayed
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export function Hero({ content }: { content: Content }) {
  return (
    <div style={{ position:'relative', height:'75vh', overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`url(${content.backgroundImage||content.image})`,
        backgroundSize:'cover', backgroundPosition:'center',
        transform:'scale(1.05)', transition:'transform 8s ease',
      }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)' }} />
      </div>

      <div style={{ position:'relative', height:'100%', display:'flex', alignItems:'center' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', width:'100%' }}>
          <div style={{ maxWidth:580 }} className="fade-in">
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
              <span style={{ padding:'4px 12px', background:'#ef4444', color:'#fff', borderRadius:20, fontSize:11, fontWeight:800, letterSpacing:1 }}>✦ FEATURED</span>
              <span style={{ padding:'4px 12px', background:'rgba(255,255,255,0.12)', color:'#fff', borderRadius:20, fontSize:11, fontWeight:600, border:'1px solid rgba(255,255,255,0.2)' }}>
                {content.type==='movie'?'🎬 Movie':'📺 Series'}
              </span>
              {content.isNew && <span style={{ padding:'4px 12px', background:'rgba(34,197,94,0.2)', color:'#4ade80', borderRadius:20, fontSize:11, fontWeight:700, border:'1px solid rgba(34,197,94,0.3)' }}>⚡ NEW</span>}
              {content.isHot && <span style={{ padding:'4px 12px', background:'rgba(249,115,22,0.2)', color:'#fb923c', borderRadius:20, fontSize:11, fontWeight:700, border:'1px solid rgba(249,115,22,0.3)' }}>🔥 HOT</span>}
            </div>

            <h1 style={{ fontSize:'clamp(28px,5vw,56px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:16 }}>{content.title}</h1>

            <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:16, color:'rgba(255,255,255,0.7)', fontSize:13 }}>
              <span><i className="fa-solid fa-star" style={{ color:'#facc15', marginRight:4 }}></i><b style={{ color:'#fff' }}>{content.rating}</b>/10</span>
              <span><i className="fa-solid fa-calendar" style={{ marginRight:4 }}></i>{content.year}</span>
              {content.duration && <span><i className="fa-solid fa-clock" style={{ marginRight:4 }}></i>{content.duration}</span>}
              <span style={{ padding:'2px 10px', background:'rgba(239,68,68,0.15)', color:'#fca5a5', borderRadius:12, border:'1px solid rgba(239,68,68,0.3)', fontSize:12 }}>{content.genre}</span>
            </div>

            <p style={{ color:'rgba(255,255,255,0.75)', fontSize:15, lineHeight:1.7, marginBottom:24, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
              {content.description}
            </p>

            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link to={`/title/${content.id}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 28px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, boxShadow:'0 8px 24px rgba(239,68,68,0.35)' }}>
                <i className="fa-solid fa-play"></i> Play Now
              </Link>
              <Link to={`/title/${content.id}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 28px', background:'rgba(255,255,255,0.12)', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(8px)' }}>
                <i className="fa-solid fa-circle-info"></i> More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── ContentCard ───────────────────────────────────────────────────────────────
export function ContentCard({ content }: { content: Content }) {
  const [hovered, setHovered] = useState(false)
  const { user, isAuth, addList, removeList, addFav, removeFav } = useAuth()
  const navigate = useNavigate()

  const inList = user?.myList?.includes(content.id)
  const inFav  = user?.favorites?.includes(content.id)

  return (
    <Link to={`/title/${content.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:'block', borderRadius:10, overflow:'hidden', position:'relative',
        aspectRatio:'2/3', flexShrink:0, width:'100%',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition:'transform .3s ease, box-shadow .3s ease',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.6)' : '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: hovered ? 2 : 1,
      }}>
      <img src={content.image} alt={content.title}
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .5s ease', transform: hovered?'scale(1.08)':'scale(1)' }} />

      {/* Always visible gradient + title */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 55%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'10px 10px 10px' }}>
        <p style={{ color:'#fff', fontWeight:600, fontSize:12, marginBottom:4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{content.title}</p>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          <i className="fa-solid fa-star" style={{ color:'#facc15', fontSize:10 }}></i>
          <span style={{ color:'#facc15', fontSize:11, fontWeight:700 }}>{content.rating}</span>
          <span style={{ color:'rgba(255,255,255,0.5)', fontSize:10 }}>· {content.year}</span>
        </div>
      </div>

      {/* Badges */}
      <div style={{ position:'absolute', top:8, left:8, display:'flex', flexDirection:'column', gap:4 }}>
        {content.isNew && <span style={{ padding:'2px 6px', background:'#ef4444', color:'#fff', borderRadius:4, fontSize:9, fontWeight:800 }}>NEW</span>}
        {content.isHot && !content.isNew && <span style={{ padding:'2px 6px', background:'#f97316', color:'#fff', borderRadius:4, fontSize:9, fontWeight:800 }}>HOT</span>}
      </div>

      {/* Hover actions */}
      {hovered && (
        <div style={{ position:'absolute', bottom:60, left:8, right:8, display:'flex', gap:6 }}>
          <button onClick={e => { e.preventDefault(); navigate(`/title/${content.id}`) }}
            style={{ width:32, height:32, borderRadius:'50%', background:'#fff', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <i className="fa-solid fa-play" style={{ color:'#000', fontSize:11 }}></i>
          </button>
          {isAuth && (
            <>
              <button onClick={e => { e.preventDefault(); inList ? removeList(content.id) : addList(content.id) }}
                style={{ width:32, height:32, borderRadius:'50%', background: inList?'#ef4444':'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.4)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <i className={`fa-solid ${inList?'fa-check':'fa-plus'}`} style={{ color:'#fff', fontSize:11 }}></i>
              </button>
              <button onClick={e => { e.preventDefault(); inFav ? removeFav(content.id) : addFav(content.id) }}
                style={{ width:32, height:32, borderRadius:'50%', background: inFav?'#ef4444':'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.4)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <i className="fa-solid fa-heart" style={{ color:'#fff', fontSize:11 }}></i>
              </button>
            </>
          )}
        </div>
      )}
    </Link>
  )
}

// ── ContentRow ────────────────────────────────────────────────────────────────
export function ContentRow({ title, items }: { title: string; items: Content[] }) {
  const ref = useRef<HTMLDivElement>(null)
  if (!items.length) return null
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 220, behavior:'smooth' })
  return (
    <div style={{ marginBottom:40 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', marginBottom:16 }}>
        <h2 style={{ color:'var(--text)', fontSize:20, fontWeight:800 }}>
          {title} <span style={{ color:'var(--text2)', fontSize:14, fontWeight:400 }}>({items.length})</span>
        </h2>
      </div>
      <div style={{ position:'relative', padding:'0 24px' }}>
        <button onClick={() => scroll(-1)} style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', zIndex:10, width:36, height:36, borderRadius:'50%', background:'rgba(0,0,0,0.7)', border:'1px solid var(--border)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <i className="fa-solid fa-chevron-left" style={{ fontSize:12 }}></i>
        </button>
        <div ref={ref} className="no-scroll" style={{ display:'flex', gap:10, overflowX:'auto', scrollBehavior:'smooth' }}>
          {items.map(c => (
            <div key={c.id} style={{ flexShrink:0, width:150 }}>
              <ContentCard content={c} />
            </div>
          ))}
        </div>
        <button onClick={() => scroll(1)} style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)', zIndex:10, width:36, height:36, borderRadius:'50%', background:'rgba(0,0,0,0.7)', border:'1px solid var(--border)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <i className="fa-solid fa-chevron-right" style={{ fontSize:12 }}></i>
        </button>
      </div>
    </div>
  )
}

// ── GenreChips ─────────────────────────────────────────────────────────────────
const GENRE_ICONS: Record<string,string> = { Action:'fa-explosion', Comedy:'fa-face-laugh-beam', Drama:'fa-masks-theater', 'Sci-Fi':'fa-rocket', Thriller:'fa-skull', Horror:'fa-ghost' }

export function GenreChips({ genres, selected, onSelect }: { genres:string[]; selected:string|null; onSelect(g:string|null):void }) {
  return (
    <div className="no-scroll" style={{ display:'flex', gap:8, overflowX:'auto', padding:'0 0 4px' }}>
      {[null, ...genres].map(g => (
        <button key={g??'all'} onClick={() => onSelect(g===selected ? null : g)}
          style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:20, whiteSpace:'nowrap', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all .2s', border: selected===g ? 'none' : '1px solid var(--border)', background: selected===g ? '#ef4444' : 'rgba(255,255,255,0.06)', color: selected===g ? '#fff' : 'var(--text2)', boxShadow: selected===g ? '0 4px 14px rgba(239,68,68,0.3)' : 'none' }}>
          {g ? <i className={`fa-solid ${GENRE_ICONS[g]||'fa-tag'}`} style={{ fontSize:11 }}></i> : <i className="fa-solid fa-border-all" style={{ fontSize:11 }}></i>}
          {g ?? 'All Genres'}
        </button>
      ))}
    </div>
  )
}
