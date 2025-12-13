import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Hyuu",
  role: "Software Engineer Student",
  bio: "A vibe coder building full-stack applications with AI-driven workflows.",
  contact: {
    email: "contact@hyuu.tech",
    instagram: "@",
    tiktok: "@zfarrx",
    github: "@slowlyh",
    telegram: "@hiyuux",
    location: "Jawa Tengah, Indonesia"
  },
  projects: [
    {
      title: "Snippets",
    description: "Simple web snippets.",
    tags: ["Next.js", "AI Integration", "TypeScript"],
    imageUrl: "/projects/marktools.png",
    demoUrl: "https://code.hyuu.tech",
    repoUrl: "https://github.com/slowlyh/Snippets", // Private Contact
    featured: true, // SPAN 2x2
  },
  {
    title: "Chat Ai",
    description: "Chating with ai.",
    tags: ["React", "UI/UX"],
    imageUrl: "/projects/payment.png",
    demoUrl: "https://chat.hyuu.tech",
    repoUrl: "https://github.com/slowlyh/chat-ai",
    featured: false,
  },
  {
    title: "Slowtik",
    description: "Web downloader video from tiktok..",
    tags: ["Next.js", "TypeScript"],
    imageUrl: "/projects/norvus.png",
    demoUrl: "https://slowtik.vercel.app",
    repoUrl: "https://github.com/slowlyh/Slowtik", // Private Contact
    featured: false,
    }
  ],
  experience: [
    {
      company: "University Tech Lab",
      role: "Full Stack Developer Intern",
      period: "2023 - Present",
      description: [
        "Developed and maintained web applications using Next.js and React",
        "Implemented AI-powered features to enhance user experience",
        "Collaborated with cross-functional teams to deliver projects on time"
      ]
    },
    {
      company: "Open Source Contributions",
      role: "Active Contributor",
      period: "2022 - Present",
      description: [
        "Contributed to various open source projects on GitHub",
        "Developed automation tools and scripts for the community",
        "Maintained and documented several popular repositories"
      ]
    }
  ]
};