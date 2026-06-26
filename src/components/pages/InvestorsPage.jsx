import Footer from '../Footer';

export default function InvestorsPage({ isActive, onNavigate }) {
  return (
    <div id="page-investors" className={`page${isActive ? ' active' : ''}`}>
      <div className="investors-hero">
        <span className="eyebrow">Investors</span>
        <h1>Investors</h1>
        <p>
          Fulcrum maintains a network of Preferred Partners — capital partners, strategic
          advisors, and individuals who help surface the right entrepreneurs. They follow
          Fulcrum&apos;s progress, engage with the ventures we build, and are positioned to act
          when the right opportunity presents itself.
        </p>
        <p>
          There is no capital commitment required to join. What it requires is a direct
          conversation with our team and a genuine interest in what we are building.
        </p>
      </div>
      <div className="investors-section">
        <h2>Why the portal exists.</h2>
        <p>
          Private investment is difficult partly because information is scarce and relationships
          are thin. Partners who follow Fulcrum&apos;s progress over time develop an understanding
          of our process, our discipline, and the quality of the ventures we build. They see the
          validation data, the decisions, and the operating results.
        </p>
        <p>
          By the time a venture needs external capital, they are not evaluating a cold pitch.
          They are deciding whether to back a business they already know.
        </p>
        <p>
          The principle is one that public markets have understood for a long time: transparency
          reduces the friction of investment. We are applying that logic to early-stage venture
          building.
        </p>
      </div>
      <div className="investors-section">
        <h2>Who we are looking for.</h2>
        <p>
          Capital partners considering early-stage Namibian ventures. Strategic advisors who can
          add value to specific sectors. Individuals with networks that surface the right
          entrepreneurs. All are welcome. What they share is a willingness to build a relationship
          with Fulcrum before being asked to commit to anything.
        </p>
      </div>
      <div className="investors-cta">
        <h2>Becoming a Preferred Partner.</h2>
        <p>
          The first step is a one-on-one conversation with our team. If there is a fit, we extend
          an invitation to the portal.
        </p>
        <button className="apply-btn" onClick={() => onNavigate('apply')}>
          Request a conversation
        </button>
      </div>
      <Footer />
    </div>
  );
}
