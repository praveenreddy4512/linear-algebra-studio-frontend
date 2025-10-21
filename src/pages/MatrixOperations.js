import React, { useState } from 'react';
import MatrixInput from '../components/MatrixInput';
import ResultDisplay from '../components/ResultDisplay';
import { computeMatrix, saveProject } from '../services/api';
import './MatrixOperations.css';

const MatrixOperations = () => {
  const [matrixSize, setMatrixSize] = useState(2);
  const [matrixA, setMatrixA] = useState([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState([[0, 0], [0, 0]]);
  const [matrix, setMatrix] = useState([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeMatrix = (size) => {
    const newMatrix = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(0);
      }
      newMatrix.push(row);
    }
    return newMatrix;
  };

  const handleSizeChange = (newSize) => {
    setMatrixSize(newSize);
    setMatrixA(initializeMatrix(newSize));
    setMatrixB(initializeMatrix(newSize));
    setMatrix(initializeMatrix(newSize));
    setResult(null);
    setError(null);
  };

  const handleCompute = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestData = {
        operation,
        matrixA: operation === 'transpose' || operation === 'determinant' || operation === 'inverse' ? undefined : matrixA,
        matrixB: operation === 'transpose' || operation === 'determinant' || operation === 'inverse' ? undefined : matrixB,
        matrix: operation === 'transpose' || operation === 'determinant' || operation === 'inverse' ? matrix : undefined
      };

      const data = await computeMatrix(operation, requestData);
      setResult(data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while computing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!result) return;

    try {
      const projectData = {
        name: `${operation.charAt(0).toUpperCase() + operation.slice(1)} Operation`,
        matrixData: operation === 'transpose' || operation === 'determinant' || operation === 'inverse' 
          ? { matrix } 
          : { matrixA, matrixB },
        operation,
        result
      };

      await saveProject(projectData);
      alert('Project saved successfully!');
    } catch (err) {
      alert('Failed to save project: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const operations = [
    { value: 'add', label: 'Addition (A + B)', requiresTwoMatrices: true },
    { value: 'subtract', label: 'Subtraction (A - B)', requiresTwoMatrices: true },
    { value: 'multiply', label: 'Multiplication (A × B)', requiresTwoMatrices: true },
    { value: 'transpose', label: 'Transpose (Aᵀ)', requiresTwoMatrices: false },
    { value: 'determinant', label: 'Determinant (det A)', requiresTwoMatrices: false },
    { value: 'inverse', label: 'Inverse (A⁻¹)', requiresTwoMatrices: false }
  ];

  const selectedOperation = operations.find(op => op.value === operation);

  return (
    <div className="matrix-operations">
      <div className="container">
        <h1>Matrix Operations</h1>
        <p className="page-description">
          Perform various matrix operations on 2×2 or 3×3 matrices. 
          Choose your operation and input the matrix values below.
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

          <div className="control-group">
            <label>Operation:</label>
            <select 
              value={operation} 
              onChange={(e) => setOperation(e.target.value)}
              className="form-control"
            >
              {operations.map(op => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="matrices-section">
          {selectedOperation.requiresTwoMatrices ? (
            <div className="matrices-container">
              <MatrixInput
                matrix={matrixA}
                onChange={setMatrixA}
                size={matrixSize}
                label="Matrix A"
              />
              <div className="operation-symbol">
                {operation === 'add' && '+'}
                {operation === 'subtract' && '−'}
                {operation === 'multiply' && '×'}
              </div>
              <MatrixInput
                matrix={matrixB}
                onChange={setMatrixB}
                size={matrixSize}
                label="Matrix B"
              />
            </div>
          ) : (
            <div className="single-matrix-container">
              <MatrixInput
                matrix={matrix}
                onChange={setMatrix}
                size={matrixSize}
                label="Matrix A"
              />
            </div>
          )}
        </div>

        <div className="compute-section">
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleCompute}
            disabled={isLoading}
          >
            {isLoading ? 'Computing...' : 'Compute'}
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
          operation={operation}
          isLoading={isLoading}
          error={error}
        />

        <div className="help-section">
          <h3>Operation Descriptions</h3>
          <div className="help-grid">
            <div className="help-item">
              <strong>Addition (A + B):</strong> Element-wise addition of two matrices.
            </div>
            <div className="help-item">
              <strong>Subtraction (A - B):</strong> Element-wise subtraction of two matrices.
            </div>
            <div className="help-item">
              <strong>Multiplication (A × B):</strong> Matrix multiplication (not element-wise).
            </div>
            <div className="help-item">
              <strong>Transpose (Aᵀ):</strong> Flips matrix over its diagonal.
            </div>
            <div className="help-item">
              <strong>Determinant (det A):</strong> Scalar value computed from matrix elements.
            </div>
            <div className="help-item">
              <strong>Inverse (A⁻¹):</strong> Matrix that when multiplied by A gives identity matrix.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixOperations;
