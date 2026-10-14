const skills = [
  { abbreviation: 'SQL', name: 'PostgreSQL', level: 'Experienced', group: 'CORE' },
  { abbreviation: 'BI', name: 'Power BI', level: 'Experienced', group: 'CORE' },
  { abbreviation: 'T', name: 'Tableau', level: 'Experienced', group: 'CORE' },
  { abbreviation: 'XL', name: 'Excel', level: 'Experienced', group: 'CORE' },
  { abbreviation: 'Py', name: 'Python', level: 'Intermediate', group: 'SUPPORTING' },
  { abbreviation: 'S', name: 'Streamlit', level: 'Intermediate', group: 'SUPPORTING' },
  { abbreviation: 'SP', name: 'SPSS', level: 'Beginner', group: 'SUPPORTING' },
  { abbreviation: 'R', name: 'React', level: 'Intermediate', group: 'ADDITIONAL' },
  { abbreviation: 'PHP', name: 'PHP', level: 'Beginner', group: 'ADDITIONAL' },
]

const Experience = () => {
  return (
    <section id="toolkit" className="section-wrap skills-section" aria-labelledby="toolkit-title">
      <div className="section-label-row">
        <span>02 / THE TOOLKIT</span>
        <span>TOOLS OF THE TRADE</span>
      </div>

      <div className="skills-board">
        <span className="paper-tape skills-tape" aria-hidden="true" />
        <div className="skills-board-heading">
          <p>ANALYSIS · REPORTING · CODE</p>
          <h2 id="toolkit-title">Skills</h2>
          <span className="skills-board-note">A working set of tools for finding the useful signal in a dataset.</span>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-tile" key={skill.name}>
              <span className="skill-group">{skill.group}</span>
              <span className="skill-stamp" aria-hidden="true">{skill.abbreviation}</span>
              <strong>{skill.name}</strong>
              <span className="skill-level">{skill.level}</span>
            </article>
          ))}
        </div>

        <div className="skills-board-footer">
          <span>CORE SKILLS: POSTGRESQL · POWER BI · TABLEAU · EXCEL</span>
          <span>CONTINUOUSLY LEARNING</span>
        </div>
      </div>
    </section>
  )
}

export default Experience
