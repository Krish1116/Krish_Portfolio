import { useRef, useEffect, useState } from 'react';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Skills({ data }) {
  const [ref, inView] = useInView();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="skills" ref={ref} style={{
      padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)',
      maxWidth: '1200px', margin: '0 auto',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Drifting Tech Stack Logos in Background */}
      <div className="skills-stars-container">
        <div className="floating-logo" style={{ top: '12%', left: '8%', width: '45px', height: '45px', animationDelay: '0s', animationDuration: '18s' }} title="React Core">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
        </div>
        <div className="floating-logo" style={{ top: '24%', left: '86%', width: '40px', height: '40px', animationDelay: '2.5s', animationDuration: '22s' }} title="Node Server">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z M12 3.8L20.2 8v8L12 20.2 3.8 16V8z"/></svg>
        </div>
        <div className="floating-logo" style={{ top: '48%', left: '4%', width: '35px', height: '35px', animationDelay: '5s', animationDuration: '15s' }} title="Relational DB">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></svg>
        </div>
        <div className="floating-logo" style={{ top: '74%', left: '90%', width: '42px', height: '42px', animationDelay: '3.5s', animationDuration: '24s' }} title="Braces Code">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 5l-5 7 5 7M16 5l5 7-5 7M10 19l4-14"/></svg>
        </div>
        <div className="floating-logo" style={{ top: '86%', left: '14%', width: '38px', height: '38px', animationDelay: '7s', animationDuration: '19s' }} title="Git VCS">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 15V9a3 3 0 013-3h6M6 6v9"/></svg>
        </div>
        <div className="floating-logo" style={{ top: '56%', left: '45%', width: '36px', height: '36px', animationDelay: '1.2s', animationDuration: '20s' }} title="Brackets Tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
        </div>
      </div>

      <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.8rem', position: 'relative', zIndex: 1 }}>
        02. Technical Skills
      </p>
      <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.03em', marginBottom:'3.5rem', lineHeight:1.1, position: 'relative', zIndex: 1 }}>
        What I Work With
      </h2>

      <div className="skills-grid" style={{ position: 'relative', zIndex: 1 }}>
        {Object.entries(data.skills).map(([cat, tags], ci) => (
          <div key={cat} 
            onMouseMove={handleMouseMove}
            className="glow-card skill-card"
            style={{
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:'12px', padding:'1.8rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${ci*0.1}s, transform 0.5s ease ${ci*0.1}s`,
            }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1.4rem' }}>
              <span className="skills-bullet" />
              <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.05em', textTransform:'uppercase', color:'var(--text-muted)' }}>
                {cat}
              </span>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {tags.map(tag => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }
        .skill-card {
          flex: 1 1 320px;
        }
        /* Row 1: Frontend and Backend (exactly 2 cards) */
        .skill-card:nth-child(1),
        .skill-card:nth-child(2) {
          max-width: calc(50% - 0.75rem);
          flex: 1 1 calc(50% - 0.75rem);
        }
        /* Row 2: Databases, AI & APIs, DevOps (exactly 3 cards) */
        .skill-card:nth-child(3),
        .skill-card:nth-child(4),
        .skill-card:nth-child(5) {
          max-width: calc(33.333% - 1rem);
          flex: 1 1 calc(33.333% - 1rem);
        }
        .skills-bullet {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--accent), 0 0 16px var(--accent);
          animation: floatPulse 3s ease-in-out infinite;
        }
        @keyframes floatPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
            box-shadow: 0 0 6px var(--accent);
          }
          50% {
            transform: translateY(-2px) scale(1.25);
            opacity: 1;
            box-shadow: 0 0 15px var(--accent), 0 0 25px var(--accent);
          }
        }
        .skills-stars-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .floating-logo {
          position: absolute;
          color: rgba(var(--accent-rgb), 0.08);
          opacity: 0.2;
          animation: floatLogo linear infinite;
        }
        @keyframes floatLogo {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.15;
          }
          50% {
            opacity: 0.65;
            transform: translateY(-30px) translateX(12px) rotate(180deg);
          }
          100% {
            transform: translateY(-60px) translateX(0) rotate(360deg);
            opacity: 0.15;
          }
        }
        .skill-tag {
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.03em;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .skill-tag::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.4;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skill-tag:hover {
          background: rgba(var(--accent-rgb), 0.08);
          border-color: rgba(var(--accent-rgb), 0.4);
          color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(var(--accent-rgb), 0.15);
        }
        .skill-tag:hover::before {
          opacity: 1;
          transform: scale(1.5);
          box-shadow: 0 0 8px var(--accent);
        }
        @media (max-width: 992px) {
          .skill-card,
          .skill-card:nth-child(1),
          .skill-card:nth-child(2),
          .skill-card:nth-child(3),
          .skill-card:nth-child(4),
          .skill-card:nth-child(5) {
            max-width: calc(50% - 0.75rem) !important;
            flex: 1 1 calc(50% - 0.75rem) !important;
          }
        }
        @media (max-width: 768px) {
          .floating-logo {
            transform: scale(0.65) !important;
          }
          .skill-card,
          .skill-card:nth-child(1),
          .skill-card:nth-child(2),
          .skill-card:nth-child(3),
          .skill-card:nth-child(4),
          .skill-card:nth-child(5) {
            max-width: 100% !important;
            flex: 1 1 100% !important;
          }
        }
      ` }} />
    </section>
  );
}
