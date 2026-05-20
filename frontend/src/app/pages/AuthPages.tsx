import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 30%, rgba(239,68,68,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
      <div style={{ position:'relative', width:'100%', maxWidth:440 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <i className="fa-solid fa-clapperboard" style={{ color:'#ef4444', fontSize:28 }}></i>
            <span style={{ fontSize:28, fontWeight:900, color:'#fff' }}>IMDb <span style={{ color:'#ef4444' }}>Play</span></span>
          </Link>
        </div>
        <div style={{ background:'rgba(20,20,20,0.9)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:36, backdropFilter:'blur(20px)', boxShadow:'0 25px 60px rgba(0,0,0,0.5)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Field({ label, type='text', value, onChange, placeholder, icon, extra }: any) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:'block', color:'rgba(255,255,255,0.8)', fontSize:13, fontWeight:600, marginBottom:8 }}>{label}</label>
      <div style={{ position:'relative' }}>
        <i className={`fa-solid ${icon}`} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.3)', fontSize:13 }}></i>
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required
          style={{ width:'100%', paddingLeft:38, paddingRight: isPassword?38:14, paddingTop:12, paddingBottom:12, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }}
          {...extra}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s=>!s)}
            style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:13 }}>
            <i className={`fa-solid ${show?'fa-eye-slash':'fa-eye'}`}></i>
          </button>
        )}
      </div>
    </div>
  )
}

// ── LoginPage ─────────────────────────────────────────────────────────────────
export function LoginPage() {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err: any) {
      const msg = err?.response?.data?.message
      if (msg) setError(msg)
      else if (err?.code==='ERR_NETWORK') setError('Cannot connect to server. Make sure Laravel is running on port 8000.')
      else setError('Invalid email or password.')
    } finally { setLoading(false) }
  }

  return (
    <AuthCard>
      <h2 style={{ color:'#fff', fontSize:22, fontWeight:800, textAlign:'center', marginBottom:6 }}>Welcome Back</h2>
      <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, textAlign:'center', marginBottom:28 }}>Sign in to continue watching</p>

      {error && (
        <div style={{ marginBottom:20, padding:'12px 14px', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, color:'#f87171', fontSize:13, display:'flex', gap:8, alignItems:'flex-start' }}>
          <i className="fa-solid fa-circle-exclamation" style={{ flexShrink:0, marginTop:1 }}></i>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={submit}>
        <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" icon="fa-envelope" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" icon="fa-lock" />

        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
          <Link to="/forgot-password" style={{ color:'#ef4444', fontSize:13, fontWeight:600 }}>Forgot password?</Link>
        </div>

        <button type="submit" disabled={loading}
          style={{ width:'100%', padding:'13px', background: loading?'#9b1c1c':'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, border:'none', cursor: loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'background .2s' }}>
          {loading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Signing in...</> : <><i className="fa-solid fa-right-to-bracket"></i> Sign In</>}
        </button>
      </form>

      <p style={{ textAlign:'center', marginTop:24, color:'rgba(255,255,255,0.4)', fontSize:13 }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color:'#ef4444', fontWeight:700 }}>Sign up</Link>
      </p>

      
    </AuthCard>
  )
}

// ── RegisterPage ──────────────────────────────────────────────────────────────
export function RegisterPage() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate     = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return }
    setError(''); setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err: any) {
      const errors = err?.response?.data?.errors
      const msg    = err?.response?.data?.message
      if (errors) {
        const first = Object.values(errors)[0] as string[]
        setError(first[0])
      } else if (msg) {
        setError(msg)
      } else if (err?.code==='ERR_NETWORK') {
        setError('Cannot connect to server. Make sure Laravel is running on port 8000.')
      } else {
        setError('Registration failed. Please try again.')
      }
    } finally { setLoading(false) }
  }

  return (
    <AuthCard>
      <h2 style={{ color:'#fff', fontSize:22, fontWeight:800, textAlign:'center', marginBottom:6 }}>Create Account</h2>
      <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, textAlign:'center', marginBottom:28 }}>Join millions of movie lovers</p>

      {error && (
        <div style={{ marginBottom:20, padding:'12px 14px', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, color:'#f87171', fontSize:13, display:'flex', gap:8, alignItems:'flex-start' }}>
          <i className="fa-solid fa-circle-exclamation" style={{ flexShrink:0, marginTop:1 }}></i>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={submit}>
        <Field label="Full Name" value={name} onChange={setName} placeholder="John Doe" icon="fa-user" />
        <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" icon="fa-envelope" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Min 6 characters" icon="fa-lock" />
        <Field label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat password" icon="fa-lock"
          extra={{ style:{ width:'100%', paddingLeft:38, paddingRight:14, paddingTop:12, paddingBottom:12, background:'rgba(255,255,255,0.05)', border:`1px solid ${confirm && confirm!==password?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.1)'}`, borderRadius:10, color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box' }}} />
        {confirm && confirm!==password && <p style={{ color:'#f87171', fontSize:12, marginTop:-10, marginBottom:12 }}>Passwords do not match</p>}

        <button type="submit" disabled={loading}
          style={{ width:'100%', padding:'13px', background: loading?'#9b1c1c':'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, border:'none', cursor: loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:8, transition:'background .2s' }}>
          {loading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Creating Account...</> : <><i className="fa-solid fa-user-plus"></i> Create Account</>}
        </button>
      </form>

      <p style={{ textAlign:'center', marginTop:24, color:'rgba(255,255,255,0.4)', fontSize:13 }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color:'#ef4444', fontWeight:700 }}>Sign in</Link>
      </p>
    </AuthCard>
  )
}

// ── ForgotPasswordPage ────────────────────────────────────────────────────────
export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent]   = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSent(true); setLoading(false)
  }

  return (
    <AuthCard>
      <h2 style={{ color:'#fff', fontSize:22, fontWeight:800, textAlign:'center', marginBottom:6 }}>Reset Password</h2>
      <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, textAlign:'center', marginBottom:28 }}>Enter your email to receive a reset link</p>

      {sent ? (
        <div style={{ textAlign:'center', padding:'20px 0' }}>
          <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <i className="fa-solid fa-envelope-circle-check" style={{ color:'#4ade80', fontSize:24 }}></i>
          </div>
          <p style={{ color:'#fff', fontWeight:700, fontSize:16, marginBottom:8 }}>Check your email!</p>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginBottom:20 }}>Reset link sent to <b style={{ color:'#fff' }}>{email}</b></p>
          <Link to="/login" style={{ color:'#ef4444', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', gap:6, justifyContent:'center' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={submit}>
          <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" icon="fa-envelope" />
          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:'13px', background:'#ef4444', color:'#fff', borderRadius:10, fontWeight:700, fontSize:14, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:8 }}>
            {loading ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</> : <><i className="fa-solid fa-paper-plane"></i> Send Reset Link</>}
          </button>
          <div style={{ textAlign:'center', marginTop:20 }}>
            <Link to="/login" style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>← Back to Sign In</Link>
          </div>
        </form>
      )}
    </AuthCard>
  )
}
