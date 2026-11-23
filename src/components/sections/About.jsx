import { personalInfo } from '../../constants/personalInfo'
import LogSection from '../layout/LogSection'

const About = () => (
  <LogSection id="about" label="About">
    <div className="space-y-6 text-xl leading-relaxed text-ink-800 md:text-[1.375rem] md:leading-[1.6]">
      {personalInfo.bio.long.map((para) => (
        <p key={para.slice(0, 40)}>{para}</p>
      ))}
    </div>
  </LogSection>
)

export default About
