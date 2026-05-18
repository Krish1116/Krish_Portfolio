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

export default function Experience({ data }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const exp = data.experience;

  return (
    <section id="experience" ref={ref} style={{
      padding:'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)',
      background:'var(--bg2)',
    }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.8rem' }}>
          03. Experience
        </p>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.03em', marginBottom:'3.5rem', lineHeight:1.1 }}>
          Where I've Worked
        </h2>

        <div className="exp-grid" style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'2rem' }}>
          {/* Tab list */}
          <div className="exp-tabs" style={{ display:'flex', flexDirection:'column', borderLeft:'1px solid var(--border)' }}>
            {exp.map((e, i) => (
              <button key={i} onClick={() => setActive(i)} 
                className={active === i ? 'active-tab' : ''}
                style={{
                  background:'none', border:'none', cursor:'pointer',
                  padding:'14px 20px', textAlign:'left',
                  fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.05em',
                  color: active===i ? 'var(--accent)' : 'var(--text-muted)',
                  borderLeft: active===i ? '2px solid var(--accent)' : '2px solid transparent',
                  marginLeft:'-1px', transition:'all 0.2s',
                  background: active===i ? 'rgba(var(--accent-rgb),0.06)' : 'transparent',
                }}>
                {e.company.split(' ').slice(0,2).join(' ')}
              </button>
            ))}
          </div>

          {/* Content */}
          {exp.map((e, i) => (
            <div key={i} style={{
              display: active===i ? 'block' : 'none',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition:'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.4rem', marginBottom:'4px' }}>
                {e.role}{' '}
                <span style={{ color:'var(--accent)' }}>@ {e.company}</span>
              </h3>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-dim)', letterSpacing:'0.08em', marginBottom:'1.8rem' }}>
                {e.period}
              </p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'1rem' }}>
                {e.bullets.map((b, bi) => (
                  <li key={bi} style={{ display:'flex', gap:'12px', alignItems:'flex-start' }}>
                    <span style={{ color:'var(--accent)', flexShrink:0, marginTop:'3px', fontFamily:'var(--font-mono)', fontSize:'13px' }}>▸</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'13px', color:'var(--text-muted)', lineHeight:1.7 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education strip */}
        <div style={{
          marginTop:'4rem', padding:'1.8rem',
          background:'var(--surface)', border:'1px solid var(--border)',
          borderRadius:'12px', display:'flex', gap:'2rem', flexWrap:'wrap',
          alignItems:'center', justifyContent:'space-between',
        }}>
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'6px' }}>Education</p>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1rem' }}>{data.education.degree}</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-muted)', marginTop:'4px' }}>{data.education.school}</p>
          </div>
          <div style={{ textAlign:'right' }}>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'2rem', color:'var(--accent)' }}>{data.education.gpa}</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-dim)' }}>GPA · {data.education.period}</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .exp-grid h3 {
            font-size: clamp(1.1rem, 4.5vw, 1.35rem) !important;
            line-height: 1.35 !important;
            margin-bottom: 6px !important;
          }
          .exp-tabs {
            flex-direction: row !important;
            border-left: none !important;
            border-bottom: 1px solid var(--border) !important;
            overflow-x: hidden !important;
            width: 100% !important;
          }
          .exp-tabs button {
            border-left: none !important;
            border-bottom: 2px solid transparent !important;
            text-align: center !important;
            flex: 1 !important;
            min-width: 0 !important;
            padding: 12px 4px !important;
            font-size: clamp(10px, 2.7vw, 12px) !important;
            white-space: nowrap !important;
          }
          .exp-tabs button.active-tab {
            border-bottom: 2px solid var(--accent) !important;
          }
        }
      ` }} />
    </section>
  );
}
