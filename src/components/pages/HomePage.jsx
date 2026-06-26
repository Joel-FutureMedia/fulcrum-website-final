import HeroCanvas from '../HeroCanvas';
import Footer from '../Footer';

export default function HomePage({ isActive, onNavigate }) {
  function scrollToProblem() {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div id="page-home" className={`page${isActive ? ' active' : ''}`}>
      <section id="hero">
        <HeroCanvas />
        <div className="hero-content">
          <h1 className="hero-headline reveal">
            Closing the gap between your good idea and a real business.
          </h1>
          <p className="hero-subhead reveal">
            Fulcrum co-founds ventures alongside serious entrepreneurs. We bring the
            infrastructure, distribution, and capital network to make it real.
          </p>
          <button className="scroll-cta reveal" onClick={scrollToProblem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v12M1 7l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            See how we work
          </button>
        </div>
      </section>

      <section id="problem" className="section">
        <div className="inner">
          <p className="reveal">
            The gap between a serious entrepreneur and the capital to back them is not a
            funding problem. It is an infrastructure problem. Capital exists. Talent exists.
            The system that reliably connects them does not.
          </p>
          <p className="reveal">
            Fulcrum is built to be that system. We co-found ventures and bring what they
            need from the start: distribution, operational structure, and the process and
            discipline that make a business worth evaluating.
          </p>
        </div>
      </section>

      <section className="section section-bordered">
        <span className="eyebrow reveal">What we do</span>
        <p className="what-statement reveal">We do not invest in startups. We help build them.</p>
        <div className="what-grid">
          <div>
            <p className="reveal">
              We co-found companies alongside entrepreneurs. We contribute capital,
              infrastructure, and embedded distribution from the earliest stage.
            </p>
            <p className="reveal">
              We are not an accelerator. We do not run programmes, award grants, or provide
              mentorship. We build operating businesses and hold equity in them.
            </p>
          </div>
          <div>
            <p className="reveal">
              Fulcrum takes an active, operational role in each venture it builds. That means
              validating the idea before committing capital, building the company infrastructure
              before launch, and driving customer acquisition through access to media inventory
              and distribution channels.
            </p>
            <p className="reveal">
              We operate in Namibia. A market small enough to test quickly and demanding enough
              that the businesses we build have real resilience. What works here is built to
              scale beyond our borders.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-bordered">
        <span className="eyebrow reveal">Who we work with</span>
        <div className="inner">
          <p className="reveal">
            We work with entrepreneurs who are serious about building a real business.
            Founders who have an idea with genuine commercial potential and the disposition
            to execute on it rigorously.
          </p>
          <p className="reveal">
            If you have domain knowledge, a specific market problem, and the capacity to commit
            to building, Fulcrum provides the system, the infrastructure, and the distribution.
          </p>
          <p className="who-standout reveal">We co-found. We do not advise from the side.</p>
        </div>
      </section>

      <section id="contact-section" className="section section-bordered">
        <span className="eyebrow reveal">Apply to build with us</span>
        <div className="contact-inner">
          <p className="lead reveal">You may hesitate before describing what you are working on. You should not.</p>
          <p className="reveal">
            Ideas are not the scarce resource. Serious entrepreneurs discuss their ideas with
            customers, suppliers, and partners every day — because that is the only way to find
            out whether they are real. The challenge is not finding a problem to solve. It is
            building an organisation capable of solving it.
          </p>
          <p className="reveal">
            We are not here to collect ideas. We are looking for people who can execute on them.
            What you share here will not be built by us without you. That is not our model, and
            it is not what we are selecting for.
          </p>
          <button className="apply-btn reveal" onClick={() => onNavigate('apply')}>
            Apply to build with us
          </button>
          <span className="contact-note reveal">
            We review every submission. We respond to the ones where there is a fit.
          </span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
