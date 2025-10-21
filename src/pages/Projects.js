import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projects = await getProjects();
      setProjects(projects);
    } catch (err) {
      setError('Failed to load projects: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await deleteProject(projectId);
      setProjects(projects.filter(p => p._id !== projectId));
      if (selectedProject && selectedProject._id === projectId) {
        setSelectedProject(null);
      }
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOperationIcon = (operation) => {
    switch (operation) {
      case 'add':
      case 'subtract':
      case 'multiply':
        return '🧮';
      case 'transpose':
        return '↻';
      case 'determinant':
        return '📏';
      case 'inverse':
        return '🔄';
      case 'eigenvalues':
        return '🔢';
      case 'svd':
        return '📊';
      case 'visualization':
        return '🎯';
      default:
        return '📁';
    }
  };

  const getOperationName = (operation) => {
    switch (operation) {
      case 'add': return 'Matrix Addition';
      case 'subtract': return 'Matrix Subtraction';
      case 'multiply': return 'Matrix Multiplication';
      case 'transpose': return 'Matrix Transpose';
      case 'determinant': return 'Determinant';
      case 'inverse': return 'Matrix Inverse';
      case 'eigenvalues': return 'Eigenvalues & Eigenvectors';
      case 'svd': return 'SVD Decomposition';
      case 'visualization': return '2D Visualization';
      default: return operation;
    }
  };

  if (isLoading) {
    return (
      <div className="projects">
        <div className="container">
          <div className="loading">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects">
      <div className="container">
        <h1>Projects</h1>
        <p className="page-description">
          Manage your saved matrix computations and visualizations. 
          View, load, or delete your projects here.
        </p>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>No Projects Yet</h3>
            <p>Start by creating some matrix computations or visualizations, then save them as projects.</p>
            <div className="empty-actions">
              <a href="/matrix-operations" className="btn btn-primary">
                Try Matrix Operations
              </a>
              <a href="/visualizer-2d" className="btn btn-outline">
                Try 2D Visualizer
              </a>
            </div>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div 
                key={project._id} 
                className={`project-card ${selectedProject?._id === project._id ? 'selected' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-header">
                  <div className="project-icon">
                    {getOperationIcon(project.operation)}
                  </div>
                  <div className="project-title">
                    <h3>{project.name}</h3>
                    <span className="project-operation">
                      {getOperationName(project.operation)}
                    </span>
                  </div>
                </div>

                <div className="project-meta">
                  <div className="project-date">
                    Created: {formatDate(project.createdAt)}
                  </div>
                  {project.updatedAt !== project.createdAt && (
                    <div className="project-date">
                      Updated: {formatDate(project.updatedAt)}
                    </div>
                  )}
                </div>

                <div className="project-actions">
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProject && (
          <div className="project-details">
            <h3>Project Details</h3>
            <div className="details-content">
              <div className="detail-section">
                <h4>Matrix Data</h4>
                <pre className="matrix-display">
                  {JSON.stringify(selectedProject.matrixData, null, 2)}
                </pre>
              </div>
              
              <div className="detail-section">
                <h4>Result</h4>
                <pre className="result-display">
                  {JSON.stringify(selectedProject.result, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
