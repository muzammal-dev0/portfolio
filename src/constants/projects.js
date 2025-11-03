export const projects = [
  {
    id: 1,
    title: "Sales Management System",
    description:
      "Designed a SaaS-based Sales Management System for ecommerce businesses to manage sales, inventory, and orders.",
    technologies: ["NestJS", "PostgreSQL", "React.js", "TypeScript", "Docker"],
    images: [
      "/assets/sales-dashboard-1.png",
      "/assets/sales-dashboard-2.png",
      "/assets/sales-dashboard-3.png",
    ], // Add your dashboard screenshots here - these will auto-rotate
    github: "#",
    demo: "https://dev-sales.futurenostics.com/sign-in",
  },
  {
    id: 2,
    title: "Case Management Hub (CMH)",
    description:
      "Developed a multi-tenant SaaS platform for case management, enabling real-time collaboration and dynamic form building. The Custom Form Builder feature allowed organizations to create, manage, and distribute HIPAA-compliant forms.",
    technologies: ["NestJS", "PostgreSQL", "React.js", "TypeScript", "HIPAA"],
    icon: "fas fa-clipboard-list",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Task Management System",
    description:
      "Built a task management system with role-based access control (RBAC) and granular permissions for assigning, tracking, and managing tasks across teams. Implemented different roles such as Admin, Manager, and Member, each with specific permissions to ensure secure and efficient task flow.",
    technologies: ["NestJS", "PostgreSQL", "React.js", "RBAC", "TypeScript"],
    icon: "fas fa-tasks",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Monday.com ↔ Google Sheets Automation",
    description:
      "Developed an automation service to sync data between Monday.com boards and Google Sheets, automating project workflows.",
    technologies: [
      "Node.js",
      "Monday.com API",
      "Google Sheets API",
      "Express.js",
    ],
    icon: "fas fa-sync-alt",
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Solutionz",
    description:
      "Developed a backend for managing student profiles, enrollments, and academic progress tracking.",
    technologies: ["MongoDB", "Express.js", "Node.js"],
    icon: "fas fa-school",
    github: "#",
    demo: "#",
  },
  {
    id: 6,
    title: "Willo Box",
    description:
      "Built a platform for uploading PDFs and querying content using OpenAI APIs and LangChain for semantic search.",
    technologies: ["Node.js", "OpenAI", "LangChain", "VectorDB"],
    icon: "fas fa-robot",
    github: "#",
    demo: "#",
  },
  {
    id: 7,
    title: "Crypto Broker",
    description:
      "Developed a secure backend to handle cryptocurrency transactions and manage user data.",
    technologies: ["NestJS", "MongoDB", "React Native"],
    icon: "fab fa-bitcoin",
    github: "#",
    demo: "#",
  },
  {
    id: 8,
    title: "KatanaInu",
    description:
      "Created a gaming platform similar to Steam, where users can play and purchase games, while admins can upload and manage content. Added social features for tournament organization and user interaction.",
    technologies: ["MongoDB", "Express.js", "React.js"],
    image: "/assets/katanainu1.png",
    github: "#",
    demo: "#",
  },
  {
    id: 9,
    title: "Obon",
    description:
      "Integrated Google Reviews for customer feedback into a restaurant tipping platform.",
    technologies: ["PostgreSQL", "Express.js", "React.js"],
    image: "/assets/EasyTipping1.png",
    github: "#",
    demo: "#",
  },
];
