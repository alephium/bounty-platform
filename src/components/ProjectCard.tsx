import { Project } from '../types/supabase'
import { Link } from 'react-router-dom'
import React from 'react'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-medium">{project.title}</h3>
        <p className="mt-2 text-gray-600">{project.description}</p>
      </div>
    </Link>
  )
}

export default ProjectCard