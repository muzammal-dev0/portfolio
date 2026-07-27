export const projects = [
  {
    id: 1,
    slug: "aedi",
    title: "AEDI — Municipal Planning & Zoning SaaS",
    description:
      "Multi-tenant SaaS platform for Canadian municipalities to automate zoning and land development assessments, with AI-powered regulatory analysis, GIS integrations, and cloud-native infrastructure.",
    bullets: [
      "Automated zoning and land-development assessments across municipalities.",
      "GIS integrations with ArcGIS and AI/RAG regulatory analysis workflows.",
      "Cloud-native backend and infrastructure with NestJS, FastAPI, and AWS ECS.",
    ],
    technologies: [
      "React.js",
      "NestJS",
      "FastAPI",
      "PostgreSQL",
      "ArcGIS",
      "OpenAI",
      "AWS ECS",
      "Docker",
    ],
    icon: "fas fa-map-marked-alt",
    github: null,
    demo: null,
  },
  {
    id: 2,
    slug: "case-management-hub",
    title: "Case Management Hub (CMH)",
    description:
      "HIPAA-compliant case management platform with configurable dynamic forms, role-based access control, workflow automation, and scalable APIs for healthcare organizations.",
    bullets: [
      "Configurable dynamic forms for secure healthcare workflows.",
      "RBAC and workflow automation for operational teams.",
      "Scalable backend services on NestJS and PostgreSQL.",
    ],
    technologies: ["NestJS", "PostgreSQL", "Google Cloud Platform", "HIPAA"],
    icon: "fas fa-clipboard-list",
    github: null,
    demo: null,
  },
  {
    id: 3,
    slug: "sales-management-system",
    title: "Sales Management System",
    description:
      "SaaS-based sales and inventory management platform for e-commerce businesses to manage products, inventory, orders, and sales operations.",
    bullets: [
      "Product, inventory, and order management for e-commerce operations.",
      "Secure backend APIs with authentication and RBAC.",
      "Scalable business workflows with NestJS and PostgreSQL.",
    ],
    technologies: ["React.js", "NestJS", "PostgreSQL", "TypeScript"],
    icon: "fas fa-chart-line",
    github: null,
    demo: "https://dev-sales.futurenostics.com/sign-in",
  },
  {
    id: 4,
    slug: "willo-box",
    title: "Willo Box — AI Document Intelligence Platform",
    description:
      "LLM-powered document intelligence platform that lets users upload PDFs and retrieve accurate, context-aware answers using RAG, semantic search, and vector embeddings.",
    bullets: [
      "PDF upload and context-aware Q&A over document content.",
      "Retrieval-Augmented Generation with OpenAI and LangChain.",
      "Vector embeddings and semantic search pipelines.",
    ],
    technologies: ["Node.js", "OpenAI API", "LangChain", "Vector Database"],
    icon: "fas fa-robot",
    github: null,
    demo: null,
  },
  {
    id: 5,
    slug: "sidekick",
    title: "Sidekick — Agentic AI Assistant",
    description:
      "Intelligent AI assistant that plans multi-step tasks, invokes external tools, evaluates responses against success criteria, and supports human-in-the-loop interactions through graph-based agent workflows.",
    bullets: [
      "Multi-step task planning and tool calling with LangGraph.",
      "Human-in-the-loop interactions and response evaluation.",
      "Graph-based agent workflows built with Python and LangChain.",
    ],
    technologies: ["Python", "LangChain", "LangGraph"],
    icon: "fas fa-comments",
    github: null,
    demo: null,
  },
  {
    id: 6,
    slug: "autonomous-trading-floor",
    title: "Autonomous Trading Floor — Multi-Agent AI Platform",
    description:
      "Multi-agent trading platform where specialized AI agents collaborate on market research, financial analysis, and custom MCP server access using autonomous agent orchestration.",
    bullets: [
      "Specialized agents for research and market intelligence.",
      "Custom MCP server integration for account and market data.",
      "Autonomous orchestration with OpenAI Agents SDK.",
    ],
    technologies: ["Python", "OpenAI Agents SDK", "MCP"],
    icon: "fas fa-chart-area",
    github: null,
    demo: null,
  },
  {
    id: 7,
    slug: "monday-automation",
    title: "Monday.com Automation Platform",
    description:
      "Backend services and custom integrations for Monday.com—event-driven webhooks, custom applications, and third-party APIs to synchronize data and automate business workflows.",
    bullets: [
      "Event-driven webhooks and custom Monday.com applications.",
      "Data sync and automation for operational efficiency.",
      "Scalable NestJS services with TypeScript.",
    ],
    technologies: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "Monday.com API",
      "Webhooks",
    ],
    icon: "fas fa-sync-alt",
    github: null,
    demo: null,
  },
  {
    id: 8,
    slug: "obon",
    title: "Obon — Easy Tipping Platform",
    description:
      "Digital tipping platform that enables businesses to accept cashless tips through secure online payments, with Stripe integration, RBAC, and responsive frontend features.",
    bullets: [
      "Cashless tipping with Stripe payment processing.",
      "Authentication and role-based access control.",
      "Scalable NestJS APIs and React frontend.",
    ],
    technologies: ["Node.js", "NestJS", "React.js", "PostgreSQL", "Stripe"],
    icon: "fas fa-utensils",
    github: null,
    demo: null,
  },
]

/** Lookup for project detail route */
export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) ?? null
