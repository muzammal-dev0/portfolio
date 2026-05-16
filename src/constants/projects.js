export const projects = [
  {
    id: 1,
    slug: "sales-management-system",
    title: "Sales Management System",
    description:
      "Designed a SaaS-based Sales Management System for ecommerce businesses to manage sales, inventory, and orders.",
    bullets: [
      "SaaS workspace for sales, inventory, and order flows.",
      "NestJS APIs and PostgreSQL for transactional data.",
      "React + TypeScript client with role-aware UI.",
    ],
    technologies: ["NestJS", "PostgreSQL", "React.js", "TypeScript", "Docker"],
    icon: "fas fa-chart-line",
    github: null,
    demo: "https://dev-sales.futurenostics.com/sign-in",
    note: "Repository is private; architecture and code samples available on request.",
  },
  {
    id: 2,
    slug: "case-management-hub",
    title: "Case Management Hub (CMH)",
    description:
      "Developed a multi-tenant SaaS platform for case management, enabling real-time collaboration and dynamic form building. The Custom Form Builder feature allowed organizations to create, manage, and distribute HIPAA-compliant forms.",
    bullets: [
      "Multi-tenant isolation with org-scoped data and permissions.",
      "Custom form builder for HIPAA-aligned capture and distribution.",
      "Real-time collaboration on cases and documents.",
    ],
    technologies: ["NestJS", "PostgreSQL", "React.js", "TypeScript", "HIPAA"],
    icon: "fas fa-clipboard-list",
    github: null,
    demo: null,
    note: "Production under NDA; happy to discuss design and compliance tradeoffs privately.",
  },
  {
    id: 3,
    slug: "task-management-system",
    title: "Task Management System",
    description:
      "Built a task management system with role-based access control (RBAC) and granular permissions for assigning, tracking, and managing tasks across teams. Implemented different roles such as Admin, Manager, and Member, each with specific permissions to ensure secure and efficient task flow.",
    bullets: [
      "RBAC with Admin, Manager, and Member permission matrices.",
      "Granular assignment and lifecycle tracking for tasks.",
      "NestJS + PostgreSQL + React + TypeScript end to end.",
    ],
    technologies: ["NestJS", "PostgreSQL", "React.js", "RBAC", "TypeScript"],
    icon: "fas fa-tasks",
    github: null,
    demo: null,
    note: "Internal / client-hosted deployment; demo and repo not public.",
  },
  {
    id: 4,
    slug: "monday-google-sheets-sync",
    title: "Monday.com ↔ Google Sheets Automation",
    description:
      "Developed an automation service to sync data between Monday.com boards and Google Sheets, automating project workflows.",
    bullets: [
      "Bidirectional sync between Monday.com boards and spreadsheets.",
      "Node/Express service with resilient scheduling and retries.",
      "OAuth and API rate-limit aware integrations.",
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
    id: 5,
    slug: "solutionz",
    title: "Solutionz",
    description:
      "Developed a backend for managing student profiles, enrollments, and academic progress tracking.",
    technologies: ["MongoDB", "Express.js", "Node.js"],
    icon: "fas fa-school",
    github: null,
    demo: null,
  },
  {
    id: 6,
    slug: "willo-box",
    title: "Willo Box",
    description:
      "Built a platform for uploading PDFs and querying content using OpenAI APIs and LangChain for semantic search.",
    technologies: ["Node.js", "OpenAI", "LangChain", "VectorDB"],
    icon: "fas fa-robot",
    github: null,
    demo: null,
  },
  {
    id: 7,
    slug: "crypto-broker",
    title: "Crypto Broker",
    description:
      "Developed a secure backend to handle cryptocurrency transactions and manage user data.",
    technologies: ["NestJS", "MongoDB", "React Native"],
    icon: "fab fa-bitcoin",
    github: null,
    demo: null,
  },
  {
    id: 8,
    slug: "katanainu",
    title: "KatanaInu",
    description:
      "Created a gaming platform similar to Steam, where users can play and purchase games, while admins can upload and manage content. Added social features for tournament organization and user interaction.",
    technologies: ["MongoDB", "Express.js", "React.js"],
    icon: "fas fa-gamepad",
    github: null,
    demo: null,
  },
  {
    id: 9,
    slug: "obon",
    title: "Obon",
    description:
      "Integrated Google Reviews for customer feedback into a restaurant tipping platform.",
    technologies: ["PostgreSQL", "Express.js", "React.js"],
    icon: "fas fa-utensils",
    github: null,
    demo: null,
  },
];

/** Lookup for project detail route */
export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) ?? null;
