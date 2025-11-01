import { projects } from '../../constants/projects'
import { AnimatedCard } from '../magicui/AnimatedCard'
import { BorderBeam } from '../magicui/BorderBeam'

const ProjectCard = ({ project }) => (
  <AnimatedCard className="relative group">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition h-full">
      <div className="relative">
        <div className="bg-gray-300 h-48 flex items-center justify-center overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full ${
                project.id === 4 ? 'object-contain' : 'object-cover'
              }`}
            />
          ) : (
            <i className={`${project.icon} text-5xl text-gray-500`}></i>
          )}
        </div>
        <BorderBeam
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          size={150}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
        {project.role && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Role:</span> {project.role}
          </p>
        )}
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex space-x-2 mb-4 flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={project.github}
            className="text-blue-600 hover:text-blue-800 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i> Code
          </a>
          <a
            href={project.demo}
            className="text-blue-600 hover:text-blue-800 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-external-link-alt"></i> Live Demo
          </a>
        </div>
      </div>
    </div>
  </AnimatedCard>
)

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
