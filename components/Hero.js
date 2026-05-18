import { useEffect, useRef, useState } from 'react';

export default function Hero({ data }) {
  const [typed, setTyped] = useState('');
  const titles = ['Web Developer', 'Full Stack Engineer', 'MERN Specialist'];
  const titleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  // Audio Playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    let t;
    const tick = () => {
      const current = titles[titleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true;
          t = setTimeout(tick, 2000);
          return;
        }
      } else {
        charIdx.current--;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          titleIdx.current = (titleIdx.current + 1) % titles.length;
        }
      }
      t = setTimeout(tick, deleting.current ? 40 : 80);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  // Initialize and clean up audio
  useEffect(() => {
    // Beautiful atmospheric synthesizers lofi track
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Starts at 0 for smooth fade-in

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Toggle Audio with smooth volume Fade-In/Fade-Out
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Fade out
      let vol = audioRef.current.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audioRef.current.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeOut);
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }, 50);
    } else {
      // Start play at 0 volume and fade in
      audioRef.current.volume = 0;
      audioRef.current.play().catch(err => console.log('Audio playback prevented:', err));
      setIsPlaying(true);

      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.25) {
          vol += 0.05;
          audioRef.current.volume = Math.min(vol, 0.3);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    }
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(6rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* 1. Deep Space Tiny Stars Background (Lightweight and CSS-only) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(var(--text), rgba(var(--accent-rgb),.2) 1px, transparent 30px)',
        backgroundSize: '240px 240px',
        opacity: 0.12
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(var(--text), rgba(var(--accent-rgb),.15) 1px, transparent 20px)',
        backgroundSize: '340px 340px',
        backgroundPosition: '120px 150px',
        opacity: 0.08
      }} />

      {/* 2. Soft Ambient Green/Teal Glow Orb in Right Background */}
      <div style={{
        position: 'absolute', top: '15%', right: '-5%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Hero Grid Container */}
      <div className="hero-grid" style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3rem', alignItems: 'center'
      }}>

        {/* Left Column: Floating 3D Character & Neon Glow */}
        <div className="hero-right" style={{
          position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',
          opacity: 0, animation: 'fadeUp 0.8s ease 0.4s forwards'
        }}>
          {/* Ambient Glow behind Character */}
          <div style={{
            position: 'absolute', width: '380px', height: '380px',
            background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.25) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(35px)', zIndex: 0, pointerEvents: 'none'
          }} />

          {/* Chibi Character Graphic Container */}
          <div style={{ position: 'relative', zIndex: 1, animation: 'float-char 6s ease-in-out infinite', width: '100%', maxWidth: '420px' }}>
            <img src="/image.png" alt="Krishna Chotaliya - Chibi 3D Mascot" style={{
              width: '100%', height: 'auto', display: 'block', borderRadius: '24px',
              filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 30px rgba(var(--accent-rgb), 0.15))'
            }} />
          </div>
        </div>

        {/* Right Column: Core Hero Text & Actions */}
        <div className="hero-left" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          opacity: 0, animation: 'fadeUp 0.6s ease 0.2s forwards'
        }}>
          {/* Animated typing header above name */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            color: 'var(--text)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1.2rem',
            display: 'flex', alignItems: 'center', minHeight: '2.5rem'
          }}>
            <span>{typed}</span>
            <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)', marginLeft: '2px', fontWeight: 'bold' }}>|</span>
          </div>

          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 700, color: 'var(--accent)', marginBottom: '0.3rem', lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            Hello, I'm
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(3rem, 7vw, 5.8rem)', lineHeight: 1.05,
            color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: '1.8rem'
          }}>
            Krishna Chotaliya
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.75,
            color: 'var(--text-muted)', maxWidth: '620px', marginBottom: '2.8rem',
            fontFamily: 'var(--font-body)'
          }}>
            I turn complex ideas into seamless, high-impact web experiences — building modern, scalable, and lightning-fast applications that make a difference.
          </p>

          {/* Action Buttons Row */}
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <a href="#projects" style={{
              padding: '16px 36px',
              background: 'linear-gradient(135deg, var(--accent) 0%, #7f00ff 100%)',
              color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '14px', letterSpacing: '0.05em', borderRadius: '50px',
              boxShadow: '0 8px 30px var(--accent-glow)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(var(--accent-rgb), 0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px var(--accent-glow)'; }}>
              View My Work
            </a>
            <a href="/Krishna Chotaliya.pdf" target="_blank" rel="noreferrer" style={{
              padding: '16px 36px',
              background: 'var(--text)',
              color: 'var(--bg)', fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '14px', letterSpacing: '0.05em', borderRadius: '50px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px var(--accent-dim)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(var(--accent-rgb), 0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-dim)'; }}>
              My Resume
            </a>
          </div>

          {/* Social Links Row (Clean inline SVGs) */}
          <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }}>
            <a href={data.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'all 0.2s ease', display: 'flex' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'none'; }}
              title="LinkedIn">
              <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href={data.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'all 0.2s ease', display: 'flex' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'none'; }}
              title="GitHub">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom-Right Ambient Music Playback Control (Mockup Feature) */}
      <div className="audio-music-container" style={{
        position: 'absolute', bottom: '2.5rem', right: 'clamp(1.5rem, 5vw, 4rem)',
        display: 'flex', alignItems: 'center', gap: '0.9rem', zIndex: 10,
        opacity: 0, animation: 'fadeIn 0.8s ease 1s forwards'
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '12px',
          color: 'var(--text-muted)', fontStyle: 'normal',
          letterSpacing: '0.02em', fontWeight: 600
        }}>
          Wanna play music while scrolling?
        </span>
        <button onClick={toggleAudio} style={{
          width: '46px', height: '46px', borderRadius: '50%',
          background: isPlaying ? 'var(--accent)' : 'var(--accent-dim)',
          border: isPlaying ? 'none' : '1px solid var(--border)',
          color: isPlaying ? 'var(--bg)' : 'var(--text-muted)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 20px var(--accent-glow)' : 'none',
          animation: isPlaying ? 'pulse-audio 2.5s infinite' : 'none'
        }}
          title={isPlaying ? "Mute Background Music" : "Play Background Music"}>
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      </div>

      {/* Local keyframes and responsive layout fixes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-char {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.8deg); }
        }
        @keyframes pulse-audio {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.5); }
          50% { transform: scale(1.06); box-shadow: 0 0 35px rgba(var(--accent-rgb), 0.8); }
        }
        @media (max-width: 992px) {
          #hero {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            padding-top: 100px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
            text-align: center;
            justify-items: center;
          }
          .hero-left {
            order: 1;
            align-items: center !important;
            text-align: center !important;
          }
          .hero-left div {
            justify-content: center !important;
          }
          .hero-right {
            order: 0;
            max-width: 320px;
          }
          .audio-music-container {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 3rem;
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          #hero {
            padding-top: 85px !important;
          }
          .hero-grid {
            gap: 1.5rem !important;
            padding-top: 1rem !important;
          }
          .hero-right {
            max-width: 210px !important;
          }
          .hero-left > p:first-of-type {
            font-size: 1.4rem !important;
            margin-bottom: 0.2rem !important;
          }
          .hero-left h1 {
            font-size: 2.2rem !important;
            margin-bottom: 0.8rem !important;
          }
          .hero-left > p:last-of-type {
            margin-bottom: 1.6rem !important;
            font-size: 13.5px !important;
            line-height: 1.6 !important;
          }
          .hero-left > div:last-of-type {
            margin-bottom: 1.5rem !important;
          }
        }
      ` }} />
    </section>
  );
}
