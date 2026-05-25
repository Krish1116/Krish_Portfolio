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

  // Theme Detection state
  const [activeTheme, setActiveTheme] = useState('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial theme
    const htmlTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setActiveTheme(htmlTheme);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setActiveTheme(current);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

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
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(5rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* 1. Starry/Dotted Space Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(var(--text), rgba(var(--accent-rgb),.15) 1px, transparent 30px)',
        backgroundSize: '200px 200px',
        opacity: 0.1
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(var(--text), rgba(var(--accent-rgb),.1) 1px, transparent 20px)',
        backgroundSize: '300px 300px',
        backgroundPosition: '100px 100px',
        opacity: 0.07
      }} />

      {/* 2. Soft Ambient Colorful Glow Orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(255, 95, 162, 0.12) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* Main Hero Container */}
      <div className="hero-container" style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: '3rem'
      }}>

        {/* Upper Layout: Mascot Left & Content Right */}
        <div className="hero-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '4rem',
          alignItems: 'center',
          width: '100%'
        }}>

          {/* Left Column: Robot Mascot (Left Side) */}
          <div className="hero-mascot-col" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0,
            animation: 'fadeUp 0.8s ease 0.4s forwards'
          }}>
            {/* Ambient Purple/Pink Glow behind Robot */}
            <div style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(255, 95, 162, 0.22) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(35px)',
              zIndex: 0,
              pointerEvents: 'none'
            }} />

            {/* Dual-tone Cyan glow behind Robot */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              zIndex: 0,
              pointerEvents: 'none',
              transform: 'translate(20px, 30px)'
            }} />

            {/* Floating Background Code Accents */}
            <div className="floating-code-tag" style={{
              position: 'absolute',
              top: '8%',
              right: '12%',
              fontSize: '56px',
              fontWeight: 300,
              fontFamily: 'var(--font-mono)',
              color: 'rgba(0, 240, 255, 0.15)',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'float-char 7s ease-in-out infinite alternate'
            }}>
              &lt;/&gt;
            </div>

            <div className="floating-code-tag" style={{
              position: 'absolute',
              left: '8%',
              top: '32%',
              fontSize: '48px',
              fontWeight: 300,
              fontFamily: 'var(--font-mono)',
              color: 'rgba(255, 95, 162, 0.18)',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'float-char 5s ease-in-out infinite alternate-reverse'
            }}>
              {'{}'}
            </div>

            <div className="floating-code-tag" style={{
              position: 'absolute',
              right: '6%',
              bottom: '22%',
              fontSize: '44px',
              fontWeight: 300,
              fontFamily: 'var(--font-mono)',
              color: 'rgba(255, 95, 162, 0.12)',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'float-char 6s ease-in-out infinite alternate'
            }}>
              {'{}'}
            </div>

            {/* Robot Mascot Graphic Container */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              animation: 'float-char 6s ease-in-out infinite',
              width: '100%',
              maxWidth: '540px',
              margin: '0 auto'
            }}>
              <img
                src={activeTheme === 'light' ? '/image_light.jpg' : '/image.png'}
                alt="Krishna Chotaliya - Chibi 3D Mascot"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '24px',
                  filter: activeTheme === 'light'
                    ? 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.15)) drop-shadow(0 0 20px rgba(255, 95, 162, 0.1))'
                    : 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 30px rgba(255, 95, 162, 0.18))',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Right Column: Hero Details (Right Side) */}
          <div className="hero-content-col" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            opacity: 0,
            animation: 'fadeUp 0.6s ease 0.2s forwards'
          }}>

            {/* 2. Headline - KRISHNA CHOTALIYA */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
              lineHeight: '0.98',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 0 1.2rem 0',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left'
            }}>
              <span style={{ color: 'var(--text)' }}>KRISHNA</span>
              <span style={{
                background: 'linear-gradient(90deg, #ff5fa2 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: activeTheme === 'light' ? 'none' : '0 0 40px rgba(255, 95, 162, 0.15)'
              }}>
                CHOTALIYA
              </span>
            </h1>

            {/* 3. Role Title Banner with Typing & Gradient Lines */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.4rem',
              width: '100%'
            }}>
              <div style={{
                height: '2px',
                flex: 1,
                background: 'linear-gradient(90deg, transparent, #ff5fa2)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  MERN STACK DEVELOPER
                </span>
                {/* Micro-typing status dot / cursor */}
                <span className="live-dot" style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#00f0ff',
                  boxShadow: '0 0 10px #00f0ff',
                  display: 'inline-block'
                }} />
              </div>

              <div style={{
                height: '2px',
                flex: 1,
                background: 'linear-gradient(90deg, #00f0ff, transparent)'
              }} />
            </div>

            {/* Typing subtitle that dynamically toggles titles */}
            <div className="typing-subtitle" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13.5px',
              color: 'var(--text-muted)',
              marginBottom: '1.2rem',
              letterSpacing: '0.05em',
              lineHeight: '1.6',
              display: 'block',
              width: '100%'
            }}>
              <span style={{ color: '#00f0ff', marginRight: '6px' }}>&gt;</span>
              Currently building as{' '}
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{typed}</span>
              <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)', marginLeft: '2px', fontWeight: 'bold' }}>|</span>
            </div>

            {/* 4. Description */}
            <p className="hero-desc" style={{
              fontSize: 'clamp(14px, 1.1vw, 15.5px)',
              lineHeight: '1.65',
              color: 'var(--text-muted)',
              maxWidth: '620px',
              marginBottom: '1.8rem',
              fontFamily: 'var(--font-body)',
              width: '100%'
            }}>
              I turn complex ideas into seamless, high-impact web experiences — building modern, scalable, and lightning-fast applications that{' '}
              <span style={{
                color: '#ff5fa2',
                fontWeight: 600,
                textShadow: activeTheme === 'light' ? '0 0 8px rgba(255, 75, 140, 0.2)' : '0 0 12px rgba(255, 95, 162, 0.45)'
              }}>
                make a difference
              </span>.
            </p>

            {/* 5. Core Skills Card Row */}
            <div className="hero-skills-row" style={{
              width: '100%',
              background: activeTheme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(14, 13, 22, 0.65)',
              border: activeTheme === 'light' ? '1px solid rgba(255, 95, 162, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '1.1rem 1.4rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              boxShadow: activeTheme === 'light' ? '0 8px 30px rgba(255, 95, 162, 0.04)' : '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              transition: 'background 0.3s ease, border 0.3s ease'
            }}>
              {/* React.js */}
              <div className="skill-item-row1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '70px' }}>
                <div className="skill-icon-wrap" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
                    <g stroke="#00d8ff" strokeWidth="1" fill="none">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text)', fontWeight: 600 }}>React.js</span>
              </div>

              <div className="skills-divider" style={{ width: '1px', height: '28px', background: activeTheme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }} />

              {/* Next.js */}
              <div className="skill-item-row1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '70px' }}>
                <div className="skill-icon-wrap" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask_next" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                      <circle cx="90" cy="90" r="90" fill="black" />
                    </mask>
                    <g mask="url(#mask_next)">
                      <circle cx="90" cy="90" r="90" fill="transparent" stroke="var(--text)" strokeWidth="6" />
                      <path d="M149.508 157.52L69.142 54H54V125.928H70.2858V75.6L140.22 164.88C143.518 162.616 146.623 160.144 149.508 157.52Z" fill="var(--text)" />
                      <rect x="115.142" y="54" width="16.2858" height="71.928" fill="var(--text)" />
                    </g>
                  </svg>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text)', fontWeight: 600 }}>Next.js</span>
              </div>

              <div className="skills-divider" style={{ width: '1px', height: '28px', background: activeTheme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }} />

              {/* Node.js */}
              <div className="skill-item-row1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '70px' }}>
                <div className="skill-icon-wrap" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 256 292" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M128 0L24.5 59.8v119.5L128 239l103.5-59.8V59.8L128 0z" fill="#43853d" />
                    <path d="M128 23.3L37.8 75.4V179.6L128 231.7L218.2 179.6V75.4L128 23.3z" fill="#333333" />
                    <path d="M110.8 157.2v-36.9c0-5 3.3-8.8 8.8-8.8 5 0 8 3.3 8 8.8v36.9c0 5-3.3 8.8-8 8.8-5.5 0-8.8-3.8-8.8-8.8zm23.3 0v-63.5c0-5 3.3-8.8 8-8.8 5 0 8 3.3 8 8.8v63.5c0 5-3.3 8.8-8 8.8-5.3 0-8-3.8-8-8.8z" fill="#ffffff" />
                  </svg>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text)', fontWeight: 600 }}>Node.js</span>
              </div>

              <div className="skills-divider" style={{ width: '1px', height: '28px', background: activeTheme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }} />

              {/* MongoDB */}
              <div className="skill-item-row2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '70px' }}>
                <div className="skill-icon-wrap" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="26" viewBox="0 0 256 595" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M122.9 593.7c1.3.8 2.8.8 4.1 0 14.1-8.5 129-79.9 129-335C256 94.6 142.1 4.5 131.7.3c-2.4-1-5.1-1-7.5 0C113.8 4.5 0 94.6 0 258.7c0 255.1 114.9 326.5 122.9 595z" fill="#47a248" />
                    <path d="M128 593.8V1.3c8.1 3.2 97.4 75.3 97.4 257.4 0 220-80.9 285.5-97.4 335.1z" fill="#3fa037" />
                    <path d="M128 474V154.2c-2.5-1.5-5.8-3.8-8.9-6.3V482c3.1-2.5 6.4-4.8 8.9-8z" fill="#ffffff" />
                    <path d="M128 474v8c2.5-2.5 5.8-5.8 8.9-8.8v-320c-3.1 3-6.4 6.3-8.9 8.8v312z" fill="#3f2c00" />
                  </svg>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text)', fontWeight: 600 }}>MongoDB</span>
              </div>

              <div className="skills-divider" style={{ width: '1px', height: '28px', background: activeTheme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }} />

              {/* AI Integration */}
              <div className="skill-item-row2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '80px' }}>
                <div className="skill-icon-wrap" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff5fa2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
                    <path d="M12 5h1" /><path d="M12 9h2" /><path d="M12 14h2" /><path d="M12 19h1" />
                    <path d="M11 5h-1" /><path d="M10 9H8" /><path d="M10 14H8" /><path d="M11 19h-1" />
                  </svg>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text)', fontWeight: 600 }}>AI Integration</span>
              </div>
            </div>

            {/* 6. Quick Action Links (Resume & Projects) */}
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
              <a href="#projects" style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, var(--accent) 0%, #7f00ff 100%)',
                color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '13.5px', letterSpacing: '0.05em', borderRadius: '50px',
                boxShadow: '0 8px 30px var(--accent-glow)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = activeTheme === 'light' ? '0 12px 30px rgba(255, 75, 140, 0.3)' : '0 12px 35px rgba(var(--accent-rgb), 0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px var(--accent-glow)'; }}>
                Explore Projects
              </a>
              <a href="/Krishna_Chotaliya.pdf" target="_blank" rel="noreferrer" style={{
                padding: '12px 28px',
                background: activeTheme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '13.5px', letterSpacing: '0.05em', borderRadius: '50px',
                border: activeTheme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = activeTheme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = activeTheme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)'; }}>
                Get Resume
              </a>
            </div>
          </div>
        </div>

        {/* Lower Layout: Widescreen Glassmorphic Contact & Stats Card */}
        <div className="hero-footer-card" style={{
          width: '100%',
          background: activeTheme === 'light' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(10, 8, 18, 0.45)',
          border: activeTheme === 'light' ? '1px solid rgba(255, 95, 162, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          padding: '1.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1.15fr auto 0.85fr',
          gap: '2.5rem',
          alignItems: 'center',
          boxShadow: activeTheme === 'light' ? '0 10px 40px rgba(0, 0, 0, 0.04)' : '0 10px 40px 0 rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(16px)',
          zIndex: 2,
          position: 'relative',
          opacity: 0,
          animation: 'fadeUp 0.8s ease 0.6s forwards',
          transition: 'background 0.3s ease, border 0.3s ease'
        }}>
          {/* Left half: Contact List */}
          <div className="footer-contacts" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            columnGap: '2rem',
            rowGap: '0.8rem'
          }}>
            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff5fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize: '13.5px', color: 'var(--text)', fontWeight: 500 }}>Ahmedabad, India</span>
            </div>

            {/* GitHub */}
            <a href={data.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }} className="clickable">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span className="footer-link-text" style={{ fontSize: '13.5px', color: 'var(--text-muted)', transition: 'color 0.2s' }}>github.com/Krish1116</span>
            </a>

            {/* Email */}
            <a href={`mailto:${data.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }} className="clickable">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff5fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="footer-link-text" style={{ fontSize: '13.5px', color: 'var(--text-muted)', transition: 'color 0.2s' }}>heykrish333@gmail.com</span>
            </a>

            {/* LinkedIn */}
            <a href={data.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }} className="clickable">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="footer-link-text" style={{ fontSize: '13.5px', color: 'var(--text-muted)', transition: 'color 0.2s' }}>linkedin.com/in/krish1116</span>
            </a>

            {/* Phone */}
            <a href={`tel:${data.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }} className="clickable">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff5fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="footer-link-text" style={{ fontSize: '13.5px', color: 'var(--text-muted)', transition: 'color 0.2s' }}>+91 7203802301</span>
            </a>

            {/* Website */}
            <a href="https://krish-portfolio1611.netlify.app" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }} className="clickable">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="footer-link-text" style={{ fontSize: '13.5px', color: 'var(--text-muted)', transition: 'color 0.2s' }}>krish-portfolio1611.netlify.app</span>
            </a>
          </div>

          {/* Vertical divider bar */}
          <div className="footer-divider-bar" style={{ width: '1px', height: '100%', minHeight: '64px', background: activeTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' }} />

          {/* Right half: Dynamic statistics */}
          <div className="footer-stats" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '1.5rem',
            rowGap: '1.1rem'
          }}>
            {/* Stat 1: 3+ Experience */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <div style={{ color: '#ff5fa2', fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
                &lt;/&gt;
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontSize: '16px', color: 'var(--text)', fontWeight: 800 }}>3+</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Years Experience</span>
              </div>
            </div>

            {/* Stat 2: 10+ Projects */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontSize: '16px', color: 'var(--text)', fontWeight: 800 }}>10+</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Projects Completed</span>
              </div>
            </div>

            {/* Stat 3: Scalable */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 800 }}>Scalable</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Real-time Apps</span>
              </div>
            </div>

            {/* Stat 4: Client Focused */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff5fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 800 }}>Client</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Focused Solutions</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Ambient Music Playback Control (Sleek corner component) */}
      <div className="audio-music-container" style={{
        position: 'absolute', bottom: '2rem', right: '3rem',
        display: 'flex', alignItems: 'center', gap: '0.8rem', zIndex: 10,
        opacity: 0, animation: 'fadeIn 0.8s ease 1s forwards'
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '11px',
          color: 'var(--text-muted)', fontStyle: 'normal',
          letterSpacing: '0.02em', fontWeight: 600
        }}>
          Play ambiance lofi?
        </span>
        <button onClick={toggleAudio} style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: isPlaying ? 'var(--accent)' : 'rgba(255, 95, 162, 0.08)',
          border: isPlaying ? 'none' : '1px solid rgba(255, 95, 162, 0.25)',
          color: isPlaying ? 'var(--bg)' : '#ff5fa2',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 15px var(--accent-glow)' : 'none',
          animation: isPlaying ? 'pulse-audio 2.5s infinite' : 'none'
        }}
          title={isPlaying ? "Mute Background Music" : "Play Background Music"}
          className="clickable">
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      </div>

      {/* Custom localized responsive grid behaviors and keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-char {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.6deg); }
        }
        @keyframes pulse-audio {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.4); }
          50% { transform: scale(1.08); box-shadow: 0 0 28px rgba(var(--accent-rgb), 0.7); }
        }
        
        /* Dynamic Centering Rules */
        .typing-subtitle {
          text-align: left;
        }
        .hero-desc {
          text-align: left;
        }

        /* Interactive Link Hovers */
        .footer-link-text:hover {
          color: #ff5fa2 !important;
        }

        /* Screen Sizes Styles & Adaptive Grids */
        @media (max-width: 1024px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            text-align: center;
          }
          .hero-mascot-col {
            order: 0 !important;
          }
          .hero-content-col {
            order: 1 !important;
            align-items: center !important;
            text-align: center !important;
          }
          .hero-content-col h1 {
            align-items: center !important;
          }
          .typing-subtitle {
            text-align: center !important;
          }
          .hero-desc {
            text-align: center !important;
          }
          .hero-skills-row {
            justify-content: center !important;
          }
          .hero-footer-card {
            grid-template-columns: 1fr !important;
            gap: 1.8rem !important;
            padding: 1.5rem !important;
          }
          .footer-divider-bar {
            display: none !important;
          }
          .footer-contacts {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 0.6rem !important;
          }
        }
        
        @media (max-width: 640px) {
          #hero {
            padding-top: 80px !important;
          }
          .hero-mascot-col img {
            max-width: 250px !important;
          }
          .floating-code-tag {
            display: none !important;
          }
          .hero-skills-row {
            padding: 0.8rem 1rem !important;
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 1.2rem 0.5rem !important;
          }
          .skills-divider {
            display: none !important;
          }
          .skill-item-row1 {
            flex: 0 0 28% !important;
            max-width: 28% !important;
            min-width: 60px !important;
          }
          .skill-item-row2 {
            flex: 0 0 42% !important;
            max-width: 42% !important;
            min-width: 60px !important;
          }
          .footer-contacts {
            grid-template-columns: 1fr !important;
            row-gap: 0.6rem !important;
          }
          .footer-stats {
            grid-template-columns: 1fr !important;
            row-gap: 1rem !important;
            justify-items: start !important;
          }
          .audio-music-container {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 2rem;
            width: 100%;
            justify-content: center !important;
          }
        }
      ` }} />
    </section>
  );
}
