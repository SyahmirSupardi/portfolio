import { FiArrowUpRight } from 'react-icons/fi'

const Nav = () => {
  return (
    <div className="nav-frame">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="nav-brand" href="#about">
          <span className="nav-monogram" aria-hidden="true">SS</span>
          <span>Syahmir Supardi <small>DATA PORTFOLIO</small></span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#portfolio">Projects</a>
          <a href="#toolkit">Skills</a>
        </div>

        <a className="nav-contact" href="#contact">
          Contact <FiArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </div>
  )
}

export default Nav
