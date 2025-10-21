import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import MatrixOperations from './pages/MatrixOperations';
import Eigenvalues from './pages/Eigenvalues';
import SvdDemo from './pages/SvdDemo';
import Visualizer2D from './pages/Visualizer2D';
import Projects from './pages/Projects';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matrix-operations" element={<MatrixOperations />} />
            <Route path="/eigenvalues" element={<Eigenvalues />} />
            <Route path="/svd-demo" element={<SvdDemo />} />
            <Route path="/visualizer-2d" element={<Visualizer2D />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;