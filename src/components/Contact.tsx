import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const emailAddress = 'krisvasoya.dev@gmail.com';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/krisvasoya',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/krisvasoya',
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/krisvasoya',
    },
    {
      label: 'Resume',
      href: 'https://github.com/krisvasoya',
    },
  ];

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert('Please fill out all fields before transmitting.');
      return;
    }

    setIsSending(true);

    const mailtoSubject = `[TRANSMISSION] ${subject} from ${name}`;
    const mailtoBody = `Sender Name: ${name}\nSender Email: ${email}\n\nMessage Payload:\n${message}\n\n---\nTransmitted via Digital Transmission Interface.`;
    const mailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    // Fake transmission latency delay
    setTimeout(() => {
      window.location.href = mailLink;
      setIsSending(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <section id="contact" style={{ padding: '6rem 0 4rem', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .contact-grid {
          display: flex;
          gap: 2rem;
          width: 100%;
          margin-bottom: 2rem;
        }

        .transmission-strip {
          display: flex;
          border: 1px solid rgba(28, 25, 23, 0.10);
          border-radius: 8px;
          background: rgba(28, 25, 23, 0.02);
          margin-bottom: 2rem;
          width: 100%;
        }

        .transmission-strip-col {
          flex: 1;
          padding: 1.2rem;
          text-align: center;
        }

        .transmission-strip-col:not(:last-child) {
          border-right: 1px solid rgba(28, 25, 23, 0.10);
        }

        .terminal-field-input {
          background-color: #1c1917;
          color: #ffffff;
          border: 1px solid rgba(28, 25, 23, 0.15);
          border-radius: 6px;
          padding: 0.75rem 1rem;
          font-family: var(--font-body);
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }

        .terminal-field-input:focus {
          border-color: var(--color-accent-1);
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .contact-grid {
            flex-direction: column;
          }
          .transmission-strip {
            flex-direction: column;
          }
          .transmission-strip-col:not(:last-child) {
            border-right: none;
            border-bottom: 1px solid rgba(28, 25, 23, 0.10);
          }
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header eyebrow tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(28, 25, 23, 0.08)', paddingBottom: '0.6rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-accent-1)', letterSpacing: '0.08em', fontWeight: 600 }}>
            // TRANSMISSION
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            03 — CONTACT
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="contact-grid">
          {/* Left: Dark Info Card */}
          <div style={{
            flex: '1 1 340px',
            backgroundColor: '#1c1917',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '400px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.8rem',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: '1.1',
                margin: 0,
                letterSpacing: '-0.02em',
                animation: 'none'
              }}>
                LET'S
                <br />
                BUILD
                <br />
                SOMETHING
                <br />
                REAL.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0
              }}>
                Open to full-time roles, freelance collaborations, and ambitious side projects.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
              {/* terminal email readout */}
              <a href={`mailto:${emailAddress}`} className="interactive" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: 'var(--color-accent-1)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                &gt; krisvasoya.dev@gmail.com
              </a>

              {/* Social links row */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.5)',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Inline Form card */}
          <div style={{
            flex: '1.2 1 400px',
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.01)'
          }}>
            <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* Name & Email inputs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="terminal-field-input interactive"
                  />
                </div>
                <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="terminal-field-input interactive"
                  />
                </div>
              </div>

              {/* Subject */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  required
                  placeholder="Let's build a dashboard together"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="terminal-field-input interactive"
                />
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  MESSAGE
                </label>
                <textarea
                  required
                  placeholder="Tell me about your project, timeline, and what you're looking to build..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="terminal-field-input interactive"
                  style={{ height: '100px', resize: 'none' }}
                />
              </div>

              {/* Send trigger */}
              <button
                type="submit"
                disabled={isSending}
                className="interactive"
                style={{
                  background: 'none',
                  border: '1px solid rgba(28, 25, 23, 0.12)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  marginTop: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                  e.currentTarget.style.color = 'var(--bg-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <span>{isSending ? 'TRANSMITTING LINK...' : 'SEND TRANSMISSION'}</span>
                {isSending && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid var(--color-accent-1)',
                    borderTopColor: 'transparent',
                    animation: 'spin 1s infinite linear'
                  }} />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Transmission footer strip */}
        <div className="transmission-strip">
          <div className="transmission-strip-col">
            <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>24H</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginTop: '0.2rem' }}>RESPONSE TIME</span>
          </div>
          <div className="transmission-strip-col">
            <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>GMT+5:30</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginTop: '0.2rem' }}>TIMEZONE</span>
          </div>
          <div className="transmission-strip-col">
            <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>IND</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginTop: '0.2rem' }}>LOCATION</span>
          </div>
          <div className="transmission-strip-col">
            <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>EN</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginTop: '0.2rem' }}>LANGUAGE</span>
          </div>
        </div>

        {/* Informative tips widget */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          backgroundColor: 'rgba(16, 185, 129, 0.06)',
          border: '1px solid rgba(16, 185, 129, 0.12)',
          borderRadius: '8px',
          padding: '1rem 1.2rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          lineHeight: '1.5',
          color: 'var(--text-secondary)'
        }}>
          <span style={{ color: 'var(--color-accent-1)', fontWeight: 'bold', fontSize: '1rem' }}>ⓘ</span>
          <p style={{ margin: 0 }}>
            <strong>Improve tip:</strong> The transmission strip below the form gives context (timezone, response time) without bloating the layout — replaces the "empty contact page" feeling with useful signal.
          </p>
        </div>
      </div>
    </section>
  );
};
