import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  versionControlSkills,
  cloudDeploymentSkills,
  testingSkills,
  projectManagementSkills,
  toolsAndOtherSkills,
} from "./skills";

// Map skill titles to Simple Icons slugs
// Reference: https://simpleicons.org/
const skillToSlugMap = {
  HTML5: "html5",
  CSS3: "css3",
  JavaScript: "javascript",
  React: "react",
  TypeScript: "typescript",
  "Responsive Design": "css3", // Using CSS3 as closest match
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  "Shadcn UI": "react", // Using React as closest match (shadcn uses React)
  Zustand: "react", // Using React as closest match (Zustand is a React state management library)
  "Node.js": "nodedotjs",
  "Express.js": "express",
  NestJS: "nestjs",
  GraphQL: "graphql",
  "Microservices Architecture": "docker", // Using Docker icon as microservices often use containers
  WebSocket: "socketdotio", // Using Socket.IO icon as closest match for WebSocket
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  Redis: "redis",
  "Git & GitHub": "github",
  Docker: "docker",
  // Additional AWS services
  EC2: "amazonec2",
  S3: "amazons3",
  "GitHub Actions": "githubactions",
  // Google Cloud Platform services
  "Google Cloud Platform": "googlecloud",
  "Google Cloud Run": "googlecloud",
  Firestore: "googlecloud",
  // Testing tools
  Jest: "jest",
  Postman: "postman",
  // Project management tools
  Jira: "jira",
  ClickUp: "clickup",
};

// Combine all skills
const allSkills = [
  ...frontendSkills,
  ...backendSkills,
  ...databaseSkills,
  ...versionControlSkills,
  ...cloudDeploymentSkills,
  ...testingSkills,
  ...projectManagementSkills,
  ...toolsAndOtherSkills,
];

// Generate icon cloud slugs from all skills, removing duplicates
const uniqueSlugs = new Set();
const iconCloudSlugsArray = [];

allSkills.forEach((skill) => {
  const slug = skillToSlugMap[skill.title];
  if (slug && !uniqueSlugs.has(slug)) {
    uniqueSlugs.add(slug);
    iconCloudSlugsArray.push(slug);
  }
});

// Add additional services if not already included
const additionalSlugs = ["amazonec2", "amazons3", "githubactions", "googlecloud"];
additionalSlugs.forEach((slug) => {
  if (!uniqueSlugs.has(slug)) {
    uniqueSlugs.add(slug);
    iconCloudSlugsArray.push(slug);
  }
});

export const iconCloudSlugs = iconCloudSlugsArray;

// Create image URLs for Icon Cloud using Simple Icons
export const iconCloudImages = iconCloudSlugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);
