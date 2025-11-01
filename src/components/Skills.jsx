const Skills = () => {
  const frontendSkills = [
    {
      icon: 'fab fa-html5',
      title: 'HTML5',
      description: 'Expert in creating semantic, accessible, and SEO-friendly HTML markup.',
      cardClass: 'skill-card-html',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fab fa-css3-alt',
      title: 'CSS3',
      description: 'Proficient in CSS3, flexbox, grid, animations, and responsive design.',
      cardClass: 'skill-card-css',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fab fa-js',
      title: 'JavaScript',
      description: 'Strong knowledge of JavaScript, ES6+, DOM manipulation, and modern APIs.',
      cardClass: 'skill-card-js',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fab fa-react',
      title: 'React',
      description: 'Experience building dynamic and responsive UIs with React and its ecosystem.',
      cardClass: 'skill-card-react',
      iconColor: '',
      textColor: '',
    },
    {
      icon: 'fab fa-js',
      title: 'TypeScript',
      description: 'Using TypeScript to build type-safe and maintainable frontend applications.',
      cardClass: 'skill-card-ts',
      iconColor: '',
      textColor: '',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Responsive Design',
      description: 'Creating websites that work beautifully across all devices and screen sizes.',
      cardClass: 'skill-card-responsive',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fab fa-css3',
      title: 'Tailwind CSS',
      description: 'Creating modern, responsive interfaces using Tailwind\'s utility-first CSS framework.',
      cardClass: 'skill-card-tailwind',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fab fa-bootstrap',
      title: 'Bootstrap',
      description: 'Developing responsive, mobile-first websites using Bootstrap\'s component library and grid system.',
      cardClass: 'skill-card-bootstrap',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fas fa-palette',
      title: 'Shadcn UI',
      description: 'Building accessible and customizable interfaces using Shadcn UI components.',
      cardClass: 'skill-card-shadcn',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
  ]

  const backendSkills = [
    {
      icon: 'fab fa-node-js',
      title: 'Node.js',
      description: 'Backend development with Node.js, Express, and various databases.',
      cardClass: 'skill-card-node',
      iconColor: '',
      textColor: '',
    },
    {
      icon: 'fab fa-node-js',
      title: 'NestJS',
      description: 'Building robust and scalable server-side applications using NestJS framework with TypeScript.',
      cardClass: 'skill-card-nest',
      iconColor: '',
      textColor: '',
    },
  ]

  const databaseSkills = [
    {
      icon: 'fas fa-database',
      title: 'MongoDB',
      description: 'Working with NoSQL databases to build flexible and scalable data storage solutions.',
      cardClass: 'skill-card-mongo',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fas fa-database',
      title: 'PostgreSQL',
      description: 'Designing and optimizing relational databases for complex applications.',
      cardClass: 'skill-card-postgres',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fas fa-database',
      title: 'MySQL',
      description: 'Working with MySQL for robust relational database management and efficient data querying.',
      cardClass: 'skill-card-mysql',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
  ]

  const devOpsSkills = [
    {
      icon: 'fab fa-git-alt',
      title: 'Git & GitHub',
      description: 'Proficient in version control with Git and collaborative development using GitHub workflows.',
      cardClass: 'skill-card-git',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fab fa-docker',
      title: 'Docker',
      description: 'Containerizing applications with Docker for consistent development, testing, and deployment environments.',
      cardClass: 'skill-card-docker',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
    {
      icon: 'fas fa-dharmachakra',
      title: 'Kubernetes',
      description: 'Orchestrating containerized applications with Kubernetes for automated deployment, scaling, and management of application containers.',
      cardClass: 'skill-card-kubernetes',
      iconColor: 'text-blue-500',
      textColor: 'text-gray-800',
    },
  ]

  const SkillCard = ({ skill }) => (
    <div className={`${skill.cardClass} p-8 hover:shadow-xl transition`}>
      <div className={`text-4xl ${skill.iconColor} mb-4`}>
        <i className={skill.icon}></i>
      </div>
      <h3 className={`text-xl font-bold mb-2 ${skill.textColor}`}>{skill.title}</h3>
      <p className={skill.textColor}>{skill.description}</p>
    </div>
  )

  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Skills
        </h2>

        {/* Frontend Skills */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-700 border-b border-gray-300 pb-2">
            Frontend Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frontendSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* Backend Skills */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-700 border-b border-gray-300 pb-2">
            Backend Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* Database Skills */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-700 border-b border-gray-300 pb-2">
            Database Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {databaseSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* DevOps & Tools */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-700 border-b border-gray-300 pb-2">
            DevOps & Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devOpsSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

