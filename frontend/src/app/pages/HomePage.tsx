import { useState } from 'react'
import { useContent } from '../contexts/ContentContext'
import { Header } from '../components/Header'
import { Hero, Footer, ContentRow, GenreChips, ContentCard } from '../components/shared'

const GENRES = ['Action','Comedy','Drama','Sci-Fi','Thriller','Horror']

export function HomePage() {
  const [genre, setGenre] = useState<string|null>(null)
  const { contents, loading, getFeatured } = useContent()

  const featured  = getFeatured()
  const trending  = contents.filter(c => c.trending || c.isHot || c.isNew)
  const topRated  = contents.filter(c => c.topRated).sort((a,b) => b.rating - a.rating)
  const movies    = contents.filter(c => c.type==='movie')
  const series    = contents.filter(c => c.type==='series')

  const filtered = genre ? contents.filter(c => c.genre===genre) : null

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Header />

      {!genre && featured && <Hero content={featured} />}

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'24px 24px 0' }}>
        <GenreChips genres={GENRES} selected={genre} onSelect={setGenre} />
      </div>

      {loading && (
        <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text2)' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize:28, marginBottom:12, display:'block' }}></i>
          Loading content...
        </div>
      )}

      {genre ? (
        <div style={{ maxWidth:1280, margin:'24px auto', padding:'0 24px 60px' }}>
          <h2 style={{ color:'var(--text)', fontSize:22, fontWeight:800, marginBottom:20 }}>{genre}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:12 }}>
            {(filtered||[]).map(c => <ContentCard key={c.id} content={c} />)}
          </div>
          {!filtered?.length && <p style={{ color:'var(--text2)', textAlign:'center', padding:'60px 0' }}>No content found in {genre}.</p>}
        </div>
      ) : (
        <div style={{ paddingBottom:20 }}>
          {trending.length > 0 && <ContentRow title="🔥 Trending Now" items={trending} />}
          {topRated.length > 0 && <ContentRow title="⭐ Top Rated"    items={topRated} />}
          {movies.length   > 0 && <ContentRow title="🎬 Movies"       items={movies} />}
          {series.length   > 0 && <ContentRow title="📺 TV Series"    items={series} />}
          {GENRES.map(g => {
            const gi = contents.filter(c => c.genre===g)
            return gi.length ? <ContentRow key={g} title={g} items={gi} /> : null
          })}
        </div>
      )}

      <Footer />
    </div>
  )
}
