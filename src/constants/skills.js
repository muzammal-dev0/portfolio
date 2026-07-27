/** Portfolio skill tags — aligned with CV */

const skill = (title) => ({ title })

export const frontendSkills = [
  skill('React.js'),
  skill('TypeScript'),
  skill('Vite'),
  skill('Bootstrap'),
  skill('Tailwind CSS'),
  skill('Zustand'),
  skill('TanStack Router/Query'),
  skill('Shadcn/UI'),
]

export const backendSkills = [
  skill('JavaScript'),
  skill('Node.js'),
  skill('NestJS'),
  skill('Express.js'),
  skill('GraphQL'),
  skill('Python'),
  skill('FastAPI'),
  skill('RabbitMQ'),
  skill('WebSockets'),
  skill('Microservices'),
]

export const databaseSkills = [
  skill('MongoDB'),
  skill('PostgreSQL'),
  skill('MySQL'),
  skill('Redis'),
  skill('Vector Database'),
  skill('Firestore'),
]

export const versionControlSkills = [
  skill('Git'),
  skill('GitHub'),
  skill('GitLab'),
  skill('GitHub Actions'),
  skill('Husky'),
  skill('Jira'),
  skill('ClickUp'),
  skill('Slack'),
]

export const cloudDeploymentSkills = [
  skill('Docker'),
  skill('AWS EC2'),
  skill('AWS ECS'),
  skill('AWS S3'),
  skill('GCP Cloud Run'),
  skill('Artifact Registry'),
  skill('GCS'),
]

export const testingSkills = [
  skill('Jest'),
  skill('Vitest'),
  skill('Playwright'),
  skill('Postman'),
  skill('ESLint'),
  skill('Prettier'),
  skill('Storybook'),
  skill('Unit Testing'),
  skill('Integration Testing'),
]

export const aiSkills = [
  skill('OpenAI'),
  skill('LangChain'),
  skill('LangGraph'),
  skill('CrewAI'),
  skill('OpenAI Agents SDK'),
  skill('MCP'),
  skill('Agentic AI'),
  skill('Multi-Agent Systems'),
  skill('RAG Pipeline'),
]

export const projectManagementSkills = []

/** @deprecated Legacy merge — kept for any external imports */
export const devOpsSkills = [
  ...versionControlSkills,
  ...cloudDeploymentSkills,
  ...testingSkills,
]

export const toolsAndOtherSkills = []
