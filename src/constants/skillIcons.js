/**
 * Mapping of skills to Simple Icons slugs for use with Icon Cloud
 * Format: https://cdn.simpleicons.org/{slug}/{slug}
 */
export const skillIcons = {
  // Frontend
  html5: 'html5',
  css3: 'css3',
  javascript: 'javascript',
  react: 'react',
  typescript: 'typescript',
  tailwindcss: 'tailwindcss',
  bootstrap: 'bootstrap',
  
  // Backend
  nodejs: 'nodedotjs',
  nestjs: 'nestjs',
  express: 'express',
  
  // Databases
  mongodb: 'mongodb',
  postgresql: 'postgresql',
  mysql: 'mysql',
  
  // DevOps & Tools
  git: 'git',
  github: 'github',
  docker: 'docker',
  kubernetes: 'kubernetes',
}

/**
 * Get all skill icon URLs for Icon Cloud
 */
export const getAllSkillIconUrls = () => {
  return Object.values(skillIcons).map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )
}

/**
 * Get categorized skill icon URLs
 */
export const getFrontendSkillIcons = () => {
  const frontendSlugs = [
    skillIcons.html5,
    skillIcons.css3,
    skillIcons.javascript,
    skillIcons.react,
    skillIcons.typescript,
    skillIcons.tailwindcss,
    skillIcons.bootstrap,
  ]
  return frontendSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)
}

export const getBackendSkillIcons = () => {
  const backendSlugs = [skillIcons.nodejs, skillIcons.nestjs, skillIcons.express]
  return backendSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)
}

export const getDatabaseSkillIcons = () => {
  const databaseSlugs = [skillIcons.mongodb, skillIcons.postgresql, skillIcons.mysql]
  return databaseSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)
}

export const getDevOpsSkillIcons = () => {
  const devOpsSlugs = [
    skillIcons.git,
    skillIcons.github,
    skillIcons.docker,
    skillIcons.kubernetes,
  ]
  return devOpsSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)
}

