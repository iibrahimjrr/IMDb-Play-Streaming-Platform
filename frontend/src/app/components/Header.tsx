import { useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useContent } from '../contexts/ContentContext'

export function Header() {
  const [search,     setSearch]     = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [userMenu,   setUserMenu]   = useState(false)
  const { user, isAuth, logout }    = useAuth()
  const { theme, toggle }           = useTheme()
  const { contents }                = useContent()
  const navigate   = useNavigate()
  const location   = useLocation()

  const nav = [
    { to:'/',          label:'Home',      icon:'fa-house' },
    { to:'/movies',    label:'Movies',    icon:'fa-film' },
    { to:'/series',    label:'TV Series', icon:'fa-tv' },
    { to:'/trending',  label:'Trending',  icon:'fa-fire' },
    { to:'/top-rated', label:'Top Rated', icon:'fa-star' },
  ]

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const suggestions = search.length > 1
    ? contents.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
    : []

  const handleLogout = () => { logout(); setUserMenu(false); navigate('/') }

  return (
    <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(10,10,10,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>

        {/* Logo + Nav */}
        <div style={{ display:'flex', alignItems:'center', gap:32 }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:8 }}>
            <i className="fa-solid fa-clapperboard" style={{ color:'#ef4444', fontSize:22 }}></i>
            <span style={{ fontWeight:800, fontSize:18, color:'var(--text)', letterSpacing:'-0.5px' }}>
              IMDb <span style={{ color:'#ef4444' }}>Play</span>
            </span>
          </Link>

          <nav style={{ display:'flex', gap:4 }} className="desktop-nav">
            {nav.map(n => (
              <Link key={n.to} to={n.to} style={{
                display:'flex', alignItems:'center', gap:6, padding:'6px 14px',
                borderRadius:8, fontSize:13, fontWeight:500, transition:'all .2s',
                background: isActive(n.to) ? '#ef4444' : 'transparent',
                color: isActive(n.to) ? '#fff' : 'var(--text2)',
              }}>
                <i className={`fa-solid ${n.icon}`} style={{ fontSize:11 }}></i>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* Search */}
          <div style={{ position:'relative' }}>
            <i className="fa-solid fa-search" style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text2)', fontSize:13 }}></i>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              style={{ paddingLeft:32, paddingRight:12, paddingTop:8, paddingBottom:8, background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:13, width:200, outline:'none' }}
            />
            {suggestions.length > 0 && (
              <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, right:0, background:'#1a1a1a', border:'1px solid var(--border)', borderRadius:10, overflow:'hidden', zIndex:100 }}>
                {suggestions.map(s => (
                  <Link key={s.id} to={`/title/${s.id}`} onClick={() => setSearch('')}
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderBottom:'1px solid var(--border)' }}>
                    <img src={s.image} alt="" style={{ width:36, height:50, objectFit:'cover', borderRadius:4 }} />
                    <div>
                      <div style={{ color:'var(--text)', fontSize:13, fontWeight:600 }}>{s.title}</div>
                      <div style={{ color:'var(--text2)', fontSize:11 }}>{s.year} · {s.type}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme */}
          <button onClick={toggle} style={{ padding:8, background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', cursor:'pointer', fontSize:14 }}>
            <i className={`fa-solid ${theme==='dark'?'fa-sun':'fa-moon'}`}></i>
          </button>

          {/* Auth */}
          {isAuth ? (
            <div style={{ position:'relative' }}>
              <button onClick={() => setUserMenu(v => !v)}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 12px', background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, cursor:'pointer' }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#ef4444,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <i className="fa-solid fa-user" style={{ color:'#fff', fontSize:12 }}></i>
                </div>
                <span style={{ color:'var(--text)', fontSize:13, fontWeight:600 }}>{user?.name?.split(' ')[0]}</span>
                <i className="fa-solid fa-chevron-down" style={{ color:'var(--text2)', fontSize:10 }}></i>
              </button>

              {userMenu && (
                <>
                  <div onClick={() => setUserMenu(false)} style={{ position:'fixed', inset:0, zIndex:40 }} />
                  <div style={{ position:'absolute', right:0, top:'calc(100%+8px)', width:220, background:'#1a1a1a', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', zIndex:50, marginTop:8 }}>
                    <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--border)', background:'rgba(239,68,68,0.08)' }}>
                      <div style={{ color:'var(--text)', fontWeight:700, fontSize:14 }}>{user?.name}</div>
                      <div style={{ color:'var(--text2)', fontSize:12, marginTop:2 }}>{user?.email}</div>
                      <span style={{ display:'inline-block', marginTop:6, padding:'2px 8px', borderRadius:20, fontSize:11, fontWeight:700, background: user?.role==='admin'?'rgba(239,68,68,0.2)':'rgba(59,130,246,0.2)', color: user?.role==='admin'?'#f87171':'#60a5fa' }}>
                        {user?.role==='admin'?'⚡ Admin':'👤 Member'}
                      </span>
                    </div>
                    {[
                      { to:'/dashboard', icon:'fa-gauge',         label:'Dashboard' },
                      { to:'/profile',   icon:'fa-user',          label:'Profile' },
                      { to:'/settings',  icon:'fa-gear',          label:'Settings' },
                      ...(user?.role==='admin' ? [{ to:'/admin', icon:'fa-shield-halved', label:'Admin Panel' }] : []),
                    ].map(item => (
                      <Link key={item.to} to={item.to} onClick={() => setUserMenu(false)}
                        style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 16px', color:'var(--text2)', fontSize:13, borderBottom:'1px solid var(--border)' }}>
                        <i className={`fa-solid ${item.icon}`} style={{ width:14, textAlign:'center' }}></i>
                        {item.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout}
                      style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'11px 16px', color:'#f87171', fontSize:13, background:'none', border:'none', cursor:'pointer' }}>
                      <i className="fa-solid fa-right-from-bracket" style={{ width:14, textAlign:'center' }}></i>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ padding:'8px 18px', background:'#ef4444', color:'#fff', borderRadius:8, fontSize:13, fontWeight:700 }}>
              Sign In
            </Link>
          )}

          {/* Mobile menu btn */}
          <button onClick={() => setMobileMenu(v=>!v)} className="mobile-menu-btn"
            style={{ padding:8, background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', cursor:'pointer', fontSize:16 }}>
            <i className={`fa-solid ${mobileMenu?'fa-xmark':'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenu && (
        <div style={{ borderTop:'1px solid var(--border)', background:'rgba(10,10,10,0.98)' }}>
          {nav.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setMobileMenu(false)}
              style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 24px', color: isActive(n.to)?'#ef4444':'var(--text2)', fontSize:14, fontWeight:500, borderBottom:'1px solid var(--border)' }}>
              <i className={`fa-solid ${n.icon}`}></i>{n.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px){ .desktop-nav{display:none!important} }
        @media(min-width:769px){ .mobile-menu-btn{display:none!important} }
      `}</style>
    </header>
  )
}
