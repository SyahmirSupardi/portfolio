type Skill = { name: string; icon?: string }
type SkillCategory = { name: string; skills: Skill[] }

const skillCategories: SkillCategory[] = [
  {
    name: 'Data Analyst',
    skills: [
      { name: 'Tableau' },
      { name: 'Power BI' },
      { name: 'Streamlit', icon: 'streamlit-plain' },
      { name: 'PostgreSQL', icon: 'postgresql-plain' },
      { name: 'Python', icon: 'python-plain' },
      { name: 'Excel' },
    ],
  },
  {
    name: 'Game Dev',
    skills: [
      { name: 'Unreal Engine 5', icon: 'unrealengine-original' },
      { name: 'Godot', icon: 'godot-plain' },
      { name: 'Blender', icon: 'blender-original' },
      { name: 'Notion', icon: 'notion-plain' },
    ],
  },
  {
    name: 'Software Dev',
    skills: [
      { name: 'React Native', icon: 'reactnative-original' },
      { name: 'PHP', icon: 'php-plain' },
      { name: 'Git', icon: 'git-plain' },
      { name: 'Linux', icon: 'linux-plain' },
    ],
  },
]

const Experience = () => {
  return (
    <section id="toolkit" className="section-wrap skills-section" aria-labelledby="toolkit-title">
      <div className="section-label-row">
        <span>03 / THE TOOLKIT</span>
        <span>TOOLS OF THE TRADE</span>
      </div>

      <div className="skills-board">
        <span className="paper-tape skills-tape" aria-hidden="true" />
        <div className="skills-board-heading">
          <p>ANALYSIS · REPORTING · CODE</p>
          <h2 id="toolkit-title">Skills</h2>
          <span className="skills-board-note">Tools I use to analyze data, shape game worlds, and build software.</span>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category) => (
            <article className="skill-category" key={category.name}>
              <h3>{category.name}</h3>
              <div className="skill-icon-stack">
                {category.skills.map((skill) => (
                  <span
                    className={`skill-icon-badge${skill.icon ? '' : ' skill-icon-badge--placeholder'}`}
                    data-name={skill.name}
                    role="img"
                    aria-label={skill.icon ? skill.name : `${skill.name} icon unavailable`}
                    tabIndex={0}
                    key={skill.name}
                  >
                    {skill.icon
                      ? <i className={`devicon-${skill.icon}`} aria-hidden="true" />
                      : <span className="skill-icon-placeholder" aria-hidden="true">?</span>}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
