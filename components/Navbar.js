import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    // Read theme mode from localStorage, defaulting to dark mode
    const saved = localStorage.getItem('theme-mode') || 'dark';
    setThemeMode(saved);
    document.documentElement.setAttribute('data-theme', saved);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleThemeMode = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
    localStorage.setItem('theme-mode', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '76px',
      }}>
        {/* Left Side: Logo */}
        <a href="#hero" className="nav-logo" style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.4rem', letterSpacing: '-0.02em', color: 'var(--text)'
        }}>
          {/* Custom Stylized Logo Icon */}
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(15deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path d="M28 20 H40 V45 L65 20 H80 L52 50 L80 80 H65 L40 55 V80 H28 Z" fill="url(#logo-grad)" />
            <circle cx="50" cy="50" r="45" stroke="url(#logo-grad)" strokeWidth="4" strokeDasharray="8,6" />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Krishna</span>
        </a>

        {/* Center/Right Side: Theme Toggle, Hamburger & Call to Action (Always Visible) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }} className="nav-right-container">

          {/* Light/Dark Toggle Switch */}
          <button onClick={toggleThemeMode} title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`} style={{
            background: 'var(--accent-dim)', border: '1px solid rgba(var(--accent-rgb), 0.15)',
            width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', transition: 'all 0.3s ease', padding: 0
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'; e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--accent-dim)'; e.currentTarget.style.color = 'var(--accent)'; }}>
            {themeMode === 'dark' ? (
              /* Sun Icon for Light mode toggle */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              /* Moon Icon for Dark mode toggle */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          {/* Hamburger Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px',
            zIndex: 502, transition: 'transform 0.2s ease',
            outline: 'none'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: i === 1 ? '18px' : '24px',
                height: '2px',
                background: 'var(--text)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: menuOpen
                  ? (i === 0 ? 'rotate(45deg) translate(5.5px, 5.5px)' : i === 2 ? 'rotate(-45deg) translate(5.5px, -5.5px)' : 'scaleX(0)')
                  : undefined,
                alignSelf: 'flex-end'
              }} />
            ))}
          </button>

          {/* Call to Action "Reach Out" Button */}
          <a href="#contact" className="nav-cta-btn" style={{
            padding: '12px 26px',
            background: 'linear-gradient(135deg, #ec4899 0%, #3b82f6 100%)',
            color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '13px', borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(236, 72, 153, 0.25)',
            transition: 'all 0.3s ease',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.25)'; }}>
            Reach Out
          </a>
        </div>
      </nav>

      {/* Drawer Overlay Menu */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 501,
        background: 'var(--drawer-bg)',
        backdropFilter: 'blur(30px)',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      }} onClick={() => setMenuOpen(false)}>

        {/* Animated Links Container */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '1.8rem', alignItems: 'center',
          transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }} onClick={e => e.stopPropagation()}>
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 6vw, 2.3rem)', fontWeight: 800,
              color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '-0.02em',
              transition: 'all 0.2s ease', position: 'relative'
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'none'; }}
            >
              {l}
            </a>
          ))}

          {/* Drawer Call to Action Button (Only visible on mobile screens) */}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="drawer-cta-btn" style={{
            marginTop: '1.5rem',
            padding: '16px 36px',
            background: 'linear-gradient(135deg, var(--accent) 0%, #7f00ff 100%)',
            color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '15px', borderRadius: '50px',
            boxShadow: '0 8px 30px var(--accent-glow)',
            transition: 'all 0.3s ease',
            display: 'none',
            alignItems: 'center', justifyContent: 'center'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
            Reach Out ↗
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .nav-cta-btn {
            display: none !important;
          }
          .drawer-cta-btn {
            display: inline-flex !important;
          }
          .nav-logo span {
            font-size: 1.15rem !important;
          }
          nav {
            padding: 0 1rem !important;
          }
          .nav-right-container {
            gap: 0.6rem !important;
          }
          button {
            outline: none !important;
          }
        }
      ` }} />
    </>
  );
}
