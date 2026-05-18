import { useRef, useEffect, useState } from 'react';

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function About({ data }) {
  const [ref, inView] = useInView();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="about" ref={ref} style={{
      padding:'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)',
      background:'var(--bg2)',
    }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
        {/* Left text */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(-24px)',
          transition:'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.8rem' }}>
            01. About
          </p>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.03em', marginBottom:'1.5rem', lineHeight:1.1 }}>
            Who I Am
          </h2>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'13.5px', color:'var(--text-muted)', lineHeight:1.85, marginBottom:'1.2rem' }}>
            I'm a Full Stack MERN Developer based in <span style={{ color:'var(--accent)' }}>Ahmedabad, India</span> with 3 years of experience crafting production-grade web applications.
          </p>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'13.5px', color:'var(--text-muted)', lineHeight:1.85, marginBottom:'2rem' }}>
            I specialize in building scalable SaaS platforms, real-time systems, and AI-integrated applications. My stack spans React.js, Node.js, PostgreSQL, MongoDB, and AWS – with a strong focus on performance and clean architecture.
          </p>
          <div style={{ display:'flex', gap:'1.2rem', flexWrap:'wrap' }}>
            <a href={data.github} target="_blank" rel="noreferrer" style={{
              fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)',
              borderBottom:'1px solid rgba(var(--accent-rgb),0.3)', paddingBottom:'2px',
              transition:'border-color 0.2s',
            }}>github.com/Krish1116 →</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" style={{
              fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--accent)',
              borderBottom:'1px solid rgba(var(--accent-rgb),0.3)', paddingBottom:'2px',
            }}>LinkedIn →</a>
          </div>
        </div>

        {/* Right card */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(24px)',
          transition:'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
        }}>
          <div 
            onMouseMove={handleMouseMove}
            className="glow-card"
            style={{
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:'16px', padding:'2rem',
            }}>
            {[
              { label:'Name', val:data.name },
              { label:'Role', val:data.title },
              { label:'Location', val:data.location },
              { label:'Email', val:data.email },
              { label:'Phone', val:data.phone },
              { label:'Status', val:'Open to opportunities', accent:true },
            ].map((row, i) => (
              <div key={i} style={{
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'12px 0',
                borderBottom: i < 5 ? '1px solid var(--border)' : 'none',
                gap:'1rem',
              }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-dim)', flexShrink:0 }}>{row.label}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color: row.accent ? 'var(--accent)' : 'var(--text)', textAlign:'right' }}>{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          #about > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      ` }} />
    </section>
  );
}
