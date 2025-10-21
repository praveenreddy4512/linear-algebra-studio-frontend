import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result, operation, isLoading, error }) => {
  const formatMatrix = (matrix) => {
    if (!matrix || !Array.isArray(matrix)) return 'Invalid matrix';
    
    return matrix.map((row, index) => (
      <div key={index} className="matrix-row">
        {row.map((cell, cellIndex) => (
          <span key={cellIndex} className="matrix-cell">
            {typeof cell === 'number' ? cell.toFixed(3) : cell}
          </span>
        ))}
      </div>
    ));
  };

  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toFixed(6);
    }
    return num;
  };

  const renderResult = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Computing SVD Decomposition...</div>
          <div className="loading-subtext">Breaking down the matrix into U, Σ, and V components</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <div className="error-icon">⚠️</div>
          <div className="error-message">{error}</div>
          <div className="error-help">Please check your input and try again</div>
        </div>
      );
    }

    if (!result) {
      return null;
    }

    // Handle different result types
    if (operation === 'eigenvalues') {
      return (
        <div className="eigen-result">
          <div className="result-section">
            <h4>Eigenvalues:</h4>
            <div className="eigenvalues">
              {result.eigenvalues.map((val, index) => (
                <div key={index} className="eigenvalue">
                  λ{index + 1} = {formatNumber(val)}
                </div>
              ))}
            </div>
          </div>
          <div className="result-section">
            <h4>Eigenvectors:</h4>
            <div className="eigenvectors">
              {result.eigenvectors.map((vec, index) => (
                <div key={index} className="eigenvector">
                  <div className="eigenvector-label">v{index + 1}:</div>
                  <div className="eigenvector-matrix">
                    {formatMatrix([vec])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (operation === 'svd') {
      return (
        <div className="svd-result">
          <div className="result-section">
            <h4>U Matrix:</h4>
            <div className="matrix-display">
              {formatMatrix(result.U)}
            </div>
          </div>
          <div className="result-section">
            <h4>Σ (Singular Values):</h4>
            <div className="singular-values">
              {result.S.map((val, index) => (
                <span key={index} className="singular-value">
                  σ{index + 1} = {formatNumber(val)}
                </span>
              ))}
            </div>
          </div>
          <div className="result-section">
            <h4>V Matrix:</h4>
            <div className="matrix-display">
              {formatMatrix(result.V)}
            </div>
          </div>
        </div>
      );
    }

    // Default matrix result
    if (Array.isArray(result)) {
      return (
        <div className="matrix-result">
          <div className="matrix-display">
            {formatMatrix(result)}
          </div>
        </div>
      );
    }

    // Single number result
    return (
      <div className="number-result">
        <span className="result-value">{formatNumber(result)}</span>
      </div>
    );
  };

  return (
    <div className="result-display">
      {renderResult()}
    </div>
  );
};

export default ResultDisplay;
