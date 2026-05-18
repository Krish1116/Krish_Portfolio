import Head from 'next/head';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SystemStatus from '../components/SystemStatus';
import { portfolioData as data } from '../data/portfolio';

export default function Home() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  // Disable scroll memory and force top scroll to Hero on page refresh/reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, null, ' ');
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;

      const isHovering = e.target.closest('a, button, [role="button"], input, select, textarea, .clickable');
      if (isHovering) {
        cursor.classList.add('hover');
        ring.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
        ring.classList.remove('hover');
      }
    };

    let frameId;
    const updateRing = () => {
      const ease = 0.16;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      frameId = requestAnimationFrame(updateRing);
    };
    frameId = requestAnimationFrame(updateRing);

    document.addEventListener('mousemove', onMove);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{`${data.name} — ${data.title}`}</title>
        <meta name="description" content={data.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </Head>

      {/* Custom cursor (desktop only) */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      <Navbar />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Skills data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Contact data={data} />
      </main>
      <SystemStatus />
      <Footer data={data} />

      <style>{`
        @media (max-width: 768px) {
          .cursor, .cursor-ring { display: none; }
          body { cursor: auto; }
        }
      `}</style>
    </>
  );
}
