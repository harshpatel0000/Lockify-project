import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  LockClosedIcon, KeyIcon, PlusIcon, GridIcon, SettingsIcon, LogOutIcon,
  UserIcon, MailIcon, ShieldIcon, EyeIcon, EyeOffIcon,
  CheckCircleIcon, AlertCircleIcon, AlertTriangleIcon,
  SunIcon, MoonIcon, SmartphoneIcon, PaletteIcon,
  DatabaseIcon, TrashIcon, SaveIcon,
  ChevronRightIcon, RefreshIcon, ZapIcon,
} from '../components/Icons';

/* ── SIDEBAR ── */
function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="db-sidebar">
      <div className="db-sidebar-top">
        <Link to="/" className="db-logo">
          <div className="db-logo-icon"><LockClosedIcon size={16} /></div>
          <span className="db-logo-name">Lockify</span>
        </Link>
        <nav className="db-nav">
          <Link to="/dashboard"    className="db-nav-item"><GridIcon     size={17} /> Dashboard</Link>
          <Link to="/add-password" className="db-nav-item"><PlusIcon     size={17} /> Add Password</Link>
          <Link to="/passwords"    className="db-nav-item"><KeyIcon      size={17} /> All Passwords</Link>
          <Link to="/settings"     className="db-nav-item db-nav-active"><SettingsIcon size={17} /> Settings</Link>
        </nav>
      </div>
      <div className="db-sidebar-bottom">
        <div className="db-user">
          <div className="db-avatar">{(JSON.parse(localStorage.getItem('lockify-user')||'{}').name||'U').slice(0,2).toUpperCase()}</div>
          <div className="db-user-info">
            <span className="db-user-name">{JSON.parse(localStorage.getItem('lockify-user')||'{}').name||'User'}</span>
            <span className="db-user-email">{JSON.parse(localStorage.getItem('lockify-user')||'{}').email||''}</span>
          </div>
        </div>
        <button className="db-logout-btn" onClick={() => { localStorage.removeItem('lockify-token'); localStorage.removeItem('lockify-user'); localStorage.removeItem('lockify-userId'); navigate('/'); }} title="Sign out">
          <LogOutIcon size={16} />
        </button>
      </div>
    </aside>
  );
}

/* ── TOGGLE SWITCH ── */
function Toggle({ checked, onChange }) {
  return (
    <button
      className={`st-toggle ${checked ? 'st-toggle-on' : ''}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className="st-toggle-knob" />
    </button>
  );
}

/* ── SECTION WRAPPER ── */
function Section({ icon: Icon, title, children }) {
  return (
    <div className="st-section">
      <div className="st-section-head">
        <div className="st-section-icon"><Icon size={16} /></div>
        <h2 className="st-section-title">{title}</h2>
      </div>
      <div className="st-section-body">{children}</div>
    </div>
  );
}

/* ── SETTING ROW ── */
function SettingRow({ label, sub, children, danger }) {
  return (
    <div className={`st-row ${danger ? 'st-row-danger' : ''}`}>
      <div className="st-row-info">
        <span className="st-row-label">{label}</span>
        {sub && <span className="st-row-sub">{sub}</span>}
      </div>
      <div className="st-row-control">{children}</div>
    </div>
  );
}

/* ── DELETE ACCOUNT MODAL ── */
function DeleteAccountModal({ onConfirm, onCancel }) {
  const [confirm, setConfirm] = useState('');
  const ready = confirm === 'DELETE';
  return (
    <div className="vp-modal-overlay" onClick={onCancel}>
      <div className="vp-modal" onClick={e => e.stopPropagation()}>
        <div className="vp-modal-glow" />
        <div className="vp-modal-icon" style={{ background: 'rgba(248,113,113,0.1)', borderColor: 'rgba(248,113,113,0.25)', color: 'var(--c-danger)' }}>
          <TrashIcon size={24} />
        </div>
        <h3 className="vp-modal-title">Delete Account?</h3>
        <p className="vp-modal-sub">
          This will permanently delete your account and all saved passwords. This action <strong>cannot be undone</strong>.
        </p>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label" style={{ textAlign: 'left' }}>Type <strong style={{ color: 'var(--c-danger)' }}>DELETE</strong> to confirm</label>
          <input
            className={`form-input ${confirm && !ready ? 'input-error' : ''}`}
            type="text"
            placeholder="DELETE"
            value={confirm}
            onChange={e => setConfirm(e.target.value.toUpperCase())}
            autoFocus
          />
        </div>
        <div className="vp-modal-actions">
          <button className="btn-ghost" onClick={onCancel}>Cancel</button>
          <button
            className="vp-modal-confirm"
            onClick={ready ? onConfirm : undefined}
            disabled={!ready}
            style={{ opacity: ready ? 1 : 0.45, cursor: ready ? 'pointer' : 'not-allowed' }}
          >
            <TrashIcon size={14} /> Delete Forever
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN ── */
export default function Settings() {
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();


const token = localStorage.getItem('lockify-token');
  const storedUser = JSON.parse(localStorage.getItem('lockify-user') || '{}');

  /* Profile */
  const [profile, setProfile] = useState({ name: storedUser.name || '', email: storedUser.email || '' });
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  /* Password change */
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, newPass: false, confirm: false });
  const [pwErrors, setPwErrors] = useState({});
  const [pwSaved, setPwSaved] = useState(false);

  /* Security */
  const [twoFactor,   setTwoFactor]   = useState(true);
  const [sessionLock, setSessionLock] = useState(true);
  const [lockTimeout, setLockTimeout] = useState('15');
  const [breachAlert, setBreachAlert] = useState(true);

  /* Notifications */
  const [emailNotif,  setEmailNotif]  = useState(true);
  const [weakAlert,   setWeakAlert]   = useState(true);
  const [loginAlert,  setLoginAlert]  = useState(true);

  /* Appearance */
  const [accentColor, setAccentColor] = useState(
    () => getComputedStyle(document.documentElement).getPropertyValue('--c-primary').trim() || '#5e81f4'
  );

  function handleAccentChange(color) {
    setAccentColor(color);
    document.documentElement.style.setProperty('--c-primary', color);
    // Adjust light version
    document.documentElement.style.setProperty('--c-primary-lt', color + '1a');
    localStorage.setItem('lockify-accent', color);
  }
  const [compactMode,  setCompactMode] = useState(false);

  /* Vault */
  const [autoFill,     setAutoFill]    = useState(true);
  const [autoSave,     setAutoSave]    = useState(true);
  const [showStrength, setShowStrength]= useState(true);
  const [defaultCat,   setDefaultCat]  = useState('Personal');

  /* Danger zone */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal,  setShowClearModal]  = useState(false);

  /* Active section tab */
  const TABS = [
    { id: 'profile',      label: 'Profile',      Icon: UserIcon     },
    { id: 'security',     label: 'Security',     Icon: ShieldIcon   },
    { id: 'appearance',   label: 'Appearance',   Icon: PaletteIcon  },
    { id: 'vault',        label: 'Vault',        Icon: DatabaseIcon },
    { id: 'danger',       label: 'Danger Zone',  Icon: AlertTriangleIcon },
  ];
  const [activeTab, setActiveTab] = useState('profile');

  /* ── Handlers ── */
  async function saveProfile(e) {
    e.preventDefault();
    setProfileError('');
    try {
      const res  = await fetch('/api/auth/update-profile', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ name: profile.name, email: profile.email }),
      });
      const data = await res.json();
      if (!res.ok) { setProfileError(data.error || 'Failed to update profile.'); return; }
      const updated = { ...storedUser, name: profile.name, email: profile.email };
      localStorage.setItem('lockify-user', JSON.stringify(updated));
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    } catch { setProfileError('Could not connect to server.'); }
  }

  async function savePassword(e) {
    e.preventDefault();
    const errs = {};
    if (!passwords.current)                      errs.current = 'Enter current password';
    if (!passwords.newPass)                      errs.newPass = 'Enter new password';
    else if (passwords.newPass.length < 8)       errs.newPass = 'Minimum 8 characters';
    if (passwords.confirm !== passwords.newPass) errs.confirm = 'Passwords do not match';
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      const res  = await fetch('/api/auth/change-password', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.newPass }),
      });
      const data = await res.json();
      if (!res.ok) { setPwErrors({ current: data.error || 'Incorrect current password.' }); return; }
      setPasswords({ current: '', newPass: '', confirm: '' });
      setPwSaved(true);
      setTimeout(() => setPwSaved(false), 2500);
    } catch { setPwErrors({ current: 'Could not connect to server.' }); }
  }

  async function handleDeleteAccount() {
    try {
      await fetch('/api/auth/delete-account', {
        method:  'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    localStorage.removeItem('lockify-token');
    localStorage.removeItem('lockify-user');
    localStorage.removeItem('lockify-userId');
    setShowDeleteModal(false);
    navigate('/');
  }

  async function handleClearVault() {
    try {
      await fetch('/api/vault', {
        method:  'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    setShowClearModal(false);
  }

  const ACCENT_COLORS = ['#5e81f4', '#22d3ee', '#34d399', '#f472b6', '#fb923c', '#a78bfa'];

  return (
    <div className="db-shell">
      <Sidebar />

      <main className="db-main">
        <header className="db-topbar">
          <h1 className="db-page-title" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--c-text1)' }}>
            Settings
          </h1>
        </header>

        <div className="db-content">
          <div className="st-layout">

            {/* ── LEFT NAV ── */}
            <aside className="st-nav">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={`st-nav-item ${activeTab === tab.id ? 'st-nav-active' : ''} ${tab.id === 'danger' ? 'st-nav-danger' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.Icon size={16} />
                  <span>{tab.label}</span>
                  <ChevronRightIcon size={13} className="st-nav-arrow" />
                </button>
              ))}
            </aside>

            {/* ── RIGHT CONTENT ── */}
            <div className="st-content">

              {/* ════════ PROFILE ════════ */}
              {activeTab === 'profile' && (
                <div className="st-panel">
                  <div className="st-panel-head">
                    <h2 className="st-panel-title">Profile Settings</h2>
                    <p className="st-panel-sub">Manage your personal information and account details.</p>
                  </div>

                  {/* Avatar */}
                  <div className="st-avatar-row">
                    <div className="st-avatar-big">{(profile.name||'U').slice(0,2).toUpperCase()}</div>
                    <div>
                      <p className="st-avatar-name">{profile.name}</p>
                      <p className="st-avatar-email">{profile.email}</p>
                    </div>
                  </div>

                  {profileSaved && (
                    <div className="ap-saved-banner">
                      <CheckCircleIcon size={14} /> Profile updated successfully!
                    </div>
                  )}
                  {profileError && (
                    <div className="auth-error-banner" style={{ marginBottom: 16 }}>
                      <AlertCircleIcon size={14} /> {profileError}
                    </div>
                  )}

                  {/* ── Personal Info ── */}
                  <div className="st-profile-card">
                    <div className="st-profile-card-head">
                      <div className="st-profile-card-icon"><UserIcon size={15}/></div>
                      <span className="st-profile-card-title">Personal Information</span>
                    </div>
                    <div className="st-profile-fields">
                      <div className="st-profile-field-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-wrap">
                          <span className="input-icon"><UserIcon size={15} /></span>
                          <input
                            className="form-input input-with-icon"
                            type="text"
                            value={profile.name}
                            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="st-profile-field-group">
                        <label className="form-label">Email Address</label>
                        <div className="input-wrap">
                          <span className="input-icon"><MailIcon size={15} /></span>
                          <input
                            className="form-input input-with-icon"
                            type="email"
                            value={profile.email}
                            onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="st-profile-card-footer">
                      <button className="btn-primary st-save-btn" onClick={saveProfile}>
                        <SaveIcon size={14} /> Save Profile
                      </button>
                    </div>
                  </div>

                  {/* ── Change Master Password ── */}
                  <div className="st-profile-card">
                    <div className="st-profile-card-head">
                      <div className="st-profile-card-icon st-profile-card-icon-lock"><LockClosedIcon size={15}/></div>
                      <span className="st-profile-card-title">Change Master Password</span>
                    </div>

                    {pwSaved && (
                      <div className="ap-saved-banner" style={{ margin: '0 20px 16px' }}>
                        <CheckCircleIcon size={14} /> Password changed successfully!
                      </div>
                    )}

                    <div className="st-pw-stack">
                      {[
                        { key:'current', label:'Current Password',    ph:'Enter current password' },
                        { key:'newPass', label:'New Master Password',  ph:'Min. 8 characters'      },
                        { key:'confirm', label:'Confirm New Password', ph:'Repeat new password'    },
                      ].map(f => (
                        <div className="st-pw-field" key={f.key}>
                          <label className="form-label">{f.label}</label>
                          <div className="input-wrap">
                            <span className="input-icon"><LockClosedIcon size={15} /></span>
                            <input
                              className={`form-input input-with-icon input-with-eye ${pwErrors[f.key] ? 'input-error' : ''}`}
                              type={showPw[f.key] ? 'text' : 'password'}
                              placeholder={f.ph}
                              value={passwords[f.key]}
                              onChange={e => { setPasswords(p => ({ ...p, [f.key]: e.target.value })); setPwErrors(p => ({ ...p, [f.key]: '' })); }}
                              autoComplete="new-password"
                            />
                            <button type="button" className="input-eye" onClick={() => setShowPw(p => ({ ...p, [f.key]: !p[f.key] }))} tabIndex={-1}>
                              {showPw[f.key] ? <EyeOffIcon size={14}/> : <EyeIcon size={14}/>}
                            </button>
                          </div>
                          {pwErrors[f.key] && <span className="form-err">{pwErrors[f.key]}</span>}
                        </div>
                      ))}
                    </div>

                    <div className="st-profile-card-footer">
                      <button className="btn-primary st-save-btn" onClick={savePassword}>
                        <SaveIcon size={14} /> Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ SECURITY ════════ */}
              {activeTab === 'security' && (
                <div className="st-panel">
                  <div className="st-panel-head">
                    <h2 className="st-panel-title">Security Settings</h2>
                    <p className="st-panel-sub">Control how your vault is protected and accessed.</p>
                  </div>

                  <Section icon={ShieldIcon} title="Two-Factor Authentication">
                    <SettingRow
                      label="Email OTP Verification"
                      sub="Require a one-time code every time you sign in."
                    >
                      <Toggle checked={twoFactor} onChange={setTwoFactor} />
                    </SettingRow>
                    {twoFactor && (
                      <div className="st-2fa-notice">
                        <CheckCircleIcon size={13} />
                        2FA is active. A code is sent to <strong>{storedUser.email || profile.email}</strong> on every login.
                      </div>
                    )}
                  </Section>

                  <Section icon={LockClosedIcon} title="Session & Auto-lock">
                    <SettingRow
                      label="Auto-lock Vault"
                      sub="Automatically lock your vault after inactivity."
                    >
                      <Toggle checked={sessionLock} onChange={setSessionLock} />
                    </SettingRow>
                    {sessionLock && (
                      <SettingRow label="Lock After" sub="Minutes of inactivity before vault locks.">
                        <select
                          className="st-select"
                          value={lockTimeout}
                          onChange={e => setLockTimeout(e.target.value)}
                        >
                          {['5', '10', '15', '30', '60'].map(v => (
                            <option key={v} value={v}>{v} minutes</option>
                          ))}
                        </select>
                      </SettingRow>
                    )}
                  </Section>

                  <Section icon={AlertCircleIcon} title="Breach Monitoring">
                    <SettingRow
                      label="Dark Web Monitoring"
                      sub="Alert me if my credentials appear in known data breaches."
                    >
                      <Toggle checked={breachAlert} onChange={setBreachAlert} />
                    </SettingRow>
                    <div className="st-breach-status">
                      <div className="st-breach-dot" />
                      <span>Last scanned: <strong>2 hours ago</strong> — No breaches found</span>
                      <button className="st-text-btn">
                        <RefreshIcon size={12} /> Scan Now
                      </button>
                    </div>
                  </Section>

                  <Section icon={SmartphoneIcon} title="Active Sessions">
                    {[
                      { device: 'Chrome on macOS',  location: 'Mumbai, IN',    time: 'Now',        current: true  },
                      { device: 'Firefox on Windows',location: 'Delhi, IN',    time: '2 hours ago', current: false },
                      { device: 'Safari on iPhone',  location: 'Ahmedabad, IN',time: '1 day ago',   current: false },
                    ].map(s => (
                      <div key={s.device} className="st-session-row">
                        <div className="st-session-info">
                          <span className="st-session-device">
                            {s.device}
                            {s.current && <span className="st-session-current">Current</span>}
                          </span>
                          <span className="st-session-meta">{s.location} · {s.time}</span>
                        </div>
                        {!s.current && (
                          <button className="st-revoke-btn">Revoke</button>
                        )}
                      </div>
                    ))}
                    <div className="st-signout-all-wrap">
                      <button className="st-signout-all-btn">
                        <LogOutIcon size={14} />
                        Sign out all other sessions
                      </button>
                    </div>
                  </Section>
                </div>
              )}


              {/* ════════ APPEARANCE ════════ */}
              {activeTab === 'appearance' && (
                <div className="st-panel">
                  <div className="st-panel-head">
                    <h2 className="st-panel-title">Appearance</h2>
                    <p className="st-panel-sub">Customise how Lockify looks and feels.</p>
                  </div>

                  <Section icon={SunIcon} title="Theme">
                    <div className="st-theme-row">
                      {[
                        { key: 'dark',   label: 'Dark',   Icon: MoonIcon },
                        { key: 'light',  label: 'Light',  Icon: SunIcon  },
                        { key: 'system', label: 'System', Icon: SmartphoneIcon },
                      ].map(t => (
                        <button
                          key={t.key}
                          className={`st-theme-btn ${theme === t.key ? 'st-theme-active' : ''}`}
                          onClick={() => changeTheme(t.key)}
                        >
                          <t.Icon size={18} />
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </Section>

                  <Section icon={PaletteIcon} title="Accent Color">
                    <div className="st-color-row">
                      {ACCENT_COLORS.map(c => (
                        <button
                          key={c}
                          className={`st-color-dot ${accentColor === c ? 'st-color-active' : ''}`}
                          style={{ background: c }}
                          onClick={() => handleAccentChange(c)}
                          title={c}
                        >
                          {accentColor === c && <CheckCircleIcon size={14} />}
                        </button>
                      ))}
                    </div>
                  </Section>

                  <Section icon={ZapIcon} title="Display">
                    <SettingRow label="Compact Mode" sub="Reduce padding and spacing for a denser layout.">
                      <Toggle checked={compactMode} onChange={setCompactMode} />
                    </SettingRow>
                    <SettingRow label="Show Password Strength Meter" sub="Display strength bars when adding or editing passwords.">
                      <Toggle checked={showStrength} onChange={setShowStrength} />
                    </SettingRow>
                  </Section>
                </div>
              )}

              {/* ════════ VAULT ════════ */}
              {activeTab === 'vault' && (
                <div className="st-panel">
                  <div className="st-panel-head">
                    <h2 className="st-panel-title">Vault Settings</h2>
                    <p className="st-panel-sub">Configure how passwords are saved and autofilled.</p>
                  </div>

                  <Section icon={ZapIcon} title="Autofill & Auto-save">
                    <SettingRow label="Browser Autofill" sub="Automatically fill login fields when visiting saved sites.">
                      <Toggle checked={autoFill} onChange={setAutoFill} />
                    </SettingRow>
                    <SettingRow label="Auto-save New Passwords" sub="Prompt to save new passwords detected in the browser.">
                      <Toggle checked={autoSave} onChange={setAutoSave} />
                    </SettingRow>
                  </Section>

                  <Section icon={DatabaseIcon} title="Vault Preferences">
                    <SettingRow label="Default Category" sub="Pre-select a category when adding a new password.">
                      <select
                        className="st-select"
                        value={defaultCat}
                        onChange={e => setDefaultCat(e.target.value)}
                      >
                        {['Personal','Work','Finance','Development','Shopping','Social','Other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </SettingRow>
                  </Section>
                </div>
              )}

              {/* ════════ DANGER ZONE ════════ */}
              {activeTab === 'danger' && (
                <div className="st-panel">
                  <div className="st-panel-head">
                    <h2 className="st-panel-title">Danger Zone</h2>
                    <p className="st-panel-sub">Irreversible actions. Please proceed with caution.</p>
                  </div>

                  <div className="st-danger-section">
                    <div className="st-danger-row">
                      <div className="st-danger-info">
                        <span className="st-danger-label">
                          <TrashIcon size={15} /> Clear Vault
                        </span>
                        <span className="st-danger-sub">
                          Permanently delete all saved passwords from your vault. Your account will remain active.
                        </span>
                      </div>
                      <button
                        className="st-danger-btn"
                        onClick={() => setShowClearModal(true)}
                      >
                        Clear Vault
                      </button>
                    </div>

                    <div className="st-danger-row">
                      <div className="st-danger-info">
                        <span className="st-danger-label">
                          <LogOutIcon size={15} /> Delete Account
                        </span>
                        <span className="st-danger-sub">
                          Permanently delete your Lockify account and all associated data. This cannot be undone.
                        </span>
                      </div>
                      <button
                        className="st-danger-btn st-danger-btn-red"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Delete account modal */}
      {showDeleteModal && (
        <DeleteAccountModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Clear vault modal */}
      {showClearModal && (
        <div className="vp-modal-overlay" onClick={() => setShowClearModal(false)}>
          <div className="vp-modal" onClick={e => e.stopPropagation()}>
            <div className="vp-modal-glow" />
            <div className="vp-modal-icon">
              <TrashIcon size={24} />
            </div>
            <h3 className="vp-modal-title">Clear Entire Vault?</h3>
            <p className="vp-modal-sub">
              All <strong>48 saved passwords</strong> will be permanently deleted. Your account stays active.
            </p>
            <div className="vp-modal-actions">
              <button className="btn-ghost" onClick={() => setShowClearModal(false)}>Cancel</button>
              <button className="vp-modal-confirm" onClick={handleClearVault}>
                <TrashIcon size={14} /> Clear Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}