import FadeIn from './FadeIn'
import SpotlightCard from './SpotlightCard' // <--- Import this

const Experience = () => {
  return (
    <section id="experience" className="pt-20 pb-20">
      <FadeIn delay={0.2} direction="down">
          <div className="text-center mb-12">
            <h5 className="text-slate-400 text-sm">What Skills I Have</h5>
            <h2 className="text-3xl font-bold text-blue-500">My Experience</h2>
          </div>
      </FadeIn>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl px-6">
        
        {/* Frontend Card - Now using Spotlight */}
        <FadeIn delay={0.4} direction="left" fullWidth={true} padding={false}>
            <SpotlightCard 
                className="h-full border-slate-800 bg-slate-900/50 backdrop-blur-sm" 
                spotlightColor="rgba(59, 130, 246, 0.25)" // Blue spotlight
            >
                <h3 className="text-center text-xl font-medium text-blue-300 mb-8">Data Analyst</h3>
                <div className="grid grid-cols-2 gap-y-6 relative z-10">
                    <Skill name="PostgreSQL" level="Experienced" />
                    <Skill name="Power BI" level="Experienced" />
                    <Skill name="Tableau" level="Experienced" />
                    <Skill name="Excel" level="Experienced" />
                    <Skill name="SPSS" level="Beginner" />
                    <Skill name="Python" level="Intermediate" />
                </div>
            </SpotlightCard>
        </FadeIn>

        {/* Backend Card - Now using Spotlight */}
        <FadeIn delay={0.6} direction="right" fullWidth={true} padding={false}>
            <SpotlightCard 
                className="h-full border-slate-800 bg-slate-900/50 backdrop-blur-sm"
                spotlightColor="rgba(59, 130, 246, 0.25)" // Blue spotlight
            >
                <h3 className="text-center text-xl font-medium text-blue-300 mb-8">Frontend Development</h3>
                <div className="grid grid-cols-2 gap-y-6 relative z-10">
                    <Skill name="React" level="Intermediate" />
                    <Skill name="PHP" level="Beginner" />
                    <Skill name="Streamlit" level="Intermediate" />
                </div>
            </SpotlightCard>
        </FadeIn>

      </div>
    </section>
  )
}

const Skill = ({ name, level }: { name: string, level: string }) => {
  return (
    <article className="flex gap-3 items-start">
      {/* Replaced emoji with a nice SVG checkmark */}
      <span className="mt-1 text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>
      </span>
      <div>
        <h4 className="font-bold text-white leading-none">{name}</h4>
        <small className="text-slate-400 text-xs">{level}</small>
      </div>
    </article>
  )
}

export default Experience