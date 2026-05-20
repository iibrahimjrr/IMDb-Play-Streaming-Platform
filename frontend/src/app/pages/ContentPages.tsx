import { useState } from 'react'
import { useContent } from '../contexts/ContentContext'
import { Header } from '../components/Header'
import { Footer, ContentCard, GenreChips } from '../components/shared'

const GENRES = ['Action','Comedy','Drama','Sci-Fi','Thriller','Horror']

function PageShell({ title, icon, children }: any) {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Header />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 24px 60px' }}>
        <h1 style={{ color:'var(--text)', fontSize:32, fontWeight:900, marginBottom:24, display:'flex', alignItems:'center', gap:12 }}>
          <i className={`fa-solid ${icon}`} style={{ color:'#ef4444' }}></i> {title}
        </h1>
        {children}
      </div>
      <Footer />
    </div>
  )
}

function Grid({ items }: { items: any[] }) {
  if (!items.length) return <p style={{ color:'var(--text2)', textAlign:'center', padding:'60px 0' }}>No content found.</p>
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:14 }}>
      {items.map(c => <ContentCard key={c.id} content={c} />)}
    </div>
  )
}

export function MoviesPage() {
  const [genre, setGenre] = useState<string|null>(null)
  const { contents } = useContent()
  const items = contents.filter(c => c.type==='movie' && (!genre || c.genre===genre))
  return (
    <PageShell title="Movies" icon="fa-film">
      <div style={{ marginBottom:24 }}><GenreChips genres={GENRES} selected={genre} onSelect={setGenre} /></div>
      <Grid items={items} />
    </PageShell>
  )
}

export function SeriesPage() {
  const [genre, setGenre] = useState<string|null>(null)
  const { contents } = useContent()
  const items = contents.filter(c => c.type==='series' && (!genre || c.genre===genre))
  return (
    <PageShell title="TV Series" icon="fa-tv">
      <div style={{ marginBottom:24 }}><GenreChips genres={GENRES} selected={genre} onSelect={setGenre} /></div>
      <Grid items={items} />
    </PageShell>
  )
}

export function TrendingPage() {
  const { contents } = useContent()
  const items = contents.filter(c => c.trending || c.isHot || c.isNew)
  return (
    <PageShell title="Trending Now" icon="fa-fire">
      <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
        <span style={{ padding:'6px 14px', background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:20, color:'#f87171', fontSize:12, fontWeight:700 }}>⚡ NEW</span>
        <span style={{ padding:'6px 14px', background:'rgba(249,115,22,0.15)', border:'1px solid rgba(249,115,22,0.3)', borderRadius:20, color:'#fb923c', fontSize:12, fontWeight:700 }}>🔥 HOT</span>
      </div>
      <Grid items={items} />
    </PageShell>
  )
}

export function TopRatedPage() {
  const [genre, setGenre] = useState<string|null>(null)
  const { contents } = useContent()
  const items = [...contents].filter(c => !genre || c.genre===genre).sort((a,b) => b.rating - a.rating).filter(c => c.rating >= 7.5)

  return (
    <PageShell title="Top Rated" icon="fa-star">
      {/* Top 3 spotlight */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:16, marginBottom:32 }}>
        {items.slice(0,3).map((c, i) => (
          <div key={c.id} style={{ position:'relative', borderRadius:14, overflow:'hidden', height:180, cursor:'pointer' }}
            onClick={() => window.location.href=`/title/${c.id}`}>
            <img src={c.image} alt={c.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
            <div style={{ position:'absolute', top:12, left:12, fontSize:48, fontWeight:900, color:'rgba(255,255,255,0.15)' }}>#{i+1}</div>
            <div style={{ position:'absolute', bottom:12, left:12 }}>
              <p style={{ color:'#fff', fontWeight:700, fontSize:14 }}>{c.title}</p>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:12 }}>⭐ {c.rating} · {c.year}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom:24 }}><GenreChips genres={GENRES} selected={genre} onSelect={setGenre} /></div>
      <Grid items={items} />
    </PageShell>
  )
}
