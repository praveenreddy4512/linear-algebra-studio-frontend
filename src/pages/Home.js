import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Linear Algebra Studio</h1>
        <p className="hero-subtitle">
          Interactive linear algebra computations and visualizations
        </p>
        <div className="hero-buttons">
          <Link to="/matrix-operations" className="btn btn-primary btn-lg">
            Start Computing
          </Link>
          <Link to="/visualizer-2d" className="btn btn-outline btn-lg">
            Try Visualizer
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧮</div>
            <h3>Matrix Operations</h3>
            <p>Perform addition, subtraction, multiplication, transpose, determinant, and inverse operations on 2×2 and 3×3 matrices.</p>
            <Link to="/matrix-operations" className="feature-link">Try it →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔢</div>
            <h3>Eigenvalues & Eigenvectors</h3>
            <p>Compute eigenvalues and eigenvectors for matrices with step-by-step explanations and visual representations.</p>
            <Link to="/eigenvalues" className="feature-link">Explore →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>SVD Demo</h3>
            <p>Visualize Singular Value Decomposition with animated transformations showing rotation, scaling, and final transform.</p>
            <Link to="/svd-demo" className="feature-link">Watch →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>2D Visualizer</h3>
            <p>Interactive coordinate grid with basis vectors, unit square transformations, and eigenvector highlighting.</p>
            <Link to="/visualizer-2d" className="feature-link">Visualize →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Project Management</h3>
            <p>Save, load, and manage your matrix computations and visualizations in organized projects.</p>
            <Link to="/projects" className="feature-link">Manage →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Fully responsive design that works seamlessly on desktop, tablet, and mobile devices.</p>
            <Link to="/about" className="feature-link">Learn more →</Link>
          </div>
        </div>
      </div>

      <div className="getting-started">
        <h2>Getting Started</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Choose Your Tool</h3>
              <p>Select from Matrix Operations, Eigenvalues, SVD Demo, or 2D Visualizer based on your needs.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Input Your Data</h3>
              <p>Enter your matrix values using the intuitive input interface with real-time validation.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Explore Results</h3>
              <p>View computed results, visualizations, and save your work to projects for later reference.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
