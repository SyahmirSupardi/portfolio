import { FiArrowUpRight, FiGithub } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <div className="footer-signoff">
          <a className="footer-brand" href="#about">Syahmir Supardi<span>·</span></a>
          <p>Making data make sense.</p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/SyahmirSupardi" target="_blank" rel="noreferrer">
            <FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
          <span>© {new Date().getFullYear()} Syahmir Supardi</span>
        </div>
        <span className="footer-edition">END / 01</span>
      </div>
    </footer>
  )
}

export default Footer
