const LOGO_SRC = '/assets/logos/Fulcrum - Lockup - White.svg';

export default function Nav({ activePage, onNavigate }) {
  return (
    <nav>
      <span className="nav-logo" onClick={() => onNavigate('home')}>
        <img src={LOGO_SRC} alt="Fulcrum Venture Studio" />
      </span>
      <ul className="nav-links">
        <li>
          <a
            className={activePage === 'about' ? 'active' : ''}
            onClick={() => onNavigate('about')}
          >
            About
          </a>
        </li>
        <li>
          <a
            className={activePage === 'team' ? 'active' : ''}
            onClick={() => onNavigate('team')}
          >
            Team
          </a>
        </li>
        <li>
          <a
            className={activePage === 'investors' ? 'active' : ''}
            onClick={() => onNavigate('investors')}
          >
            Investors
          </a>
        </li>
      </ul>
      <button className="nav-cta" onClick={() => onNavigate('apply')}>
        Apply to build with us
      </button>
    </nav>
  );
}
