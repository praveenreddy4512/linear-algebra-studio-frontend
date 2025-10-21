import React, { useState } from 'react';
import MatrixInput from '../components/MatrixInput';
import Visualizer2D from '../components/Visualizer2D';
import { computeMatrix, saveProject } from '../services/api';
import './Visualizer2DPage.css';

const Visualizer2DPage = () => {
  const [matrix, setMatrix] = useState([[1, 0], [0, 1]]);
  const [showEigenvectors, setShowEigenvectors] = useState(true);
  const [eigenResult, setEigenResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMatrixChange = (newMatrix) => {
    setMatrix(newMatrix);
    setEigenResult(null);
    setError(null);
  };

  const handleComputeEigenvalues = async () => {
    setIsLoading(true);
    setError(null);
    setEigenResult(null);

    try {
      const data = await computeMatrix('eigenvalues', { matrix });
      setEigenResult(data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while computing eigenvalues');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!matrix) return;

    try {
      const projectData = {
        name: `2D Visualizer - ${matrix[0][0].toFixed(2)},${matrix[0][1].toFixed(2)},${matrix[1][0].toFixed(2)},${matrix[1][1].toFixed(2)}`,
        matrixData: { matrix },
        operation: 'visualization',
        result: { matrix, eigenResult }
      };

      await saveProject(projectData);
      alert('Project saved successfully!');
    } catch (err) {
      alert('Failed to save project: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const getEigenvalueInfo = () => {
    if (!eigenResult || !eigenResult.eigenvalues) return null;

    const eigenvalues = eigenResult.eigenvalues;
    const hasComplexEigenvalues = eigenvalues.some(val => 
      typeof val === 'object' && val !== null
    );

    return (
      <div className="eigenvalue-info">
        <h4>Eigenvalue Analysis</h4>
        <div className="eigenvalue-details">
          {eigenvalues.map((val, index) => (
            <div key={index} className="eigenvalue-item">
              <span className="eigenvalue-label">λ{index + 1}:</span>
              <span className="eigenvalue-value">
                {typeof val === 'number' ? val.toFixed(6) : val.toString()}
              </span>
            </div>
          ))}
        </div>
        
        {hasComplexEigenvalues && (
          <div className="complex-warning">
            <strong>Note:</strong> This matrix has complex eigenvalues. 
            The transformation involves rotation and scaling.
          </div>
        )}
        
        {!hasComplexEigenvalues && (
          <div className="real-eigenvalues">
            <strong>Real Eigenvalues:</strong> The transformation can be visualized 
            with real eigenvectors (shown in yellow on the grid).
          </div>
        )}
      </div>
    );
  };

  const getTransformationInfo = () => {
    const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    const trace = matrix[0][0] + matrix[1][1];
    
    return (
      <div className="transformation-info">
        <h4>Transformation Properties</h4>
        <div className="properties-grid">
          <div className="property">
            <span className="property-label">Determinant:</span>
            <span className="property-value">{det.toFixed(6)}</span>
          </div>
          <div className="property">
            <span className="property-label">Trace:</span>
            <span className="property-value">{trace.toFixed(6)}</span>
          </div>
          <div className="property">
            <span className="property-label">Area Scale:</span>
            <span className="property-value">{Math.abs(det).toFixed(6)}</span>
          </div>
          <div className="property">
            <span className="property-label">Orientation:</span>
            <span className="property-value">
              {det > 0 ? 'Preserved' : 'Reversed'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="visualizer-2d-page">
      <div className="container">
        <h1>2D Visualizer</h1>
        <p className="page-description">
          Interactive 2D linear transformation visualizer. Input a 2×2 matrix and watch 
          how it transforms the coordinate grid, basis vectors, and unit square. 
          Eigenvectors are highlighted when they exist.
        </p>

        <div className="controls-section">
          <div className="matrix-controls">
            <MatrixInput
              matrix={matrix}
              onChange={handleMatrixChange}
              size={2}
              label="Transformation Matrix"
            />
            {/* Fallback simple input for debugging */}
            <div style={{ marginTop: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '4px' }}>
              <h4>Matrix Input (Debug):</h4>
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input 
                    type="number" 
                    value={matrix[0][0]} 
                    onChange={(e) => handleMatrixChange([[parseFloat(e.target.value) || 0, matrix[0][1]], [matrix[1][0], matrix[1][1]]])}
                    style={{ width: '60px', padding: '5px' }}
                  />
                  <input 
                    type="number" 
                    value={matrix[0][1]} 
                    onChange={(e) => handleMatrixChange([[matrix[0][0], parseFloat(e.target.value) || 0], [matrix[1][0], matrix[1][1]]])}
                    style={{ width: '60px', padding: '5px' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input 
                    type="number" 
                    value={matrix[1][0]} 
                    onChange={(e) => handleMatrixChange([[matrix[0][0], matrix[0][1]], [parseFloat(e.target.value) || 0, matrix[1][1]]])}
                    style={{ width: '60px', padding: '5px' }}
                  />
                  <input 
                    type="number" 
                    value={matrix[1][1]} 
                    onChange={(e) => handleMatrixChange([[matrix[0][0], matrix[0][1]], [matrix[1][0], parseFloat(e.target.value) || 0]])}
                    style={{ width: '60px', padding: '5px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="visualization-controls">
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={showEigenvectors}
                  onChange={(e) => setShowEigenvectors(e.target.checked)}
                />
                Show Eigenvectors
              </label>
            </div>

            <div className="control-buttons">
              <button 
                className="btn btn-primary"
                onClick={handleComputeEigenvalues}
                disabled={isLoading}
              >
                {isLoading ? 'Computing...' : 'Compute Eigenvalues'}
              </button>
              
              <button 
                className="btn btn-success"
                onClick={handleSaveProject}
              >
                Save Visualization
              </button>
            </div>
          </div>
        </div>

        <div className="visualization-section">
          <div className="visualizer-container">
            <Visualizer2D 
              matrix={matrix} 
              showEigenvectors={showEigenvectors && eigenResult}
            />
          </div>
        </div>

        <div className="info-section">
          <div className="info-grid">
            {getTransformationInfo()}
            {getEigenvalueInfo()}
          </div>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="help-section">
          <h3>How to Use the Visualizer</h3>
          <div className="help-content">
            <div className="help-item">
              <h4>🎯 Understanding the Grid</h4>
              <p>
                The coordinate grid shows how your matrix transforms 2D space. 
                Blue vectors (î, ĵ) are the original basis vectors, 
                green vectors (î', ĵ') show the transformed basis.
              </p>
            </div>
            
            <div className="help-item">
              <h4>📐 Unit Square</h4>
              <p>
                The unit square (blue) transforms into a parallelogram (green). 
                This shows how areas are scaled and how shapes are distorted.
              </p>
            </div>
            
            <div className="help-item">
              <h4>⚡ Eigenvectors</h4>
              <p>
                Yellow vectors show eigenvectors (when real). These are directions 
                that are only scaled, not rotated, by the transformation.
              </p>
            </div>
            
            <div className="help-item">
              <h4>🔢 Matrix Properties</h4>
              <p>
                The determinant shows area scaling, trace shows the sum of diagonal elements, 
                and the orientation tells you if the transformation preserves or reverses orientation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer2DPage;
