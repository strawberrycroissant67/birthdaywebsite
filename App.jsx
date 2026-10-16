import { useEffect, useState, useRef } from "react";
import { Heart, X, ExternalLink, Gift } from "lucide-react";
import * as C from "./content.js";

const Hearts = ({ n = 14 }) => (
  <div className="hearts" aria-hidden="true">
    {Array.from({ length: n }, (_, i) => (
      <span key={i} style={{ left: `${(i * 73) % 100}%`, animationDelay: `${(i * 1.3) % 9}s`, animationDuration: `${9 + (i % 5) * 2}s`, fontSize: `${10 + (i % 4) * 5}px` }}>♡</span>
    ))}
  </div>
);

function Envelope({ onDone }) {
  const [open, setOpen] = useState(false);
  const go = () => { if (open) return; setOpen(true); setTimeout(onDone, 2400); };
  return (
    <main className="center">
      <p className="script big">You've got a little something...</p>
      <button className={"envelope" + (open ? " open" : "")} onClick={go} aria-label="Open the envelope">
        <span className="letter-peek"><i>For {C.name}</i></span>
        <span className="flap" />
        <span className="front" />
        <span className="seal"><Heart size={18} fill="currentColor" /></span>
      </button>
      <p className="hint">{open ? "♡ ♡ ♡" : "Tap to open ♡"}</p>
    </main>
  );
}

function Login({ onOk }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (u.trim().toLowerCase() === C.auth.username && p === C.auth.password) onOk(); else setErr(true);
  };
  return (
    <main className="center fade">
      <form className="paper note" onSubmit={submit} noValidate>
        <h1>Before you enter...</h1>
        <p className="script">A little secret, just for you.</p>
        <label>Username<input value={u} onChange={(e) => { setU(e.target.value); setErr(false); }} autoComplete="username" autoCapitalize="none" /></label>
        <label>Password<input type="password" value={p} onChange={(e) => { setP(e.target.value); setErr(false); }} autoComplete="current-password" inputMode="numeric" /></label>
        <p className="err" role="alert">{err ? "Hmm, this isn't quite right. Try again, birthday boy ♡" : "\u00a0"}</p>
        <button className="btn" type="submit">Enter the little world ♡</button>
      </form>
    </main>
  );
}

function Counter() {
  const [t, setT] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setT(Date.now()), 1000); return () => clearInterval(id); }, []);
  const now = new Date(t);
  let next = new Date(now.getFullYear(), C.birthday.month - 1, C.birthday.day);
  const today = now.getMonth() === next.getMonth() && now.getDate() === next.getDate();
  if (!today && next < now) next = new Date(now.getFullYear() + 1, next.getMonth(), next.getDate());
  const s = Math.floor((next - now) / 1000);
  return (
    <p className="counter">
      {today ? "✦ It's your day ✦ " + now.toLocaleTimeString() :
        `${Math.floor(s / 86400)}d ${Math.floor(s % 86400 / 3600)}h ${Math.floor(s % 3600 / 60)}m ${s % 60}s until your next birthday`}
    </p>
  );
}

function Gallery() {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <section id="memories">
      <h2>Little Memories</h2>
      <div className="polaroids">
        {C.photos.map((p, i) => (
          <button key={i} className="polaroid" style={{ "--r": `${[-4, 3, -2, 5, -5, 2][i % 6]}deg` }} onClick={() => setSel(p)} aria-label={`Open photo: ${p.caption}`}>
            <span className="tape" />
            <img src={p.src} alt="" loading="lazy" onError={(e) => (e.target.style.opacity = 0.2)} />
            <em>{p.caption}</em>
          </button>
        ))}
      </div>
      {sel && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo" onClick={() => setSel(null)}>
          <figure className="polaroid big" onClick={(e) => e.stopPropagation()}>
            <img src={sel.src} alt={sel.caption} /><em>{sel.caption}</em>
          </figure>
          <button className="close" autoFocus onClick={() => setSel(null)} aria-label="Close"><X /></button>
        </div>
      )}
    </section>
  );
}

function Letter() {
  const [more, setMore] = useState(false);
  const ref = useRef(null); const [seen, setSeen] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.15 });
    o.observe(ref.current); return () => o.disconnect();
  }, []);
  return (
    <section id="letter">
      <h2>A Letter for You</h2>
      <article ref={ref} className={"paper letter" + (seen ? " seen" : "")}>
        {C.letter.map((l, i) => <p key={i} style={{ transitionDelay: `${i * 0.25}s` }}>{l}</p>)}
        <button className="btn" onClick={() => setMore(!more)} aria-expanded={more}>One more little thing...</button>
        <p className={"extra" + (more ? " show" : "")}>{C.extraNote}</p>
      </article>
    </section>
  );
}

function Playlist() {
  return (
    <section id="playlist">
      <p className="script">little songs that somehow remind me of you ♡</p>
      <h2>{C.spotify.title}</h2>
      <iframe title={C.spotify.title} src={C.spotify.embed} width="100%" height="352" style={{ borderRadius: 16, border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
      <a className="btn spot" href={C.spotify.url} target="_blank" rel="noopener noreferrer">Open our little playlist on Spotify ♡ <ExternalLink size={15} /></a>
      <p className="script small">Press play, and stay here for a while. ♡</p>
    </section>
  );
}

function Finale() {
  const [open, setOpen] = useState(false);
  return (
    <section id="finale">
      <h2>Before you go...</h2>
      {!open ? (
        <button className="gift" onClick={() => setOpen(true)} aria-label="Open the little gift"><Gift size={56} strokeWidth={1.2} /><span>tap me ♡</span></button>
      ) : (
        <div className="paper reveal"><p className="script big">{C.finale.message}</p><p className="sign">{C.finale.line}</p></div>
      )}
    </section>
  );
}

function Dashboard() {
  return (
    <>
      <nav className="nav">
        {[["home", "Home"], ["memories", "Little Memories"], ["letter", "A Letter for You"], ["playlist", "Our Little Playlist"]].map(([id, l]) => (
          <a key={id} href={`#${id}`}>{l}</a>
        ))}
      </nav>
      <main className="fade">
        <section id="home" className="hero">
          <h1>Happy Birthday, {C.name} ♡</h1>
          <p className="script big">Today, the world gets to celebrate someone who makes it a little more beautiful.</p>
          <p className="intro">{C.intro}</p>
          <Counter />
        </section>
        <Gallery /><Letter /><Playlist /><Finale />
      </main>
      <footer>Made with love, just for you ♡</footer>
    </>
  );
}

export default function App() {
  const [stage, setStage] = useState("envelope");
  return (
    <>
      <Hearts />
      {stage === "envelope" && <Envelope onDone={() => setStage("login")} />}
      {stage === "login" && <Login onOk={() => { setStage("home"); window.scrollTo(0, 0); }} />}
      {stage === "home" && <Dashboard />}
    </>
  );
}
