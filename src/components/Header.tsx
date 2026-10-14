import { FiArrowDownRight, FiArrowUpRight, FiGithub, FiMail } from 'react-icons/fi'

const Header = () => {
  return (
    <section id="about" className="hero section-wrap" aria-labelledby="hero-title">
      <div className="poster-heading">
        <p className="poster-kicker"><span>PERSONAL FILE</span><span>NO. 01 — DATA &amp; INSIGHT</span></p>
        <h1 id="hero-title">DATA <span>PORTFOLIO</span></h1>
        <p className="poster-subtitle">ANALYSIS · REPORTING · BUSINESS INTELLIGENCE</p>
      </div>

      <div className="hero-board">
        <aside className="portfolio-ticket" aria-label="SQL, dashboards, and business analysis">
          <span className="ticket-serial">NO. 01 / DATA</span>
          <span className="ticket-main">DATA / ANALYSIS / REPORTING</span>
          <span className="ticket-barcode" aria-hidden="true" />
          <span className="ticket-footer">FIELD NOTES · 01</span>
        </aside>

        <div className="identity-card">
          <span className="paper-tape tape-top" aria-hidden="true" />
          <figure className="portrait-frame">
            <img
              src="/projects/syahmir-portrait.webp"
              alt="Syahmir Supardi"
              width="1052"
              height="1500"
              fetchPriority="high"
            />
            <figcaption>PORTRAIT / 01</figcaption>
          </figure>

          <div className="identity-details">
            <div className="identity-topline">
              <span className="identity-label">PERSONAL DATA</span>
              <span className="open-stamp"><i /> OPEN TO WORK</span>
            </div>
            <h2>Syahmir<br />Supardi</h2>
            <p className="identity-role">JUNIOR DATA ANALYST<br />ASPIRING BUSINESS ANALYST</p>
            <p className="identity-intro">
              I turn raw data into clear analysis, useful dashboards, and better questions for the people making decisions.
            </p>

            <div className="identity-facts">
              <div><span>FOCUS</span><strong>Data analysis<br />Business intelligence</strong></div>
              <div><span>TOOLS</span><strong>SQL · Excel<br />Power BI · Python</strong></div>
            </div>

            <div className="identity-links">
              <a href="mailto:syahmirsupardi@gmail.com">EMAIL <FiArrowUpRight aria-hidden="true" /></a>
              <a href="https://github.com/SyahmirSupardi" target="_blank" rel="noreferrer">GITHUB <FiGithub aria-hidden="true" /></a>
              <a href="mailto:syahmirsupardi@gmail.com?subject=CV%20request">REQUEST CV <FiMail aria-hidden="true" /></a>
            </div>
            <span className="identity-barcode" aria-hidden="true" />
          </div>

          <span className="paper-tape tape-side" aria-hidden="true" />
          <span className="hero-stamp" aria-hidden="true">DATA<br />WITH<br />INTENT</span>
        </div>
      </div>

      <a className="scroll-note" href="#toolkit"><FiArrowDownRight aria-hidden="true" /> SCROLL TO EXPLORE</a>
    </section>
  )
}

export default Header
