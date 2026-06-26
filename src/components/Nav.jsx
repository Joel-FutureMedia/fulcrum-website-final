import { useState, useEffect, useCallback } from 'react';

const LOGO_SRC = '/assets/logos/Fulcrum - Lockup - White.svg';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'team', label: 'Team' },
  { id: 'investors', label: 'Investors' },
];

export default function Nav({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navigate = useCallback(
    (id) => {
      onNavigate(id);
      closeMenu();
    },
    [onNavigate, closeMenu]
  );

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') closeMenu();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [activePage, closeMenu]);

  return (
    <nav className={menuOpen ? 'nav-open' : ''}>
      <span className="nav-logo" onClick={() => navigate('home')} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate('home')}>
        <img src={LOGO_SRC} alt="Fulcrum Venture Studio" />
      </span>

      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      <div
        id="nav-menu"
        className={`nav-panel${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-links">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                className={activePage === id ? 'active' : ''}
                onClick={() => navigate(id)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(id)}
                role="button"
                tabIndex={0}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" className="nav-cta nav-cta-mobile" onClick={() => navigate('apply')}>
          Apply to build with us
        </button>
      </div>

      <button type="button" className="nav-cta nav-cta-desktop" onClick={() => navigate('apply')}>
        Apply to build with us
      </button>
    </nav>
  );
}
