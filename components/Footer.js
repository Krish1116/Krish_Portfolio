export default function Footer({ data }) {
  return (
    <footer style={{
      padding:'2rem clamp(1.5rem,5vw,4rem)',
      borderTop:'1px solid var(--border)',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      flexWrap:'wrap', gap:'1rem',
    }}>
      <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)' }}>
        Designed & Built by <span style={{ color:'var(--accent)' }}>Krishna Chotaliya</span>
      </p>
      <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-dim)' }}>
        {data.email}
      </p>
    </footer>
  );
}
