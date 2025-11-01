// Simple Icons slugs for Icon Cloud
// Using Simple Icons format: https://cdn.simpleicons.org/{slug}/{slug}
// Reference: https://simpleicons.org/

export const iconCloudSlugs = [
  // Frontend
  'html5',
  'css3',
  'javascript',
  'react',
  'typescript',
  'tailwindcss',
  'bootstrap',
  
  // Backend
  'nodedotjs',
  'nestjs',
  
  // Databases
  'mongodb',
  'postgresql',
  'mysql',
  
  // DevOps & Tools
  'git',
  'github',
  'docker',
  'kubernetes',
]

// Create image URLs for Icon Cloud using Simple Icons
export const iconCloudImages = iconCloudSlugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
)
