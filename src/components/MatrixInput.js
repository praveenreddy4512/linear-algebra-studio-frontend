import React from 'react';
import './MatrixInput.css';

const MatrixInput = ({ matrix, onChange, size = 2, label = "Matrix" }) => {
  const handleChange = (row, col, value) => {
    const newMatrix = matrix.map((rowArray, rowIndex) => 
      rowIndex === row 
        ? rowArray.map((cell, colIndex) => 
            colIndex === col ? parseFloat(value) || 0 : cell
          )
        : rowArray
    );
    onChange(newMatrix);
  };

  const renderMatrix = () => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      const cols = [];
      for (let j = 0; j < size; j++) {
        cols.push(
          <input
            key={`${i}-${j}`}
            type="number"
            step="any"
            className="matrix-input"
            value={matrix[i] && matrix[i][j] !== undefined ? matrix[i][j] : ''}
            onChange={(e) => handleChange(i, j, e.target.value)}
            placeholder="0"
          />
        );
      }
      rows.push(
        <div key={i} className="matrix-row">
          {cols}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="matrix-input-container">
      <label className="matrix-label">{label}</label>
      <div className="matrix-wrapper">
        <div className="matrix-bracket-left">[</div>
        <div className="matrix-content">
          {renderMatrix()}
        </div>
        <div className="matrix-bracket-right">]</div>
      </div>
    </div>
  );
};

export default MatrixInput;
