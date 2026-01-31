import FadeIn from './FadeIn'
// ✅ FIX: Added "type" keyword so the browser knows not to look for this at runtime
import MotionCarousel, { type ProjectSlide } from './MotionCarousel'

const projects: ProjectSlide[] = [
  {
    id: 1,
    title: 'Covid SQL Analysis',
    description: 'Analyzed Covid real-time data. Download the SQL queries below.',
    image: '/projects/covid-19.jpg',
    tech: ['SQL'],
    // Link to the file in your public/downloads folder
    download: '/downloads/Covid SQL Project.sql' 
  },
  {
    id: 2,
    title: 'Excel Report',
    description: 'Automated bikes reporting dashboard.',
    image: '/projects/2022-09-29-image-2.png',
    tech: ['Excel', 'VBA'],
    // Link to an Excel file
    download: '/downloads/Excel Full Project.xlsx'
  },
  {
    id: 3,
    title: 'Collection Github Project',
    description: 'Standard web project with GitHub link.',
    image: '/projects/1703525023946.jpg',
    tech: ['Python', 'Pandas'],
    github: 'https://github.com/SyahmirSupardi/Syhm_Portfolio_Project.git'
    // No download link here, so the button won't appear
  },
  {
    id: 4,
    title: 'Coming Soon',
    description: 'Coming Soon...',
    image: 'https://placehold.co/600x400/1e293b/white?text=Task+App',
    tech: ['React.js', 'TypeScript'],
    github: '',
    demo: ''
  },
  {
    id: 5,
    title: 'Power BI Dashboard',
    description: 'Interactive dashboard for business analytics.',
    image: '/projects/461.png',
    tech: ['Power BI', 'DAX'],
    download: '/downloads/Power BI Project.pbix' 
  }
]

const Portfolio = () => {
  return (
    <section id="portfolio" className="pt-20 pb-20 overflow-hidden">
      <FadeIn delay={0.2} direction="down">
        <div className="text-center mb-16">
            <h5 className="text-slate-400 text-sm">My Recent Work</h5>
            <h2 className="text-3xl font-bold text-blue-500">Portfolio</h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.4} direction="up" fullWidth={true} padding={false}>
          {/* Using the new Carousel Component */}
          <MotionCarousel slides={projects} />
      </FadeIn>
    </section>
  )
}

export default Portfolio