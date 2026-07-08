import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldIcon, ZapIcon, KeyIcon, BellIcon, ShareIcon, MonitorIcon,
  LockClosedIcon, CheckIcon, ArrowRightIcon
} from '../components/Icons';

const FEATURES = [
  { Icon: ShieldIcon,  title: 'Zero-Knowledge Encryption', desc: 'Your master password never leaves your device. AES-256 ensures only you can read your vault.' },
  { Icon: ZapIcon,     title: 'One-Click Autofill',        desc: 'Browser extension detects login fields and fills them instantly on every site you visit.' },
  { Icon: KeyIcon,     title: 'Password Generator',        desc: 'Create unbreakable passwords up to 128 characters with custom rules and symbols.' },
  { Icon: BellIcon,    title: 'Breach Monitoring',         desc: 'We scan dark web databases 24/7 and alert you the moment your credentials are exposed.' },
  { Icon: ShareIcon,   title: 'Secure Sharing',            desc: 'Share credentials with family or teammates via end-to-end encrypted links.' },
  { Icon: MonitorIcon, title: 'Cross-Platform Sync',       desc: 'Access your vault on any device — desktop, mobile, browser — always in sync.' },
];

function UserPlusIconInline({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

const STEPS = [
  { num: '01', Icon: UserPlusIconInline, title: 'Create Your Account',    desc: 'Sign up with your email and set one strong master password. That is the only one you ever need to remember.' },
  { num: '02', Icon: KeyIcon,            title: 'Add Your Passwords',     desc: 'Manually add credentials for any site. Use the built-in generator to create strong unique passwords instantly.' },
  { num: '03', Icon: ShieldIcon,         title: 'Access Anywhere Safely', desc: 'Log in to Lockify from any device and access your entire vault — encrypted, private, and always available.' },
];

export default function Home() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.28;
        this.vy = (Math.random() - 0.5) * 0.28;
        this.r  = Math.random() * 1.4 + 0.4;
        this.a  = Math.random() * 0.35 + 0.05;
        this.c  = Math.random() > 0.5 ? '94,129,244' : '34,211,238';
      }
      step() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.c},${this.a})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 75; i++) particles.push(new P());

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(94,129,244,${0.055 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        particles[i].step();
        particles[i].draw();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io  = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="home">
      <canvas ref={canvasRef} className="home-canvas" />
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-centered">

          {/* Animated lock icon */}
          <div className="hero-lock-wrap">
            <div className="hero-lock-ring hero-lock-ring-1" />
            <div className="hero-lock-ring hero-lock-ring-2" />
            <div className="hero-lock-ring hero-lock-ring-3" />
            <div className="hero-lock-icon">
              <LockClosedIcon size={38} />
            </div>
          </div>

          <h1 className="hero-title hero-title-center">
            The Last Password<br />
            You'll Ever{' '}
            <span className="hero-title-accent">Need to Remember.</span>
          </h1>

          <p className="hero-sub hero-sub-center">
            One master password is all you need. Lockify remembers everything else — securely, privately, and only for you.
          </p>

          <div className="hero-btns hero-btns-center">
            <Link to="/register" className="btn-primary">
              <LockClosedIcon size={16} />
              Start for Free
            </Link>
            <a href="#how" className="btn-ghost">
              <ArrowRightIcon size={16} />
              How It Works
            </a>
          </div>

          <div className="hero-trust hero-trust-center">
            <span><CheckIcon size={13} className="check-icon" /> No credit card</span>
            <span className="trust-sep" />
            <span><CheckIcon size={13} className="check-icon" /> AES-256</span>
            <span className="trust-sep" />
            <span><CheckIcon size={13} className="check-icon" /> Zero-knowledge</span>
            <span className="trust-sep" />
            <span><CheckIcon size={13} className="check-icon" /> Free forever plan</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features" id="features">
        <div className="section-wrap">
          <div className="section-head reveal">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Everything you need,<br />nothing you don't.</h2>
            <p className="section-desc">Built for people who refuse to compromise on security.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`feat-card reveal reveal-d${i % 3}`}>
                <div className="feat-icon-wrap">
                  <f.Icon size={20} />
                </div>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <div className="section-wrap">
          <div className="section-head reveal">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">Up and running<br />in 60 seconds.</h2>
            <p className="section-desc">No technical knowledge needed. One password. That's it.</p>
          </div>
          <div className="how-steps">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`how-step reveal reveal-d${i}`}>
                <div className="how-step-num">{s.num}</div>
                <div className="how-step-icon-wrap">
                  <s.Icon size={24} />
                </div>
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-box reveal">
          <div className="cta-glow-line" />
          <div className="cta-lock-icon">
            <LockClosedIcon size={36} />
          </div>
          <h2 className="cta-title">
            Your digital life,<br />
            <span className="cta-title-accent">locked down.</span>
          </h2>
          <p className="cta-desc">
           Your passwords, encrypted and protected. Sign up in seconds and never forget a password again.
          </p>
          <div className="cta-btns">
            <Link to="/register" className="btn-primary">
              <LockClosedIcon size={16} />
              Create Free Account
            </Link>
            <Link to="/login" className="btn-ghost">
              Sign In
              <ArrowRightIcon size={16} />
            </Link>
          </div>
          <p className="cta-note">Free plan forever · No credit card · Setup in 60 seconds</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}