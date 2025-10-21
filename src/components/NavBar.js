import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/matrix-operations', label: 'Matrix Operations' },
    { path: '/eigenvalues', label: 'Eigenvalues & Eigenvectors' },
    { path: '/svd-demo', label: 'SVD Demo' },
    { path: '/visualizer-2d', label: '2D Visualizer' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Linear Algebra Studio
        </Link>
        
        <button 
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
