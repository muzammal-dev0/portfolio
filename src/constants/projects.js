export const projects = [
  {
    id: 1,
    slug: "aedi",
    title: "AEDI — Municipal Planning & Zoning SaaS",
    description:
      "Multi-tenant SaaS platform for Canadian land development and municipal planning, featuring automated zoning assessments, parcel analysis, GIS integrations, and AI-powered planning workflows.",
    bullets: [
      "Automated zoning and land-development assessments across municipalities.",
      "GIS integrations with ArcGIS and PostGIS for parcel and regulatory data.",
      "AI planning workflows with FastAPI, OpenAI, LangChain, and RAG pipelines.",
    ],
    technologies: [
      "React.js",
      "NestJS",
      "FastAPI",
      "PostGIS",
      "ArcGIS",
      "OpenAI",
      "LangChain",
      "AWS ECS",
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
      "HIPAA-compliant case management platform with dynamic form-building capabilities, secure workflows, and role-based access management for healthcare-related operational processes.",
    bullets: [
      "Configurable form builder for secure healthcare workflows.",
      "RBAC and org-scoped access across operational teams.",
      "Secure backend services for case and document management.",
    ],
    technologies: ["NestJS", "PostgreSQL", "React.js", "TypeScript", "HIPAA"],
    icon: "fas fa-clipboard-list",
    github: null,
    demo: null,
  },
  {
    id: 3,
    slug: "sales-management-system",
    title: "Sales Management System",
    description:
      "SaaS-based sales and inventory management platform for e-commerce businesses to manage products, orders, inventory tracking, and operational workflows.",
    bullets: [
      "Sales, inventory, and order management for e-commerce operations.",
      "Backend APIs with authentication and role-based permissions.",
      "Secure business workflows with NestJS and PostgreSQL.",
    ],
    technologies: ["NestJS", "PostgreSQL", "React.js", "TypeScript", "Docker"],
    icon: "fas fa-chart-line",
    github: null,
    demo: "https://dev-sales.futurenostics.com/sign-in",
  },
  {
    id: 4,
    slug: "willo-box",
    title: "Willo Box — AI Document Query Platform",
    description:
      "AI-powered document analysis platform that lets users upload PDFs and retrieve context-aware answers using semantic search and LLM-based retrieval workflows.",
    bullets: [
      "PDF upload and context-aware Q&A over document content.",
      "Semantic search and LLM retrieval with OpenAI and LangChain.",
      "Vector-based document processing pipelines.",
    ],
    technologies: ["Node.js", "OpenAI", "LangChain", "Vector DB"],
    icon: "fas fa-robot",
    github: null,
    demo: null,
  },
  {
    id: 5,
    slug: "monday-google-sheets-sync",
    title: "Monday.com ↔ Google Sheets Automation",
    description:
      "Workflow automation service for synchronizing operational data between Monday.com boards and Google Sheets to reduce manual handling and streamline reporting.",
    bullets: [
      "Sync between Monday.com boards and Google Sheets.",
      "Automation pipelines for operational reporting.",
      "Reduced manual data entry across teams.",
    ],
    technologies: [
      "Node.js",
      "Monday.com API",
      "Google Sheets API",
      "Express.js",
    ],
    icon: "fas fa-sync-alt",
    github: null,
    demo: null,
  },
  {
    id: 6,
    slug: "katanainu",
    title: "KatanaInu — Gaming Platform",
    description:
      "Gaming platform with game publishing, tournament organization, and user interaction—admins manage content while players access and participate in games.",
    bullets: [
      "Game management and admin-controlled content publishing.",
      "Tournament organization and player participation flows.",
      "Scalable API-driven backend architecture.",
    ],
    technologies: ["MongoDB", "Express.js", "React.js"],
    icon: "fas fa-gamepad",
    github: null,
    demo: null,
  },
  {
    id: 7,
    slug: "obon",
    title: "Obon — Restaurant Tipping Platform",
    description:
      "Restaurant tipping and customer engagement platform designed to enhance customer interaction and feedback collection for restaurants.",
    bullets: [
      "Google Reviews integration for customer feedback.",
      "Backend workflows for engagement and visibility.",
      "Improved restaurant–customer interaction experiences.",
    ],
    technologies: ["PostgreSQL", "Express.js", "React.js"],
    icon: "fas fa-utensils",
    github: null,
    demo: null,
  },
];

/** Lookup for project detail route */
export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) ?? null;
