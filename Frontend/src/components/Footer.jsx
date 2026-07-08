import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top" style={{ gridTemplateColumns: '2fr 1fr', gap: 48 }}>

          <div>
            <Link to="/" className="navbar-logo" style={{ display: 'inline-flex' }}>
              <div className="navbar-logo-icon">🔒</div>
              <span className="navbar-logo-name">Lockify</span>
            </Link>
            <p className="footer-brand-desc">
              Zero-knowledge password manager. Your passwords are encrypted and only accessible by you.
            </p>
          </div>

          <div>
            <span className="footer-col-title">Navigate</span>
            <div className="footer-col-links">
              <a href="#features">Features</a>
              <a href="#how">How It Works</a>
              <Link to="/register">Get Started</Link>
              <Link to="/login">Sign In</Link>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Lockify. All rights reserved.</span>
          <span className="footer-copy">AES-256 Encrypted · Zero-Knowledge · Private by Design</span>
        </div>
      </div>
    </footer>
  );
}