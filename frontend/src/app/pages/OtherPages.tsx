import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useContent, Content } from '../contexts/ContentContext'
import { useTheme } from '../contexts/ThemeContext'
import { adminApi, userApi } from '../services/api'
import { Header } from '../components/Header'
import { Footer, ContentCard } from '../components/shared'

const S: React.CSSProperties = { minHeight:'100vh', background:'var(--bg)' }
const card: React.CSSProperties = { background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:16, padding:24, marginBottom:20 }

// ── UserDashboard ─────────────────────────────────────────────────────────────
export function UserDashboard() {
  const { user, isAuth } = useAuth()
  const { contents }     = useContent()
  const [tab, setTab]    = useState('overview')
  const navigate         = useNavigate()

  if (!isAuth) return (
    <div style={{ ...S, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <i className="fa-solid fa-lock" style={{ fontSize:48, color:'var(--text2)', display:'block', marginBottom:16 }}></i>
        <p style={{ color:'var(--text)', fontWeight:700, fontSize:18, marginBottom:12 }}>Sign in to view dashboard</p>
        <Link to="/login" style={{ padding:'10px 24px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14 }}>Sign In</Link>
      </div>
    </div>
  )

  const myList  = contents.filter(c => user?.myList?.includes(c.id))
  const favs    = contents.filter(c => user?.favorites?.includes(c.id))
  const tabs    = [{ id:'overview',label:'Overview',icon:'fa-gauge' }, { id:'mylist',label:'My List',icon:'fa-list',count:myList.length }, { id:'favorites',label:'Favorites',icon:'fa-heart',count:favs.length }]

  return (
    <div style={S}>
      <Header />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 24px 60px' }}>
        {/* Profile header */}
        <div style={{ ...card, display:'flex', flexWrap:'wrap', gap:20, alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg,#ef4444,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <i className="fa-solid fa-user" style={{ color:'#fff', fontSize:24 }}></i>
            </div>
            <div>
              <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800 }}>{user?.name}</h1>
              <p style={{ color:'var(--text2)', fontSize:13 }}>{user?.email}</p>
              <span style={{ display:'inline-block', marginTop:6, padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700, background: user?.role==='admin'?'rgba(239,68,68,0.15)':'rgba(59,130,246,0.15)', color: user?.role==='admin'?'#f87171':'#60a5fa', border: user?.role==='admin'?'1px solid rgba(239,68,68,0.3)':'1px solid rgba(59,130,246,0.3)' }}>
                {user?.role==='admin'?'⚡ Admin':'👤 Member'}
              </span>
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <Link to="/settings" style={{ padding:'8px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
              <i className="fa-solid fa-gear"></i> Settings
            </Link>
            {user?.role==='admin' && (
              <Link to="/admin" style={{ padding:'8px 16px', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:8, color:'#f87171', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
                <i className="fa-solid fa-shield-halved"></i> Admin
              </Link>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--border)', marginBottom:28 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 16px', background:'none', border:'none', borderBottom: tab===t.id?'2px solid #ef4444':'2px solid transparent', color: tab===t.id?'#ef4444':'var(--text2)', fontWeight:700, fontSize:13, cursor:'pointer', marginBottom:-1 }}>
              <i className={`fa-solid ${t.icon}`} style={{ fontSize:11 }}></i>
              {t.label}
              {t.count !== undefined && <span style={{ padding:'1px 6px', background:'rgba(239,68,68,0.2)', color:'#f87171', borderRadius:8, fontSize:11 }}>{t.count}</span>}
            </button>
          ))}
        </div>

        {tab==='overview' && (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', gap:16, marginBottom:32 }}>
              {[{l:'My List',v:myList.length,i:'fa-list',c:'#3b82f6'},{l:'Favorites',v:favs.length,i:'fa-heart',c:'#ef4444'},{l:'Account Type',v:user?.role==='admin'?'Admin':'Member',i:'fa-user-shield',c:'#7c3aed'}].map(s => (
                <div key={s.l} style={{ background:`rgba(${s.c==='#ef4444'?'239,68,68':s.c==='#3b82f6'?'59,130,246':'124,58,237'},0.08)`, border:`1px solid rgba(${s.c==='#ef4444'?'239,68,68':s.c==='#3b82f6'?'59,130,246':'124,58,237'},0.2)`, borderRadius:14, padding:20 }}>
                  <i className={`fa-solid ${s.i}`} style={{ color:s.c, fontSize:22, display:'block', marginBottom:10 }}></i>
                  <p style={{ color:'var(--text)', fontSize:24, fontWeight:900 }}>{s.v}</p>
                  <p style={{ color:'var(--text2)', fontSize:13 }}>{s.l}</p>
                </div>
              ))}
            </div>
            {myList.length > 0 && (
              <>
                <h3 style={{ color:'var(--text)', fontSize:16, fontWeight:700, marginBottom:16 }}>Recently Added</h3>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:12 }}>
                  {myList.slice(0,6).map(c => <ContentCard key={c.id} content={c} />)}
                </div>
              </>
            )}
          </div>
        )}

        {tab==='mylist' && (
          myList.length===0 ? (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <i className="fa-solid fa-list" style={{ fontSize:48, color:'var(--text2)', display:'block', marginBottom:12 }}></i>
              <p style={{ color:'var(--text2)', marginBottom:12 }}>Your list is empty.</p>
              <Link to="/" style={{ color:'#ef4444', fontWeight:600, fontSize:13 }}>Browse Content</Link>
            </div>
          ) : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:12 }}>{myList.map(c => <ContentCard key={c.id} content={c} />)}</div>
        )}

        {tab==='favorites' && (
          favs.length===0 ? (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <i className="fa-solid fa-heart" style={{ fontSize:48, color:'var(--text2)', display:'block', marginBottom:12 }}></i>
              <p style={{ color:'var(--text2)', marginBottom:12 }}>No favorites yet.</p>
              <Link to="/" style={{ color:'#ef4444', fontWeight:600, fontSize:13 }}>Browse Content</Link>
            </div>
          ) : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:12 }}>{favs.map(c => <ContentCard key={c.id} content={c} />)}</div>
        )}
      </div>
      <Footer />
    </div>
  )
}

// ── SettingsPage ──────────────────────────────────────────────────────────────
export function SettingsPage() {
  const { user, updateUser } = useAuth()
  const { theme, toggle }    = useTheme()
  const navigate             = useNavigate()
  const [name, setName]      = useState(user?.name||'')
  const [email, setEmail]    = useState(user?.email||'')
  const [curPw, setCurPw]    = useState('')
  const [newPw, setNewPw]    = useState('')
  const [confPw, setConfPw]  = useState('')
  const [msg, setMsg]        = useState('')
  const [err, setErr]        = useState('')

  const ok  = (m: string) => { setMsg(m); setErr('');  setTimeout(()=>setMsg(''),3000) }
  const bad = (m: string) => { setErr(m); setMsg('');  setTimeout(()=>setErr(''),3000) }

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try { await userApi.update({name,email}); updateUser({name,email}); ok('Profile updated!') }
    catch { bad('Failed to update profile.') }
  }
  const savePw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPw!==confPw) { bad('Passwords do not match.'); return }
    if (newPw.length<6) { bad('Min 6 characters.'); return }
    try { await userApi.changePw(curPw, newPw); ok('Password changed!'); setCurPw(''); setNewPw(''); setConfPw('') }
    catch (er: any) { bad(er?.response?.data?.message||'Failed to change password.') }
  }

  if (!user) { navigate('/login'); return null }

  const inputStyle: React.CSSProperties = { width:'100%', padding:'11px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', borderRadius:10, color:'var(--text)', fontSize:14, outline:'none', boxSizing:'border-box' }

  return (
    <div style={S}>
      <Header />
      <div style={{ maxWidth:700, margin:'0 auto', padding:'40px 24px 60px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
          <button onClick={() => navigate(-1)} style={{ padding:8, background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', cursor:'pointer', fontSize:14 }}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h1 style={{ color:'var(--text)', fontSize:26, fontWeight:900, display:'flex', alignItems:'center', gap:10 }}>
            <i className="fa-solid fa-gear" style={{ color:'#ef4444' }}></i> Settings
          </h1>
        </div>

        {msg && <div style={{ marginBottom:20, padding:'12px 16px', background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:10, color:'#4ade80', fontSize:13 }}><i className="fa-solid fa-check-circle" style={{ marginRight:8 }}></i>{msg}</div>}
        {err && <div style={{ marginBottom:20, padding:'12px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, color:'#f87171', fontSize:13 }}><i className="fa-solid fa-xmark-circle" style={{ marginRight:8 }}></i>{err}</div>}

        {/* Profile */}
        <div style={card}>
          <h2 style={{ color:'var(--text)', fontSize:16, fontWeight:800, marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><i className="fa-solid fa-user" style={{ color:'#ef4444' }}></i> Profile</h2>
          <form onSubmit={saveProfile}>
            {[['Full Name',name,setName,'text'],['Email Address',email,setEmail,'email']].map(([l,v,sv,t]) => (
              <div key={l as string} style={{ marginBottom:14 }}>
                <label style={{ display:'block', color:'var(--text2)', fontSize:12, fontWeight:600, marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>{l}</label>
                <input type={t as string} value={v as string} onChange={e=>(sv as any)(e.target.value)} required style={inputStyle} />
              </div>
            ))}
            <button type="submit" style={{ padding:'10px 20px', background:'#ef4444', color:'#fff', borderRadius:8, fontWeight:700, fontSize:13, border:'none', cursor:'pointer' }}>
              <i className="fa-solid fa-floppy-disk" style={{ marginRight:6 }}></i>Save Changes
            </button>
          </form>
        </div>

        {/* Password */}
        <div style={card}>
          <h2 style={{ color:'var(--text)', fontSize:16, fontWeight:800, marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><i className="fa-solid fa-lock" style={{ color:'#ef4444' }}></i> Change Password</h2>
          <form onSubmit={savePw}>
            {[['Current Password',curPw,setCurPw],['New Password',newPw,setNewPw],['Confirm New Password',confPw,setConfPw]].map(([l,v,sv]) => (
              <div key={l as string} style={{ marginBottom:14 }}>
                <label style={{ display:'block', color:'var(--text2)', fontSize:12, fontWeight:600, marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>{l}</label>
                <input type="password" value={v as string} onChange={e=>(sv as any)(e.target.value)} required style={inputStyle} />
              </div>
            ))}
            <button type="submit" style={{ padding:'10px 20px', background:'#ef4444', color:'#fff', borderRadius:8, fontWeight:700, fontSize:13, border:'none', cursor:'pointer' }}>
              <i className="fa-solid fa-shield-halved" style={{ marginRight:6 }}></i>Update Password
            </button>
          </form>
        </div>

        {/* Preferences */}
        <div style={card}>
          <h2 style={{ color:'var(--text)', fontSize:16, fontWeight:800, marginBottom:20, display:'flex', alignItems:'center', gap:8 }}><i className="fa-solid fa-sliders" style={{ color:'#ef4444' }}></i> Preferences</h2>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid var(--border)' }}>
            <div>
              <p style={{ color:'var(--text)', fontWeight:600, fontSize:14 }}>Theme</p>
              <p style={{ color:'var(--text2)', fontSize:12 }}>Switch between dark and light mode</p>
            </div>
            <button onClick={toggle} style={{ padding:'8px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
              <i className={`fa-solid ${theme==='dark'?'fa-sun':'fa-moon'}`}></i>
              {theme==='dark'?'Light Mode':'Dark Mode'}
            </button>
          </div>
          <div style={{ paddingTop:14 }}>
            <Link to="/forgot-password" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', fontSize:13, fontWeight:600 }}>
              <i className="fa-solid fa-key"></i> Reset Password via Email
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ── ProfilePage ───────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user, isAuth } = useAuth()
  if (!isAuth) return <div style={S}><Header /><div style={{ textAlign:'center', padding:'80px 24px' }}><Link to="/login" style={{ color:'#ef4444', fontWeight:700 }}>Sign in to view profile</Link></div><Footer /></div>
  return (
    <div style={S}><Header />
    <div style={{ maxWidth:600, margin:'0 auto', padding:'40px 24px 60px' }}>
      <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden' }}>
        <div style={{ height:120, background:'linear-gradient(135deg,#ef4444,#7c3aed)' }} />
        <div style={{ padding:24, marginTop:-40 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#ef4444,#7c3aed)', border:'4px solid var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
            <i className="fa-solid fa-user" style={{ color:'#fff', fontSize:28 }}></i>
          </div>
          <h1 style={{ color:'var(--text)', fontSize:22, fontWeight:800 }}>{user?.name}</h1>
          <p style={{ color:'var(--text2)', fontSize:13, marginTop:4 }}>{user?.email}</p>
          <span style={{ display:'inline-block', marginTop:10, padding:'3px 12px', borderRadius:20, fontSize:12, fontWeight:700, background: user?.role==='admin'?'rgba(239,68,68,0.15)':'rgba(59,130,246,0.15)', color: user?.role==='admin'?'#f87171':'#60a5fa' }}>
            {user?.role==='admin'?'Administrator':'Member'}
          </span>
          <div style={{ display:'flex', gap:12, marginTop:20 }}>
            <Link to="/dashboard" style={{ flex:1, padding:'10px 0', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:13, textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <i className="fa-solid fa-gauge"></i> Dashboard
            </Link>
            <Link to="/settings" style={{ flex:1, padding:'10px 0', background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', color:'var(--text)', borderRadius:10, fontWeight:700, fontSize:13, textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <i className="fa-solid fa-gear"></i> Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer /></div>
  )
}

// ── DirectorPage ──────────────────────────────────────────────────────────────
export function DirectorPage() {
  const { name } = useParams()
  const { contents } = useContent()
  const decoded = decodeURIComponent(name||'')
  const items   = contents.filter(c => c.director===decoded)
  return (
    <div style={S}><Header />
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 24px 60px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
        <div style={{ width:60, height:60, borderRadius:'50%', background:'linear-gradient(135deg,#ef4444,#b91c1c)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <i className="fa-solid fa-megaphone" style={{ color:'#fff', fontSize:22 }}></i>
        </div>
        <div>
          <p style={{ color:'#ef4444', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>Director</p>
          <h1 style={{ color:'var(--text)', fontSize:28, fontWeight:900 }}>{decoded}</h1>
          <p style={{ color:'var(--text2)', fontSize:13 }}>{items.length} works</p>
        </div>
      </div>
      {items.length ? <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:12 }}>{items.map(c=><ContentCard key={c.id} content={c} />)}</div>
        : <p style={{ color:'var(--text2)', textAlign:'center', padding:'60px 0' }}>No content found.</p>}
    </div>
    <Footer /></div>
  )
}

// ── CastPage ──────────────────────────────────────────────────────────────────
export function CastPage() {
  const { name } = useParams()
  const { contents } = useContent()
  const decoded = decodeURIComponent(name||'')
  const items   = contents.filter(c => c.cast.includes(decoded))
  return (
    <div style={S}><Header />
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 24px 60px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
        <div style={{ width:60, height:60, borderRadius:'50%', background:'linear-gradient(135deg,#3b82f6,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <i className="fa-solid fa-user" style={{ color:'#fff', fontSize:22 }}></i>
        </div>
        <div>
          <p style={{ color:'#3b82f6', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>Actor / Actress</p>
          <h1 style={{ color:'var(--text)', fontSize:28, fontWeight:900 }}>{decoded}</h1>
          <p style={{ color:'var(--text2)', fontSize:13 }}>{items.length} appearances</p>
        </div>
      </div>
      {items.length ? <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:12 }}>{items.map(c=><ContentCard key={c.id} content={c} />)}</div>
        : <p style={{ color:'var(--text2)', textAlign:'center', padding:'60px 0' }}>No content found.</p>}
    </div>
    <Footer /></div>
  )
}

// ── EpisodePage ───────────────────────────────────────────────────────────────
export function EpisodePage() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { episode, seriesTitle, seasonTitle } = location.state || {}
  if (!episode) return <div style={S}><Header /><div style={{ textAlign:'center', padding:'80px 24px' }}><button onClick={()=>navigate(-1)} style={{ color:'#ef4444', background:'none', border:'none', cursor:'pointer', fontWeight:700 }}>← Go Back</button></div><Footer /></div>
  return (
    <div style={S}><Header />
    <div style={{ position:'relative', minHeight:'50vh' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url(${episode.thumbnail})`, backgroundSize:'cover', backgroundPosition:'center' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 100%)' }} />
      </div>
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'32px 24px 60px' }}>
        <button onClick={()=>navigate(-1)} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', background:'rgba(255,255,255,0.1)', border:'1px solid var(--border)', borderRadius:8, color:'rgba(255,255,255,0.7)', cursor:'pointer', marginBottom:40, fontSize:13 }}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
          <span style={{ padding:'4px 12px', background:'rgba(239,68,68,0.2)', border:'1px solid rgba(239,68,68,0.4)', borderRadius:20, color:'#f87171', fontSize:12, fontWeight:700 }}>{seriesTitle}</span>
          <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12, display:'flex', alignItems:'center' }}>{seasonTitle} · Episode {episode.number}</span>
        </div>
        <h1 style={{ color:'#fff', fontSize:'clamp(24px,4vw,42px)', fontWeight:900, marginBottom:14 }}>{episode.title}</h1>
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:15, lineHeight:1.7, maxWidth:600, marginBottom:20 }}>{episode.description}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:24, color:'rgba(255,255,255,0.6)', fontSize:13 }}>
          <span><i className="fa-solid fa-clock" style={{ color:'#ef4444', marginRight:6 }}></i>{episode.duration}</span>
          <span><i className="fa-solid fa-star" style={{ color:'#facc15', marginRight:6 }}></i>{episode.rating}/10</span>
          <span><i className="fa-solid fa-calendar" style={{ color:'#3b82f6', marginRight:6 }}></i>{episode.releaseDate}</span>
        </div>
        <a href={episode.watchLink||'#'} target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, boxShadow:'0 6px 20px rgba(239,68,68,0.3)' }}>
          <i className="fa-solid fa-play"></i> Watch Now
        </a>
      </div>
    </div>
    <Footer /></div>
  )
}

// ── NotFound ──────────────────────────────────────────────────────────────────
export function NotFound() {
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:120, fontWeight:900, color:'#ef4444', lineHeight:1, marginBottom:20 }}>404</div>
        <h1 style={{ color:'#fff', fontSize:28, fontWeight:800, marginBottom:12 }}>Page Not Found</h1>
        <p style={{ color:'rgba(255,255,255,0.4)', marginBottom:28 }}>The page you're looking for doesn't exist.</p>
        <Link to="/" style={{ padding:'12px 28px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, display:'inline-flex', alignItems:'center', gap:8 }}>
          <i className="fa-solid fa-house"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}
// ── Soon ──────────────────────────────────────────────────────────────────
export function Soon() {
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:120, fontWeight:900, color:'#ef4444', lineHeight:1, marginBottom:20 }}>Soon...</div>
        <h1 style={{ color:'#fff', fontSize:28, fontWeight:800, marginBottom:12 }}>Coming soon</h1>
        <p style={{ color:'rgba(255,255,255,0.4)', marginBottom:28 }}>The page you're looking for doesn't exist.</p>
        <Link to="/" style={{ padding:'12px 28px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, display:'inline-flex', alignItems:'center', gap:8 }}>
          <i className="fa-solid fa-house"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}
// ── Privacy Policy ──────────────────────────────────────────────────────────────────
export function Privacy_Policy() {
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:120, fontWeight:900, color:'#ef4444', lineHeight:1, marginBottom:20 }}>Privacy Policy</div>
        
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 20 }}>
          Privacy Policy
          </h1>

          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: 14 }}>
            At IMDb Play, we respect your privacy and are committed 
            to protecting your personal data.<br />
            
            We may collect basic information such as name, email address,
             and account details when you register.<br />
            This data is used to improve your experience, manage your account, 
            and provide personalized movie recommendations.<br />
            We do not sell or share your personal data with third parties.<br /> 
            We take reasonable measures to protect your information from unauthorized access or misuse.<br />
            If you have any questions, you can contact us through the support page.<br />
          </p>
          <br />
        <Link to="/" style={{ padding:'12px 28px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, display:'inline-flex', alignItems:'center', gap:8 }}>
        <i className="fa-solid fa-house"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}
// ── Terms ──────────────────────────────────────────────────────────────────
export function Terms() {
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:120, fontWeight:900, color:'#ef4444', lineHeight:1, marginBottom:20 }}>Terms of Service</div>

        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 20 }}>
        Terms of Service
        </h1>

        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: 14 }}>
          By using IMDb Play, you agree to use the website only for personal and non-commercial purposes.<br />
          You must not misuse the platform, attempt to hack, or upload harmful content.<br />
          All movie content is provided for informational and entertainment purposes only.<br />
          We reserve the right to suspend accounts that violate our rules.<br />
          These terms may be updated at any time without prior notice.<br />
        </p>
        <br />


        <Link to="/" style={{ padding:'12px 28px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, display:'inline-flex', alignItems:'center', gap:8 }}>
          <i className="fa-solid fa-house"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}
// ── Cookies ──────────────────────────────────────────────────────────────────
export function Cookies() {
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:120, fontWeight:900, color:'#ef4444', lineHeight:1, marginBottom:20 }}>Cookies Policy</div>

        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 20 }}>
        Cookies Policy
        </h1>

        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: 14 }}>
          IMDb Play uses cookies to improve your browsing experience.<br />
          Cookies are small files stored on your device that help websites remember your preferences.<br />
          We use cookies to keep you logged in, remember settings, and improve performance.<br />
          You can disable cookies from your browser settings, but some features may not work properly.<br />
          By using our website, you agree to our use of cookies.<br />
        </p>
        <br />
      
        <Link to="/" style={{ padding:'12px 28px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, display:'inline-flex', alignItems:'center', gap:8 }}>
          <i className="fa-solid fa-house"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}

// ── AdminDashboard ────────────────────────────────────────────────────────────
const GENRES = ['Action','Comedy','Drama','Sci-Fi','Thriller','Horror']
const emptyForm = { title:'',type:'movie' as 'movie'|'series',genre:'Action',year:String(new Date().getFullYear()),duration:'',rating:7.5,description:'',director:'',cast:'',image:'',background_image:'',watch_link:'',is_hot:false,is_new:false,is_trending:false,is_top_rated:false,is_featured:false }

export function AdminDashboard() {
  const { user }   = useAuth()
  const { contents, addContent, updateContent, deleteContent, setFeatured } = useContent()
  const navigate   = useNavigate()
  const [tab, setTab]         = useState('overview')
  const [modal, setModal]     = useState(false)
  const [editing, setEditing] = useState<Content|null>(null)
  const [form, setForm]       = useState({ ...emptyForm })
  const [apiUsers, setApiUsers]   = useState<any[]>([])
  const [apiStats, setApiStats]   = useState<any>(null)
  const [success, setSuccess]     = useState('')

  useEffect(() => {
    adminApi.users().then(setApiUsers).catch(()=>{})
    adminApi.stats().then(setApiStats).catch(()=>{})
  }, [])

  if (!user || user.role!=='admin') { navigate('/'); return null }

  const movies  = contents.filter(c=>c.type==='movie')
  const series  = contents.filter(c=>c.type==='series')
  const featured = contents.find(c=>c.featured)
  const MOCK_COUNT = 2

  const ok = (m: string) => { setSuccess(m); setTimeout(()=>setSuccess(''),3000) }

  const tabs = [
    { id:'overview',label:'Overview',icon:'fa-gauge' },
    { id:'content', label:'Content', icon:'fa-film',  count:contents.length },
    { id:'users',   label:'Users',   icon:'fa-users', count:apiUsers.length||MOCK_COUNT },
    { id:'featured',label:'Featured',icon:'fa-star' },
  ]

  const openAdd = () => { setEditing(null); setForm({...emptyForm}); setModal(true) }
  const openEdit = (c: Content) => {
    setEditing(c)
    setForm({ title:c.title, type:c.type, genre:c.genre, year:c.year, duration:c.duration||'', rating:c.rating, description:c.description, director:c.director, cast:c.cast.join(', '), image:c.image, background_image:c.backgroundImage||'', watch_link:c.watchLink||'', is_hot:c.isHot||false, is_new:c.isNew||false, is_trending:c.trending||false, is_top_rated:c.topRated||false, is_featured:c.featured||false })
    setModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...form, cast: form.cast.split(',').map(s=>s.trim()).filter(Boolean), backgroundImage: form.background_image, watchLink: form.watch_link, isHot: form.is_hot, isNew: form.is_new, trending: form.is_trending, topRated: form.is_top_rated, featured: form.is_featured, newRelease: form.is_new }
    if (editing) { await updateContent(editing.id, payload); ok('Updated!') }
    else { await addContent(payload as any); ok('Added!') }
    setModal(false)
  }

  const handleDel = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    await deleteContent(id); ok('Deleted.')
  }

  const inp: React.CSSProperties = { width:'100%', padding:'10px 12px', background:'rgba(255,255,255,0.06)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text)', fontSize:13, outline:'none', boxSizing:'border-box' }



  return (
    <div style={S}>
      <Header />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 24px 60px' }}>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:28 }}>
          <h1 style={{ color:'var(--text)', fontSize:28, fontWeight:900, display:'flex', alignItems:'center', gap:12 }}>
            <i className="fa-solid fa-shield-halved" style={{ color:'#ef4444' }}></i> Admin Panel
          </h1>
          <button onClick={openAdd} style={{ padding:'10px 20px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:13, border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            <i className="fa-solid fa-plus"></i> Add Content
          </button>
        </div>

        {success && <div style={{ marginBottom:20, padding:'12px 16px', background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:10, color:'#4ade80', fontSize:13 }}><i className="fa-solid fa-check-circle" style={{ marginRight:8 }}></i>{success}</div>}

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--border)', marginBottom:28, overflowX:'auto' }} className="no-scroll">
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 16px', background:'none', border:'none', borderBottom: tab===t.id?'2px solid #ef4444':'2px solid transparent', color: tab===t.id?'#ef4444':'var(--text2)', fontWeight:700, fontSize:13, cursor:'pointer', marginBottom:-1, whiteSpace:'nowrap' }}>
              <i className={`fa-solid ${t.icon}`} style={{ fontSize:11 }}></i>{t.label}
              {t.count!==undefined && <span style={{ padding:'1px 6px', background:'rgba(239,68,68,0.2)', color:'#f87171', borderRadius:8, fontSize:11 }}>{t.count}</span>}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab==='overview' && (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', gap:16, marginBottom:32 }}>
              {[
                {l:'Movies',  v:apiStats?.total_movies??movies.length,  i:'fa-film',        c:'239,68,68'},
                {l:'Series',  v:apiStats?.total_series??series.length,  i:'fa-tv',          c:'59,130,246'},
                {l:'Users',   v:apiStats?.total_users??apiUsers.length, i:'fa-users',       c:'34,197,94'},
                {l:'Content', v:apiStats?.total_content??contents.length,i:'fa-layer-group',c:'250,204,21'},
              ].map(s => (
                <div key={s.l} style={{ background:`rgba(${s.c},0.08)`, border:`1px solid rgba(${s.c},0.2)`, borderRadius:14, padding:20 }}>
                  <i className={`fa-solid ${s.i}`} style={{ color:`rgb(${s.c})`, fontSize:22, display:'block', marginBottom:10 }}></i>
                  <p style={{ color:'var(--text)', fontSize:28, fontWeight:900 }}>{s.v}</p>
                  <p style={{ color:'var(--text2)', fontSize:13 }}>{s.l}</p>
                </div>
              ))}
            </div>
            {/* Recent */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' }}>
              <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)' }}>
                <h3 style={{ color:'var(--text)', fontWeight:700, fontSize:15 }}>Recent Content</h3>
              </div>
              {[...contents].reverse().slice(0,5).map(c => (
                <div key={c.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 20px', borderBottom:'1px solid var(--border)' }}>
                  <img src={c.image} alt="" style={{ width:40, height:56, objectFit:'cover', borderRadius:6, flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ color:'var(--text)', fontWeight:600, fontSize:13 }}>{c.title}</p>
                    <p style={{ color:'var(--text2)', fontSize:12 }}>{c.year} · {c.genre} · ⭐ {c.rating}</p>
                  </div>
                  <div style={{ display:'flex', gap:6 }}>
                    <button onClick={()=>openEdit(c)} style={{ padding:'6px 10px', background:'rgba(59,130,246,0.15)', border:'none', borderRadius:6, color:'#60a5fa', cursor:'pointer', fontSize:11 }}><i className="fa-solid fa-pen"></i></button>
                    <button onClick={()=>handleDel(c.id,c.title)} style={{ padding:'6px 10px', background:'rgba(239,68,68,0.15)', border:'none', borderRadius:6, color:'#f87171', cursor:'pointer', fontSize:11 }}><i className="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Tab */}
        {tab==='content' && (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:'0 6px' }}>
              <thead>
                <tr>
                  {['Title','Type','Genre','Rating','Tags','Actions'].map(h => (
                    <th key={h} style={{ textAlign:'left', padding:'10px 14px', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contents.map(c => (
                  <tr key={c.id}>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderRadius:'10px 0 0 10px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <img src={c.image} alt="" style={{ width:34, height:48, objectFit:'cover', borderRadius:4, flexShrink:0 }} />
                        <div>
                          <p style={{ color:'var(--text)', fontWeight:600, fontSize:13 }}>{c.title}</p>
                          <p style={{ color:'var(--text2)', fontSize:11 }}>{c.year} {c.featured?'· ⭐ Featured':''}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)' }}>
                      <span style={{ padding:'3px 8px', borderRadius:6, fontSize:11, fontWeight:700, background: c.type==='movie'?'rgba(124,58,237,0.2)':'rgba(59,130,246,0.2)', color: c.type==='movie'?'#a78bfa':'#60a5fa' }}>{c.type}</span>
                    </td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', color:'var(--text2)', fontSize:13 }}>{c.genre}</td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', color:'#facc15', fontWeight:700, fontSize:13 }}>⭐ {c.rating}</td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)' }}>
                      <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                        {c.isHot && <span style={{ padding:'2px 6px', background:'rgba(249,115,22,0.2)', color:'#fb923c', borderRadius:4, fontSize:10, fontWeight:700 }}>HOT</span>}
                        {c.isNew && <span style={{ padding:'2px 6px', background:'rgba(34,197,94,0.2)', color:'#4ade80', borderRadius:4, fontSize:10, fontWeight:700 }}>NEW</span>}
                        {c.trending && <span style={{ padding:'2px 6px', background:'rgba(239,68,68,0.2)', color:'#f87171', borderRadius:4, fontSize:10, fontWeight:700 }}>TREND</span>}
                      </div>
                    </td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderRadius:'0 10px 10px 0' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={()=>{ setFeatured(c.id); ok('Featured updated!') }} title="Set Featured"
                          style={{ padding:'5px 8px', background: c.featured?'rgba(250,204,21,0.2)':'rgba(255,255,255,0.07)', border:'none', borderRadius:6, color: c.featured?'#facc15':'var(--text2)', cursor:'pointer', fontSize:11 }}>
                          <i className="fa-solid fa-star"></i>
                        </button>
                        <button onClick={()=>openEdit(c)} style={{ padding:'5px 8px', background:'rgba(59,130,246,0.15)', border:'none', borderRadius:6, color:'#60a5fa', cursor:'pointer', fontSize:11 }}><i className="fa-solid fa-pen"></i></button>
                        <button onClick={()=>handleDel(c.id,c.title)} style={{ padding:'5px 8px', background:'rgba(239,68,68,0.15)', border:'none', borderRadius:6, color:'#f87171', cursor:'pointer', fontSize:11 }}><i className="fa-solid fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Tab */}
        {tab==='users' && (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:'0 6px' }}>
              <thead>
                <tr>{['User','Email','Role','Joined','Action'].map(h=><th key={h} style={{ textAlign:'left', padding:'10px 14px', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8 }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {(apiUsers.length ? apiUsers : [{id:'1',name:'John Doe',email:'john@example.com',role:'user',created_at:'2024-01-15'},{id:'2',name:'Admin',email:'admin@imdbplay.com',role:'admin',created_at:'2023-12-01'}]).map((u:any) => (
                  <tr key={u.id}>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderRadius:'10px 0 0 10px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#ef4444,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <i className="fa-solid fa-user" style={{ color:'#fff', fontSize:13 }}></i>
                        </div>
                        <span style={{ color:'var(--text)', fontWeight:600, fontSize:13 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', color:'var(--text2)', fontSize:13 }}>{u.email}</td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)' }}>
                      <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:700, background: u.role==='admin'?'rgba(239,68,68,0.15)':'rgba(59,130,246,0.15)', color: u.role==='admin'?'#f87171':'#60a5fa' }}>{u.role}</span>
                    </td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', color:'var(--text2)', fontSize:12 }}>{u.created_at?.slice(0,10)}</td>
                    <td style={{ padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderRadius:'0 10px 10px 0' }}>
                      {u.role!=='admin' && <button onClick={()=>{ if(confirm(`Delete ${u.name}?`)) setApiUsers(p=>p.filter((x:any)=>x.id!==u.id)); adminApi.deleteUser(u.id).catch(()=>{}) }} style={{ padding:'5px 8px', background:'rgba(239,68,68,0.15)', border:'none', borderRadius:6, color:'#f87171', cursor:'pointer', fontSize:11 }}><i className="fa-solid fa-trash"></i></button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Featured Tab */}
        {tab==='featured' && (
          <div>
            {featured && (
              <div style={{ display:'flex', alignItems:'center', gap:16, padding:20, background:'rgba(250,204,21,0.08)', border:'1px solid rgba(250,204,21,0.25)', borderRadius:16, marginBottom:24 }}>
                <img src={featured.image} alt="" style={{ width:70, height:100, objectFit:'cover', borderRadius:10 }} />
                <div>
                  <p style={{ color:'#facc15', fontSize:12, fontWeight:700, marginBottom:4 }}>⭐ Currently Featured</p>
                  <h3 style={{ color:'var(--text)', fontSize:20, fontWeight:800 }}>{featured.title}</h3>
                  <p style={{ color:'var(--text2)', fontSize:13 }}>{featured.year} · {featured.genre} · ⭐ {featured.rating}</p>
                </div>
              </div>
            )}
            <p style={{ color:'var(--text2)', fontSize:13, marginBottom:16 }}>Click any title to set as featured:</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:12 }}>
              {contents.map(c => (
                <div key={c.id} onClick={()=>{ setFeatured(c.id); ok('Featured updated!') }}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:14, background: c.featured?'rgba(250,204,21,0.08)':'rgba(255,255,255,0.03)', border:`1px solid ${c.featured?'rgba(250,204,21,0.3)':'var(--border)'}`, borderRadius:12, cursor:'pointer', transition:'all .2s' }}>
                  <img src={c.image} alt="" style={{ width:44, height:62, objectFit:'cover', borderRadius:6, flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ color:'var(--text)', fontWeight:600, fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.title}</p>
                    <p style={{ color:'var(--text2)', fontSize:12 }}>{c.year} · {c.genre}</p>
                  </div>
                  {c.featured && <i className="fa-solid fa-star" style={{ color:'#facc15', flexShrink:0 }}></i>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:100, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'16px', overflowY:'auto' }}>
          <div onClick={()=>setModal(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)' }} />
          <div style={{ position:'relative', width:'100%', maxWidth:680, background:'#141414', border:'1px solid rgba(255,255,255,0.15)', borderRadius:20, overflow:'hidden', margin:'20px 0' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', borderBottom:'1px solid var(--border)', background:'rgba(255,255,255,0.02)' }}>
              <h2 style={{ color:'var(--text)', fontSize:18, fontWeight:800, display:'flex', alignItems:'center', gap:8 }}>
                <i className={`fa-solid ${editing?'fa-pen':'fa-plus'}`} style={{ color:'#ef4444' }}></i>
                {editing ? 'Edit Content' : 'Add New Content'}
              </h2>
              <button onClick={()=>setModal(false)} style={{ background:'none', border:'none', color:'var(--text2)', cursor:'pointer', fontSize:20 }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding:24, maxHeight:'80vh', overflowY:'auto' }}>
              {/* Type selector */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18 }}>
                {(['movie','series'] as const).map(t => (
                  <button key={t} type="button" onClick={()=>setForm(f=>({...f,type:t}))}
                    style={{ padding:'10px', borderRadius:10, fontWeight:700, fontSize:13, cursor:'pointer', border:'none', background: form.type===t?'#ef4444':'rgba(255,255,255,0.07)', color: form.type===t?'#fff':'var(--text2)', transition:'all .2s' }}>
                    <i className={`fa-solid ${t==='movie'?'fa-film':'fa-tv'}`} style={{ marginRight:6 }}></i>
                    {t==='movie'?'Movie':'TV Series'}
                  </button>
                ))}
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {/* Title full width */}
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Title *</label>
                  <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required style={inp} placeholder="Movie or series title" />
                </div>

                <div>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Genre *</label>
                  <select value={form.genre} onChange={e=>setForm(f=>({...f,genre:e.target.value}))} style={{ ...inp }}>
                    {GENRES.map(g=><option key={g}>{g}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Year *</label>
                  <input type="number" value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} required min="1900" max="2030" style={inp} />
                </div>

                <div>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Rating (0-10) *</label>
                  <input type="number" value={form.rating} onChange={e=>setForm(f=>({...f,rating:parseFloat(e.target.value)}))} required min="0" max="10" step="0.1" style={inp} />
                </div>

                <div>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Duration</label>
                  <input value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))} style={inp} placeholder="2h 15min or 45min/ep" />
                </div>

                <div>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Director *</label>
                  <input value={form.director} onChange={e=>setForm(f=>({...f,director:e.target.value}))} required style={inp} placeholder="Director name" />
                </div>

                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Cast (comma separated) *</label>
                  <input value={form.cast} onChange={e=>setForm(f=>({...f,cast:e.target.value}))} required style={inp} placeholder="Actor 1, Actor 2, Actor 3" />
                </div>

                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Description *</label>
                  <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} required rows={3} style={{ ...inp, resize:'none' }} placeholder="Movie or series description..." />
                </div>

                <div>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Poster Image URL *</label>
                  <input value={form.image} onChange={e=>setForm(f=>({...f,image:e.target.value}))} required style={inp} placeholder="https://..." />
                </div>

                <div>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Background Image URL</label>
                  <input value={form.background_image} onChange={e=>setForm(f=>({...f,background_image:e.target.value}))} style={inp} placeholder="https://... (optional)" />
                </div>

                <div style={{ gridColumn:'1/-1' }}>
                  <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:6 }}>Watch Link</label>
                  <input value={form.watch_link} onChange={e=>setForm(f=>({...f,watch_link:e.target.value}))} style={inp} placeholder="https://..." />
                </div>
              </div>

              {/* Tags */}
              <div style={{ marginTop:18 }}>
                <label style={{ display:'block', color:'var(--text2)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, marginBottom:10 }}>Tags</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {([['is_hot','🔥 HOT','249,115,22'],['is_new','⚡ NEW','34,197,94'],['is_trending','📈 Trending','239,68,68'],['is_top_rated','⭐ Top Rated','250,204,21'],['is_featured','✦ Featured','124,58,237']] as const).map(([k,l,c])=>(
                    <label key={k} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 14px', borderRadius:20, cursor:'pointer', background: (form as any)[k]?`rgba(${c},0.2)`:'rgba(255,255,255,0.05)', border:`1px solid ${(form as any)[k]?`rgba(${c},0.4)`:'var(--border)'}`, color: (form as any)[k]?`rgb(${c})`:'var(--text2)', fontSize:13, fontWeight:600, transition:'all .2s' }}>
                      <input type="checkbox" checked={(form as any)[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.checked}))} style={{ display:'none' }} />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:24 }}>
                <button type="button" onClick={()=>setModal(false)} style={{ padding:'12px', background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)', borderRadius:10, color:'var(--text2)', fontWeight:700, fontSize:13, cursor:'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding:'12px', background:'#ef4444', border:'none', borderRadius:10, color:'#fff', fontWeight:700, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                  <i className={`fa-solid ${editing?'fa-floppy-disk':'fa-plus'}`}></i>
                  {editing ? 'Save Changes' : 'Add Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
