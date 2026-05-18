export default function Contact({ data }) {
  return (
    <section id="contact" style={{
      padding:'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)',
      background:'var(--bg2)',
    }}>
      <div style={{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.8rem' }}>
          05. Contact
        </p>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.03em', marginBottom:'1.5rem', lineHeight:1.1 }}>
          Let's Build Something
        </h2>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'14px', color:'var(--text-muted)', marginBottom:'3rem', lineHeight:1.8 }}>
          Open to new opportunities, collaborations, and interesting conversations. My inbox is always open.
        </p>

        <a href={`mailto:${data.email}`} style={{
          display:'inline-block', padding:'16px 40px',
          background:'var(--accent)', color:'var(--bg)',
          fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.9rem',
          letterSpacing:'0.05em', borderRadius:'6px',
          transition:'transform 0.2s, box-shadow 0.2s',
          marginBottom:'3rem',
        }}
        onMouseEnter={e => { e.target.style.transform='translateY(-3px)'; e.target.style.boxShadow='0 12px 40px var(--accent-glow)'; }}
        onMouseLeave={e => { e.target.style.transform=''; e.target.style.boxShadow=''; }}>
          Say Hello ↗
        </a>

        {/* Links row */}
        <div style={{ display:'flex', justifyContent:'center', gap:'2rem', flexWrap:'wrap' }}>
          {[
            { label:'Email', href:`mailto:${data.email}`, val:data.email },
            { label:'GitHub', href:data.github, val:'github.com/Krish1116' },
            { label:'LinkedIn', href:data.linkedin, val:'linkedin.com/in/krish1116' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
              display:'flex', flexDirection:'column', gap:'4px',
              transition:'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color='inherit'}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-dim)' }}>{l.label}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--text-muted)' }}>{l.val}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
