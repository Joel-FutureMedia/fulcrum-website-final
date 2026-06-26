import Footer from '../Footer';

export default function AboutPage({ isActive }) {
  return (
    <div id="page-about" className={`page${isActive ? ' active' : ''}`}>
      <div className="page-hero">
        <span className="eyebrow">About</span>
        <h1>Built to connect entrepreneurs and capital.</h1>
      </div>
      <div className="about-section">
        <p>
          Fulcrum Venture Studio is built around a single conviction: that the infrastructure
          connecting serious entrepreneurs to serious capital is the piece most ecosystems get
          wrong. Capital waits for signal. Founders build without the systems that produce it.
          The gap between them is not a funding problem. It is a structural one.
        </p>
        <p>
          Fulcrum is built to close it. We co-found ventures, contribute operational structure
          from the earliest stage, and bring distribution capability that most early-stage
          businesses never access.
        </p>
      </div>
      <div className="about-section">
        <h2>Distribution is part of the model.</h2>
        <p>
          Fulcrum is built in partnership with Future Media, one of Namibia&apos;s largest radio
          and television operators. That relationship is foundational. The ability to build a
          brand — to make it familiar and trusted in the daily lives of consumers — is one of
          the scarcest resources in early-stage company building.
        </p>
        <p>
          We hold a core belief that mass media, deployed with discipline, is one of the most
          powerful tools available for brand creation in Namibia. Not as a legacy channel. As a
          present-day structural advantage that most new ventures cannot access on their own.
          Fulcrum&apos;s ventures can.
        </p>
      </div>
      <div className="about-section" style={{ borderBottom: 'none' }}>
        <h2>Why Namibia.</h2>
        <p>
          Namibia is a small market. That is the point. Ideas can be tested quickly, real signal
          gathered cheaply, and businesses built without the capital burn of a large market
          launch. Companies that survive here are not small companies. They are resilient ones,
          built to scale.
        </p>
      </div>
      <Footer />
    </div>
  );
}
