import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <h1>Development Journey</h1>
        <p className="page-description">
          Discover how we built Linear Algebra Studio - a comprehensive web application 
          that transforms complex linear algebra concepts into interactive visualizations.
        </p>

        <div className="about-content">
          <div className="project-overview">
            <h2>Development Process</h2>
            <p>
              Linear Algebra Studio was developed through careful planning and iterative implementation. 
              We started with a vision to create an intuitive platform for learning linear algebra, 
              and gradually built each component while constantly refining the user experience through
              user feedback and testing.
            </p>
          </div>

          <div className="development-phases">
            <h2>Project Phases</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">🎨</div>
                <h3>Frontend Development</h3>
                <p>
                  Built with React.js for its component-based architecture and efficient rendering. 
                  We implemented custom hooks for state management, created reusable UI components, 
                  and optimized performance using React's best practices. The visualization components 
                  were carefully crafted to ensure smooth animations and intuitive interactions.
                </p>
              </div>

              <div className="feature">
                <div className="feature-icon">⚡</div>
                <h3>Backend Architecture</h3>
                <p>
                  Developed using Node.js and Express to handle complex mathematical computations. 
                  We implemented RESTful APIs for matrix operations, set up efficient data models using 
                  MongoDB, and ensured secure communication between frontend and backend using JWT 
                  authentication.
                </p>
              </div>

              <div className="feature">
                <div className="feature-icon">📊</div>
                <h3>Mathematical Engine</h3>
                <p>
                  Created a robust mathematical core using math.js and custom algorithms. 
                  We implemented specialized functions for eigenvalue calculation, SVD, and matrix 
                  transformations, focusing on both accuracy and performance optimization.
                </p>
              </div>
            </div>
          </div>

          <div className="tech-stack">
            <h2>Technical Implementation</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h3>Frontend Stack</h3>
                <p>
                  We chose React.js for its efficient DOM manipulation and component reusability. 
                  The UI is built with modern CSS features including Grid, Flexbox, and CSS Variables. 
                  SVG graphics power our visualizations, with D3.js for complex data transformations.
                </p>
              </div>
              <div className="tech-item">
                <h3>Backend Stack</h3>
                <p>
                  Our Express.js server handles API requests efficiently using async/await patterns. 
                  MongoDB stores user data and computation results, while Redis caches frequent 
                  calculations. The API follows RESTful principles with proper error handling.
                </p>
              </div>
              <div className="tech-item">
                <h3>Development Tools</h3>
                <p>
                  Version control is managed with Git using feature branches and pull requests. 
                  We use Jest and React Testing Library for unit tests, ESLint for code quality, 
                  and GitHub Actions for continuous integration.
                </p>
              </div>
            </div>
          </div>

          <div className="challenges">
            <h2>Development Challenges</h2>
            <p>
              Throughout the development process, we encountered and overcame several key challenges:
            </p>
            <ul>
              <li>
                Performance optimization for complex matrix calculations, solved by implementing 
                worker threads and efficient algorithms
              </li>
              <li>
                Creating intuitive visualizations for abstract concepts, achieved through 
                extensive user testing and iterative design
              </li>
              <li>
                Handling real-time updates without affecting performance, resolved using 
                WebSocket connections and optimized state management
              </li>
              <li>
                Ensuring mathematical precision across different browsers and devices, 
                addressed through comprehensive testing and validation
              </li>
              <li>
                Building responsive interfaces that maintain functionality on mobile devices, 
                solved with adaptive layouts and touch-friendly controls
              </li>
            </ul>
          </div>

          <div className="cta-buttons" style={{ marginTop: '40px', textAlign: 'center' }}>
            <a href="https://github.com/praveenreddy4512/linear-algebra-studio" className="btn btn-primary">
              View on GitHub
            </a>
            <a href="/docs/api" className="btn btn-outline">
              API Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;