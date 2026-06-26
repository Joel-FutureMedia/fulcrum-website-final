const LOGO_SRC = '/assets/logos/Fulcrum - Lockup - White.svg';

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <img src={LOGO_SRC} alt="Fulcrum Venture Studio" />
        <p>Venture Studio, Windhoek, Namibia</p>
      </div>
      <div className="footer-right">
        <p>
          &copy; 2026 Fulcrum Venture Studio.
          <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
