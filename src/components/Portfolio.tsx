import { useState } from 'react'
import { FiArrowUpRight, FiDownload, FiGithub, FiPlay } from 'react-icons/fi'
import DepthCarousel, { type DepthCarouselItem } from './DepthCarousel'

type Project = {
  number: string
  title: string
  category: string
  description: string
  image: string
  alt: string
  tags: string[]
  href?: string
  action?: 'Download project' | 'View on GitHub' | 'Play on GamePix'
}

type ProjectCategory = 'data' | 'games'

const dataProjects: Project[] = [
  {
    number: '01',
    title: 'COVID-19 SQL analysis',
    category: 'Data analysis',
    description: 'A SQL exploration of COVID-19 data, with the queries available to download.',
    image: '/projects/covid-19.jpg',
    alt: 'COVID-19 project cover image',
    tags: ['SQL', 'PostgreSQL'],
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
    tags: ['Excel', 'VBA'],
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
    tags: ['Power BI', 'DAX'],
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
    tags: ['Python', 'Pandas'],
    href: 'https://github.com/SyahmirSupardi/Syhm_Portfolio_Project',
    action: 'View on GitHub',
  },
]

const gameProjects: Project[] = [
  {
    number: '01',
    title: 'Genesis Roulette',
    category: 'Game project',
    description: 'Infuse your living egg with Fire, Water, or Nature, then outplay your rival in a sci-fi duel where strategy and chance decide who survives.',
    image: '/projects/genesis-roulette-cover.png',
    alt: 'Genesis Roulette arena with a luminous central egg and Fire, Water, and Nature eggs.',
    tags: ['Fire', 'Water', 'Nature'],
    href: 'https://www.gamepix.com/jams/xsolla-game-jam-kl/play/434L3E',
    action: 'Play on GamePix',
  },
  {
    number: '02',
    title: 'PUSAKA',
    category: 'Game project',
    description: 'A Malaysian game project focused on narrative design and worldbuilding.',
    image: '/projects/pusaka-title-card.svg',
    alt: 'Typographic title card for the PUSAKA game project',
    tags: ['Worldbuilding', 'Narrative design'],
  },
]

const categoryOptions: Array<{ id: ProjectCategory; label: string; projects: Project[] }> = [
  { id: 'data', label: 'Data Analyst', projects: dataProjects },
  { id: 'games', label: 'Game Projects', projects: gameProjects },
]

const ProjectCard = ({ project, isActive }: { project: Project; isActive: boolean }) => {
  const isDownload = project.action === 'Download project'
  const isGame = project.action === 'Play on GamePix'
  const isExternal = project.action === 'View on GitHub' || isGame
  const linkProps = {
    href: project.href,
    download: isDownload ? true : undefined,
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noreferrer' : undefined,
    tabIndex: isActive ? 0 : -1,
  }

  const imageContent = (
    <>
      <img src={project.image} alt={project.alt} loading="lazy" decoding="async" draggable={false} />
      <span className="project-number">{project.number}</span>
      {project.href && <span className="project-image-arrow" aria-hidden="true"><FiArrowUpRight /></span>}
    </>
  )

  return (
    <article
      className="project-card"
      data-variant={Number(project.number) % 2 === 0 ? 'yellow' : 'blue'}
      aria-label={`${project.category}: ${project.title}`}
    >
      <span className="paper-tape project-tape" aria-hidden="true" />
      {project.href
        ? <a className="project-image-link" {...linkProps} aria-label={`${project.action}: ${project.title}`}>{imageContent}</a>
        : <div className="project-image-link project-image-link--static">{imageContent}</div>}

      <div className="project-content">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.tags.join(' · ')}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.href && project.action && (
          <a className="project-action" {...linkProps}>
            {isDownload ? <FiDownload aria-hidden="true" /> : isGame ? <FiPlay aria-hidden="true" /> : <FiGithub aria-hidden="true" />}
            {project.action}
            <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('data')
  const category = categoryOptions.find((option) => option.id === activeCategory) ?? categoryOptions[0]
  const activeProjects = category.projects
  const items: DepthCarouselItem[] = activeProjects.map(({ image, alt }) => ({ image, alt }))

  return (
    <section id="portfolio" className="section-wrap work-section" aria-labelledby="work-title">
      <div className="section-label-row">
        <span>02 / PROJECT ARCHIVE</span>
        <span>SELECTED WORK SAMPLES</span>
      </div>

      <div className="work-heading">
        <h2 id="work-title">Work <span>samples</span></h2>
        <p>
          {activeCategory === 'data'
            ? 'Analysis, reports, and dashboards built to make information easier to use.'
            : 'From elemental sci-fi duels to Malaysian game worlds, each project starts with a distinct idea.'}
        </p>
      </div>

      <div className="project-category-bar">
        <div className="project-category-switch" role="group" aria-label="Work sample categories">
          {categoryOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              className={`project-category-button${activeCategory === option.id ? ' is-active' : ''}`}
              aria-pressed={activeCategory === option.id}
              onClick={() => setActiveCategory(option.id)}
            >
              <span>{option.label}</span>
              <span className="project-category-count" aria-label={`${option.projects.length} projects`}>
                {String(option.projects.length).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
        <p className="project-category-status" aria-live="polite">
          <span>NOW SHOWING</span> {category.label.toUpperCase()}
        </p>
      </div>

      <div className="project-carousel-shell">
        <DepthCarousel
          key={activeCategory}
          items={items}
          renderItem={(_item, index, isActive) => (
            <ProjectCard project={activeProjects[index]} isActive={isActive} />
          )}
          cardWidth={340}
          cardHeight={438}
          radius={0}
          depth={205}
          spread={66}
          tilt={15}
          tiltDirection="right"
          perspective={1300}
          visibleCards={3}
          falloff={0.22}
          blur={2}
          showControls
          showIndicators
          label={`${category.label} work samples`}
          className="project-depth-carousel"
        />
      </div>
    </section>
  )
}

export default Portfolio
