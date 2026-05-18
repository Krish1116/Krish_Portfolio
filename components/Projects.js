import { useRef, useEffect, useState } from 'react';

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Projects({ data }) {
  const [ref, inView] = useInView();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" ref={ref} style={{
      padding:'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)',
      maxWidth:'1200px', margin:'0 auto',
    }}>
      <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.8rem' }}>
        04. Projects
      </p>
      <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.03em', marginBottom:'3.5rem', lineHeight:1.1 }}>
        Things I've Built
      </h2>

      <div className="projects-grid">
        {data.projects.map((p, i) => (
          <article key={i} 
            onMouseMove={handleMouseMove}
            className="glow-card project-card"
            style={{
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:'12px', padding:'2rem',
              position:'relative', overflow:'hidden',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition:`opacity 0.5s ease ${i*0.12}s, transform 0.5s ease ${i*0.12}s, border-color 0.3s`,
              cursor:'default',
            }}>
            {/* Number */}
            <span style={{
              position:'absolute', top:'1.5rem', right:'1.8rem',
              fontFamily:'var(--font-display)', fontWeight:800,
              fontSize:'3.5rem', color:'rgba(var(--accent-rgb),0.06)',
              lineHeight:1,
            }}>0{i+1}</span>

            {/* Accent line */}
            <div style={{ width:'32px', height:'2px', background:'var(--accent)', marginBottom:'1.5rem', borderRadius:'2px' }}/>

            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.15rem', marginBottom:'1rem', lineHeight:1.3 }}>
              {p.name}
            </h3>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-muted)', lineHeight:1.75, marginBottom:'1.8rem' }}>
              {p.desc}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
              {p.tech.map(t => (
                <span key={t} style={{
                  padding:'3px 9px', borderRadius:'3px',
                  background:'rgba(var(--accent-rgb),0.08)',
                  border:'1px solid rgba(var(--accent-rgb),0.2)',
                  fontFamily:'var(--font-mono)', fontSize:'10px',
                  color:'var(--accent)', letterSpacing:'0.05em',
                }}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .projects-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }
        .project-card {
          flex: 1 1 340px;
          max-width: calc(33.333% - 1rem);
        }
        @media (max-width: 1100px) {
          .project-card {
            max-width: calc(50% - 0.75rem);
          }
        }
        @media (max-width: 768px) {
          .project-card {
            max-width: 100%;
          }
        }
      ` }} />
    </section>
  );
}
