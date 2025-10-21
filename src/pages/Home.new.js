import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Linear Algebra Studio</h1>
        <p className="hero-subtitle">
          Explore the power of linear algebra through interactive visualizations and computations.
          Perfect for students, educators, and professionals.
        </p>
        <div className="hero-buttons">
          <Link to="/matrix-operations" className="btn btn-primary btn-lg">
            <span className="btn-icon">🚀</span>
            Start Computing
          </Link>
          <Link to="/visualizer-2d" className="btn btn-outline btn-lg">
            <span className="btn-icon">🎯</span>
            Try Visualizer
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Interactive Tools</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧮</div>
            <h3>Matrix Operations</h3>
            <p>
              Master matrix calculations with our intuitive interface. Perform addition, 
              multiplication, find determinants, and compute inverses with instant results.
            </p>
            <Link to="/matrix-operations" className="feature-link">
              Try Matrix Operations 
              <span className="link-arrow">→</span>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Eigenvalue Analysis</h3>
            <p>
              Understand eigenvalues and eigenvectors through visual demonstrations. 
              See how they shape linear transformations in real-time.
            </p>
            <Link to="/eigenvalues" className="feature-link">
              Explore Eigenvalues 
              <span className="link-arrow">→</span>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>SVD Visualization</h3>
            <p>
              Watch Singular Value Decomposition in action. See how matrices transform
              space through rotations and scaling operations.
            </p>
            <Link to="/svd-demo" className="feature-link">
              View SVD Demo 
              <span className="link-arrow">→</span>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>2D Visualizer</h3>
            <p>
              Transform vectors and shapes in real-time. Perfect for understanding
              linear transformations and matrix operations visually.
            </p>
            <Link to="/visualizer-2d" className="feature-link">
              Open Visualizer 
              <span className="link-arrow">→</span>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Save Your Work</h3>
            <p>
              Create and manage projects to save your calculations and visualizations.
              Perfect for assignments and research work.
            </p>
            <Link to="/projects" className="feature-link">
              View Projects 
              <span className="link-arrow">→</span>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Learn Anywhere</h3>
            <p>
              Access all features on any device. Our responsive design ensures
              a seamless experience on desktop, tablet, and mobile.
            </p>
            <Link to="/about" className="feature-link">
              Learn More 
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="getting-started">
        <h2>Get Started in 3 Easy Steps</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Choose Your Tool</h3>
              <p>
                Pick from our suite of interactive tools - Matrix Operations,
                Eigenvalues, SVD Demo, or 2D Visualizer.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Input Your Data</h3>
              <p>
                Use our intuitive interface to enter matrices or vectors.
                Try preset examples or input your own values.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Explore & Learn</h3>
              <p>
                Watch transformations in real-time, analyze results,
                and save your work for future reference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;