import { FiArrowUpRight, FiDownload, FiGithub } from 'react-icons/fi'

type Project = {
  number: string
  title: string
  category: string
  description: string
  image: string
  alt: string
  tools: string[]
  href: string
  action: 'Download project' | 'View on GitHub'
}

const projects: Project[] = [
  {
    number: '01',
    title: 'COVID-19 SQL analysis',
    category: 'Data analysis',
    description: 'A SQL exploration of COVID-19 data, with the queries available to download.',
    image: '/projects/covid-19.jpg',
    alt: 'COVID-19 project cover image',
    tools: ['SQL', 'PostgreSQL'],
    href: '/downloads/Covid SQL Project.sql',
    action: 'Download project',
  },
  {
    number: '02',
    title: 'Bike sales report',
    category: 'Reporting',
    description: 'An Excel reporting project with an automated bike sales dashboard.',
    image: '/projects/2022-09-29-image-2.png',
    alt: 'Excel project cover image',
    tools: ['Excel', 'VBA'],
    href: '/downloads/Excel Full Project.xlsx',
    action: 'Download project',
  },
  {
    number: '03',
    title: 'Power BI dashboard',
    category: 'Business intelligence',
    description: 'An interactive business analytics dashboard built in Power BI.',
    image: '/projects/461.png',
    alt: 'Power BI dashboard project cover image',
    tools: ['Power BI', 'DAX'],
    href: '/downloads/Power BI Portfolio.pbix',
    action: 'Download project',
  },
  {
    number: '04',
    title: 'Project collection',
    category: 'Code & analysis',
    description: 'A collection of project work and experiments hosted on GitHub.',
    image: '/projects/1703525023946.jpg',
    alt: 'GitHub project cover image',
    tools: ['Python', 'Pandas'],
    href: 'https://github.com/SyahmirSupardi/Syhm_Portfolio_Project',
    action: 'View on GitHub',
  },
]

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-wrap work-section" aria-labelledby="work-title">
      <div className="section-label-row">
        <span>02 / PROJECT ARCHIVE</span>
        <span>SELECTED WORK SAMPLES</span>
      </div>

      <div className="work-heading">
        <h2 id="work-title">Work <span>samples</span></h2>
        <p>Analysis, reports, and dashboards built to make information easier to use.</p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <span className="paper-tape project-tape" aria-hidden="true" />
            <a
              className="project-image-link"
              href={project.href}
              download={project.action === 'Download project' ? true : undefined}
              target={project.action === 'View on GitHub' ? '_blank' : undefined}
              rel={project.action === 'View on GitHub' ? 'noreferrer' : undefined}
              aria-label={`${project.action}: ${project.title}`}
            >
              <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
              <span className="project-number">{project.number}</span>
              <span className="project-image-arrow" aria-hidden="true"><FiArrowUpRight /></span>
            </a>
            <div className="project-content">
              <div className="project-meta">
                <span>{project.category}</span>
                <span>{project.tools.join(' · ')}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a
                className="project-action"
                href={project.href}
                download={project.action === 'Download project' ? true : undefined}
                target={project.action === 'View on GitHub' ? '_blank' : undefined}
                rel={project.action === 'View on GitHub' ? 'noreferrer' : undefined}
              >
                {project.action === 'Download project' ? <FiDownload aria-hidden="true" /> : <FiGithub aria-hidden="true" />}
                {project.action}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Portfolio
