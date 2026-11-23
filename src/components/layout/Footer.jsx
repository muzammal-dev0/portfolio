import { personalInfo } from '../../constants/personalInfo'

const Footer = () => (
  <footer className="border-t border-ink-200 px-5 py-8 md:px-6">
    <div className="mx-auto flex max-w-6xl flex-col gap-2 text-center font-mono text-xs text-ink-500 sm:flex-row sm:text-left sm:items-center sm:justify-between">
      <p className="flex items-center justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-900" aria-hidden />© {new Date().getFullYear()} {personalInfo.name}
      </p>
      <p>{personalInfo.location}</p>
    </div>
  </footer>
)

export default Footer
