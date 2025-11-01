import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  devOpsSkills,
} from './skills'

// Map skill titles to Simple Icons slugs
// Reference: https://simpleicons.org/
const skillToSlugMap = {
  'HTML5': 'html5',
  'CSS3': 'css3',
  'JavaScript': 'javascript',
  'React': 'react',
  'TypeScript': 'typescript',
  'Responsive Design': 'css3', // Using CSS3 as closest match
  'Tailwind CSS': 'tailwindcss',
  'Bootstrap': 'bootstrap',
  'Shadcn UI': 'react', // Using React as closest match (shadcn uses React)
  'Node.js': 'nodedotjs',
  'NestJS': 'nestjs',
  'MongoDB': 'mongodb',
  'PostgreSQL': 'postgresql',
  'MySQL': 'mysql',
  'Git & GitHub': 'github',
  'Docker': 'docker',
  // Additional AWS services
  'EC2': 'amazonec2',
  'S3': 'amazons3',
  'GitHub Actions': 'githubactions',
  // Testing tools
  'Jest': 'jest',
  'Postman': 'postman',
}

// Combine all skills
const allSkills = [
  ...frontendSkills,
  ...backendSkills,
  ...databaseSkills,
  ...devOpsSkills,
]

// Generate icon cloud slugs from all skills, removing duplicates
const uniqueSlugs = new Set()
const iconCloudSlugsArray = []

allSkills.forEach((skill) => {
  const slug = skillToSlugMap[skill.title]
  if (slug && !uniqueSlugs.has(slug)) {
    uniqueSlugs.add(slug)
    iconCloudSlugsArray.push(slug)
  }
})

// Add additional AWS services if not already included
const additionalSlugs = ['amazonec2', 'amazons3', 'githubactions']
additionalSlugs.forEach((slug) => {
  if (!uniqueSlugs.has(slug)) {
    uniqueSlugs.add(slug)
    iconCloudSlugsArray.push(slug)
  }
})

export const iconCloudSlugs = iconCloudSlugsArray

// Create image URLs for Icon Cloud using Simple Icons
export const iconCloudImages = iconCloudSlugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
)
