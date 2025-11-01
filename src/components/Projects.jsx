const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Willo Box - AI PDF Assistant',
      description:
        'Created a platform for users to upload PDFs and ask context-based questions, using OpenAI APIs, LangChain, and VectorDB for semantic search capabilities.',
      technologies: ['Node.js', 'OpenAI', 'VectorDB'],
      icon: 'fas fa-robot',
      github: '#',
      demo: '#',
    },
    {
      id: 2,
      title: 'Crypto Broker Platform',
      description:
        'Developed a secure crypto exchange platform enabling users to sell cryptocurrency to admins with bank transfers, supporting both web and mobile interfaces.',
      technologies: ['NestJS', 'MongoDB', 'React Native'],
      icon: 'fab fa-bitcoin',
      github: '#',
      demo: '#',
    },
    {
      id: 3,
      title: 'KatanaInu Gaming Platform',
      description:
        'Built a gaming platform similar to Epic or Steam, where users can play games and admins can upload games, featuring social media components for tournament organization.',
      technologies: ['MongoDB', 'Express.js', 'React.js'],
      image: '/assets/katanainu1.png',
      github: '#',
      demo: '#',
    },
    {
      id: 4,
      title: 'Obon - Restaurant Tipping Platform',
      description:
        'Contributed to a restaurant tipping platform allowing waitstaff and restaurants to register and receive tips. Implemented Google Reviews integration for customer feedback.',
      technologies: ['PostgreSQL', 'Express.js', 'React.js'],
      image: '/assets/EasyTipping1.png',
      github: '#',
      demo: '#',
    },
    {
      id: 5,
      title: 'Solutionz - Educational CRM',
      description:
        'Designed and implemented a comprehensive backend for an educational CRM system with user authentication, student management, and performance tracking capabilities.',
      technologies: ['MongoDB', 'Express.js', 'Node.js'],
      icon: 'fas fa-school',
      github: '#',
      demo: '#',
    },
    {
      id: 6,
      title: 'Parry Script',
      description:
        'Created a platform for buying and selling medicines among pharmacies. Enabled users to register their pharmacies and manage transactions for purchasing and selling medications.',
      role: 'Backend Developer',
      technologies: ['PostgreSQL', 'Express.js', 'Node.js', 'React.js'],
      icon: 'fas fa-prescription-bottle-alt',
      github: '#',
      demo: '#',
    },
  ]

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="bg-gray-300 h-48 flex items-center justify-center">
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
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {project.title}
                </h3>
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
                  >
                    <i className="fab fa-github"></i> Code
                  </a>
                  <a
                    href={project.demo}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

