// src/constants/skills.ts

export type SkillCategory = 'frontend' | 'backend' | 'blockchain' | 'design' | 'content'

export interface SkillOption {
  value: string
  label: string
}

export interface SkillsByCategory extends Record<SkillCategory, SkillOption[]> {}

export const SKILLS_BY_CATEGORY: SkillsByCategory = {
  frontend: [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "nextjs", label: "Next.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "html", label: "HTML5" },
    { value: "css", label: "CSS3" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "sass", label: "Sass/SCSS" },
    { value: "mui", label: "Material UI" }
  ],
  backend: [
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "golang", label: "Go" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "mysql", label: "MySQL" },
    { value: "redis", label: "Redis" },
    { value: "docker", label: "Docker" }
  ],
  blockchain: [
    { value: "solidity", label: "Solidity" },
    { value: "rust", label: "Rust" },
    { value: "ralph", label: "Ralph" },
    { value: "web3js", label: "Web3.js" },
    { value: "ethersjs", label: "Ethers.js" },
    { value: "hardhat", label: "Hardhat" },
    { value: "truffle", label: "Truffle" },
    { value: "defi", label: "DeFi Development" },
    { value: "nft", label: "NFT Development" },
    { value: "smartcontracts", label: "Smart Contracts" },
    { value: "ipfs", label: "IPFS" }
  ],
  design: [
    { value: "figma", label: "Figma" },
    { value: "sketch", label: "Sketch" },
    { value: "adobe_xd", label: "Adobe XD" },
    { value: "photoshop", label: "Photoshop" },
    { value: "illustrator", label: "Illustrator" },
    { value: "ui_design", label: "UI Design" },
    { value: "ux_design", label: "UX Design" },
    { value: "motion", label: "Motion Design" },
    { value: "3d", label: "3D Design" }
  ],
  content: [
    { value: "writing", label: "Content Writing" },
    { value: "editing", label: "Content Editing" },
    { value: "seo", label: "SEO Writing" },
    { value: "technical", label: "Technical Writing" },
    { value: "copywriting", label: "Copywriting" },
    { value: "social", label: "Social Media" },
    { value: "research", label: "Research" },
    { value: "storytelling", label: "Storytelling" }
  ]
}

// Helper functions
export const getAllSkills = (): SkillOption[] => {
  return Object.values(SKILLS_BY_CATEGORY).flat() as SkillOption[]
}

export const getSkillsByCategory = (category: SkillCategory): SkillOption[] => {
  return SKILLS_BY_CATEGORY[category] || []
}

export const getSkillLabel = (value: string): string => {
  const skill = getAllSkills().find(skill => skill.value === value)
  return skill?.label || value
}

export default SKILLS_BY_CATEGORY