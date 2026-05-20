import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useContent } from '../contexts/ContentContext'
import { useAuth } from '../contexts/AuthContext'
import { Header } from '../components/Header'
import { Footer, ContentCard } from '../components/shared'

export function MovieDetailPage() {
  const { id } = useParams()
  const { contents } = useContent()
  const { user, isAuth, addList, removeList, addFav, removeFav } = useAuth()
  const navigate = useNavigate()
  const [season, setSeason] = useState(0)

  const content = contents.find(c => c.id === Number(id))
  if (!content) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <i className="fa-solid fa-film" style={{ fontSize:60, color:'var(--text2)', display:'block', marginBottom:16 }}></i>
        <p style={{ color:'var(--text)', fontSize:20, fontWeight:700, marginBottom:12 }}>Content not found</p>
        <Link to="/" style={{ color:'#ef4444', fontWeight:600 }}>← Back to Home</Link>
      </div>
    </div>
  )

  const related = contents.filter(c => c.genre===content.genre && c.id!==content.id).slice(0,6)
  const inList  = user?.myList?.includes(content.id)
  const inFav   = user?.favorites?.includes(content.id)

  const share = () => { navigator.clipboard?.writeText(window.location.href); alert('Link copied!') }

  const btnBase: React.CSSProperties = { display:'flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:10, fontWeight:700, fontSize:14, cursor:'pointer', border:'none', transition:'all .2s' }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Header />

      {/* Hero */}
      <div style={{ position:'relative', minHeight:'75vh' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${content.backgroundImage||content.image})`, backgroundSize:'cover', backgroundPosition:'center' }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.98) 0%, transparent 50%)' }} />
        </div>

        <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'32px 24px 60px' }}>
          <button onClick={() => navigate(-1)}
            style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', background:'rgba(255,255,255,0.1)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', cursor:'pointer', marginBottom:40, fontSize:13 }}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div style={{ display:'flex', flexWrap:'wrap', gap:36, alignItems:'flex-start' }}>
            {/* Poster */}
            <img src={content.image} alt={content.title}
              style={{ width:200, borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.7)', border:'1px solid var(--border)', flexShrink:0 }} />

            {/* Info */}
            <div style={{ flex:1, minWidth:260 }}>
              {/* Badges */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:14 }}>
                <span style={{ padding:'4px 12px', background:'#ef4444', color:'#fff', borderRadius:20, fontSize:11, fontWeight:800 }}>
                  {content.type==='movie'?'🎬 Movie':'📺 Series'}
                </span>
                {content.isHot && <span style={{ padding:'4px 12px', background:'rgba(249,115,22,0.2)', color:'#fb923c', borderRadius:20, fontSize:11, fontWeight:700, border:'1px solid rgba(249,115,22,0.4)' }}>🔥 HOT</span>}
                {content.isNew && <span style={{ padding:'4px 12px', background:'rgba(34,197,94,0.2)', color:'#4ade80', borderRadius:20, fontSize:11, fontWeight:700, border:'1px solid rgba(34,197,94,0.4)' }}>⚡ NEW</span>}
              </div>

              <h1 style={{ fontSize:'clamp(24px,4vw,48px)', fontWeight:900, color:'#fff', marginBottom:14, lineHeight:1.1 }}>{content.title}</h1>

              {/* Meta */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:16, color:'rgba(255,255,255,0.65)', fontSize:13 }}>
                <span><i className="fa-solid fa-star" style={{ color:'#facc15', marginRight:4 }}></i><b style={{ color:'#fff' }}>{content.rating}</b>/10</span>
                <span><i className="fa-solid fa-calendar" style={{ marginRight:4 }}></i>{content.year}</span>
                {content.duration && <span><i className="fa-solid fa-clock" style={{ marginRight:4 }}></i>{content.duration}</span>}
              </div>

              <p style={{ color:'rgba(255,255,255,0.75)', lineHeight:1.7, marginBottom:20, maxWidth:600 }}>{content.description}</p>

              {/* Credits */}
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
                <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
                  <span style={{ color:'var(--text2)', fontSize:13, fontWeight:600, minWidth:70 }}>Director</span>
                  <Link to={`/director/${encodeURIComponent(content.director)}`}
                    style={{ color:'#f87171', fontSize:13, fontWeight:600 }}>{content.director}</Link>
                </div>
                <div style={{ display:'flex', gap:12, alignItems:'flex-start', flexWrap:'wrap' }}>
                  <span style={{ color:'var(--text2)', fontSize:13, fontWeight:600, minWidth:70 }}>Cast</span>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {content.cast.map(a => (
                      <Link key={a} to={`/cast/${encodeURIComponent(a)}`}
                        style={{ padding:'3px 10px', background:'rgba(255,255,255,0.08)', border:'1px solid var(--border)', borderRadius:20, color:'rgba(255,255,255,0.75)', fontSize:12 }}>{a}</Link>
                    ))}
                  </div>
                </div>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <span style={{ color:'var(--text2)', fontSize:13, fontWeight:600, minWidth:70 }}>Genre</span>
                  <span style={{ padding:'3px 12px', background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:20, color:'#fca5a5', fontSize:12, fontWeight:600 }}>{content.genre}</span>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                <a href={content.watchLink||'#'} target="_blank" rel="noopener noreferrer"
                  style={{ ...btnBase, background:'#ef4444', color:'#fff', boxShadow:'0 6px 20px rgba(239,68,68,0.35)' }}>
                  <i className="fa-solid fa-play"></i> Watch Now
                </a>
                <button onClick={() => isAuth ? (inList ? removeList(content.id) : addList(content.id)) : navigate('/login')}
                  style={{ ...btnBase, background: inList?'#ef4444':'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid '+(inList?'#ef4444':'rgba(255,255,255,0.2)') }}>
                  <i className={`fa-solid ${inList?'fa-check':'fa-plus'}`}></i> {inList?'In My List':'My List'}
                </button>
                <button onClick={() => isAuth ? (inFav ? removeFav(content.id) : addFav(content.id)) : navigate('/login')}
                  style={{ ...btnBase, background: inFav?'#ef4444':'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid '+(inFav?'#ef4444':'rgba(255,255,255,0.2)'), padding:'12px 16px' }}>
                  <i className="fa-solid fa-heart"></i>
                </button>
                <button onClick={share}
                  style={{ ...btnBase, background:'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', padding:'12px 16px' }}>
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons */}
      {content.type==='series' && content.seasons && content.seasons.length > 0 && (
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 24px' }}>
          <h2 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
            <i className="fa-solid fa-list-ol" style={{ color:'#ef4444' }}></i> Seasons & Episodes
          </h2>
          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
            {content.seasons.map((s, i) => (
              <button key={s.id} onClick={() => setSeason(i)}
                style={{ padding:'8px 18px', borderRadius:10, fontWeight:700, fontSize:13, cursor:'pointer', border:'none', background: season===i?'#ef4444':'rgba(255,255,255,0.08)', color: season===i?'#fff':'var(--text2)', transition:'all .2s' }}>
                {s.title}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {content.seasons[season]?.episodes?.length === 0 ? (
              <p style={{ color:'var(--text2)', padding:'40px 0', textAlign:'center' }}>No episodes yet.</p>
            ) : content.seasons[season]?.episodes?.map(ep => (
              <Link key={ep.id} to={`/episode/${ep.id}`} state={{ episode:ep, seriesTitle:content.title, seasonTitle:content.seasons![season].title }}
                style={{ display:'flex', alignItems:'center', gap:14, padding:14, background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:12, transition:'all .2s' }}>
                <div style={{ width:90, height:60, borderRadius:8, overflow:'hidden', flexShrink:0, background:'#111' }}>
                  <img src={ep.thumbnail} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4 }}>
                    <span style={{ color:'var(--text2)', fontSize:11, fontWeight:700 }}>EP {ep.number}</span>
                    <span style={{ color:'var(--text)', fontSize:13, fontWeight:600 }}>{ep.title}</span>
                  </div>
                  <p style={{ color:'var(--text2)', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{ep.description}</p>
                  <div style={{ display:'flex', gap:12, marginTop:4, color:'var(--text2)', fontSize:11 }}>
                    <span><i className="fa-solid fa-clock" style={{ marginRight:4 }}></i>{ep.duration}</span>
                    <span><i className="fa-solid fa-star" style={{ color:'#facc15', marginRight:4 }}></i>{ep.rating}</span>
                  </div>
                </div>
                <i className="fa-solid fa-play" style={{ color:'var(--text2)', flexShrink:0 }}></i>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* More Like This */}
      {related.length > 0 && (
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px 24px 60px' }}>
          <h2 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
            <i className="fa-solid fa-layer-group" style={{ color:'#ef4444' }}></i> More Like This
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:12 }}>
            {related.map(c => <ContentCard key={c.id} content={c} />)}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
