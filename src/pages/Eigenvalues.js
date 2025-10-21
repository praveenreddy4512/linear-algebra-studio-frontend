import React, { useState } from 'react';
import MatrixInput from '../components/MatrixInput';
import ResultDisplay from '../components/ResultDisplay';
import { computeMatrix, saveProject } from '../services/api';
import './Eigenvalues.css';

const Eigenvalues = () => {
  const [matrixSize, setMatrixSize] = useState(2);
  const [matrix, setMatrix] = useState([[1, 0], [0, 1]]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeMatrix = (size) => {
    const newMatrix = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i === j ? 1 : 0); // Identity matrix as default
      }
      newMatrix.push(row);
    }
    return newMatrix;
  };

  const handleSizeChange = (newSize) => {
    setMatrixSize(newSize);
    setMatrix(initializeMatrix(newSize));
    setResult(null);
    setError(null);
  };

  const handleCompute = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await computeMatrix('eigenvalues', { matrix });
      setResult(data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while computing eigenvalues');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!result) return;

    try {
      const projectData = {
        name: `Eigenvalues Analysis - ${matrixSize}×${matrixSize}`,
        matrixData: { matrix },
        operation: 'eigenvalues',
        result
      };

      await saveProject(projectData);
      alert('Project saved successfully!');
    } catch (err) {
      alert('Failed to save project: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const getStepByStepExplanation = () => {
    if (!result || !result.eigenvalues) return null;

    const eigenvalues = result.eigenvalues;
    const eigenvectors = result.eigenvectors;

    return (
      <div className="step-by-step">
        <h3>Step-by-Step Explanation</h3>
        <div className="steps">
          <div className="step">
            <h4>Step 1: Characteristic Equation</h4>
            <p>To find eigenvalues, we solve det(A - λI) = 0</p>
            <div className="equation">
              det(A - λI) = 0
            </div>
          </div>

          <div className="step">
            <h4>Step 2: Eigenvalues</h4>
            <p>The eigenvalues are the roots of the characteristic equation:</p>
            <div className="eigenvalues-list">
              {eigenvalues.map((val, index) => (
                <div key={index} className="eigenvalue-item">
                  λ{index + 1} = {typeof val === 'number' ? val.toFixed(6) : val}
                </div>
              ))}
            </div>
          </div>

          <div className="step">
            <h4>Step 3: Eigenvectors</h4>
            <p>For each eigenvalue λᵢ, solve (A - λᵢI)v = 0:</p>
            <div className="eigenvectors-list">
              {eigenvectors.map((vec, index) => (
                <div key={index} className="eigenvector-item">
                  <div className="eigenvector-label">v{index + 1} =</div>
                  <div className="eigenvector-matrix">
                    {Array.isArray(vec) ? (
                      <div className="vector-display">
                        {vec.map((component, compIndex) => (
                          <div key={compIndex} className="vector-component">
                            {typeof component === 'number' ? component.toFixed(6) : component}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span>{vec}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="step">
            <h4>Step 4: Verification</h4>
            <p>Verify that Av = λv for each eigenvalue-eigenvector pair:</p>
            <div className="verification">
              {eigenvalues.map((eigenvalue, index) => (
                <div key={index} className="verification-item">
                  Av{index + 1} = λ{index + 1}v{index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="eigenvalues">
      <div className="container">
        <h1>Eigenvalues & Eigenvectors</h1>
        <p className="page-description">
          Compute eigenvalues and eigenvectors for 2×2 or 3×3 matrices. 
          Eigenvalues are scalars that satisfy the equation Av = λv, where A is the matrix, 
          v is the eigenvector, and λ is the eigenvalue.
        </p>

        <div className="controls-section">
          <div className="control-group">
            <label>Matrix Size:</label>
            <select 
              value={matrixSize} 
              onChange={(e) => handleSizeChange(parseInt(e.target.value))}
              className="form-control"
            >
              <option value={2}>2×2</option>
              <option value={3}>3×3</option>
            </select>
          </div>
        </div>

        <div className="matrix-section">
          <MatrixInput
            matrix={matrix}
            onChange={setMatrix}
            size={matrixSize}
            label="Matrix A"
          />
        </div>

        <div className="compute-section">
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleCompute}
            disabled={isLoading}
          >
            {isLoading ? 'Computing...' : 'Compute Eigenvalues & Eigenvectors'}
          </button>
          
          {result && (
            <button 
              className="btn btn-success"
              onClick={handleSaveProject}
            >
              Save Project
            </button>
          )}
        </div>

        <ResultDisplay
          result={result}
          operation="eigenvalues"
          isLoading={isLoading}
          error={error}
        />

        {getStepByStepExplanation()}

        <div className="theory-section">
          <h3>Theory</h3>
          <div className="theory-content">
            <div className="theory-item">
              <h4>What are Eigenvalues?</h4>
              <p>
                Eigenvalues are special scalars associated with a matrix. For a matrix A, 
                an eigenvalue λ is a scalar such that there exists a non-zero vector v 
                (called an eigenvector) where Av = λv.
              </p>
            </div>
            
            <div className="theory-item">
              <h4>What are Eigenvectors?</h4>
              <p>
                Eigenvectors are non-zero vectors that, when multiplied by the matrix, 
                result in a scalar multiple of themselves. They represent directions 
                that are preserved under the linear transformation.
              </p>
            </div>
            
            <div className="theory-item">
              <h4>Applications</h4>
              <p>
                Eigenvalues and eigenvectors are fundamental in many areas including:
                stability analysis, principal component analysis (PCA), quantum mechanics, 
                and solving systems of differential equations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eigenvalues;
