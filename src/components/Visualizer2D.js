import React, { useEffect, useRef, useState } from 'react';
import './Visualizer2D.css';

const Visualizer2D = ({ matrix, showEigenvectors = true }) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const container = svgRef.current?.parentElement;
      const fallbackWidth = Math.min(window.innerWidth - 60, 800);
      const width = Math.max(320, (container?.offsetWidth || fallbackWidth) - 40);
      const height = 400; // fixed height for consistent layout
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (matrix && matrix.length === 2 && matrix[0].length === 2) {
      setAnimationStep(0);
      const timer = setTimeout(() => setAnimationStep(1), 100);
      return () => clearTimeout(timer);
    }
  }, [matrix]);

  const renderGrid = () => {
    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const gridSize = 20;
    const gridExtent = Math.min(width, height) / 2 - 20;

    const lines = [];
    
    // Vertical lines
    for (let i = -Math.floor(gridExtent / gridSize); i <= Math.floor(gridExtent / gridSize); i++) {
      const x = centerX + i * gridSize;
      if (x >= 0 && x <= width) {
        lines.push(
          <line
            key={`v-${i}`}
            x1={x}
            y1={centerY - gridExtent}
            x2={x}
            y2={centerY + gridExtent}
            stroke="#e0e0e0"
            strokeWidth={i === 0 ? 2 : 1}
          />
        );
      }
    }

    // Horizontal lines
    for (let i = -Math.floor(gridExtent / gridSize); i <= Math.floor(gridExtent / gridSize); i++) {
      const y = centerY + i * gridSize;
      if (y >= 0 && y <= height) {
        lines.push(
          <line
            key={`h-${i}`}
            x1={centerX - gridExtent}
            y1={y}
            x2={centerX + gridExtent}
            y2={y}
            stroke="#e0e0e0"
            strokeWidth={i === 0 ? 2 : 1}
          />
        );
      }
    }

    return lines;
  };

  const renderVectors = () => {
    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30;

    const vectors = [];

    // Original basis vectors
    vectors.push(
      <line
        key="i-original"
        x1={centerX}
        y1={centerY}
        x2={centerX + scale}
        y2={centerY}
        stroke="#007bff"
        strokeWidth="3"
        strokeLinecap="round"
        className="vector-i"
      />
    );
    vectors.push(
      <line
        key="j-original"
        x1={centerX}
        y1={centerY}
        x2={centerX}
        y2={centerY - scale}
        stroke="#dc3545"
        strokeWidth="3"
        strokeLinecap="round"
        className="vector-j"
      />
    );

    // Labels for original vectors
    vectors.push(
      <text
        key="i-label"
        x={centerX + scale + 5}
        y={centerY + 5}
        fontSize="12"
        fill="#007bff"
        fontWeight="bold"
      >
        î
      </text>
    );
    vectors.push(
      <text
        key="j-label"
        x={centerX + 5}
        y={centerY - scale - 5}
        fontSize="12"
        fill="#dc3545"
        fontWeight="bold"
      >
        ĵ
      </text>
    );

    // Transformed vectors if matrix is provided
    if (matrix && matrix.length === 2 && matrix[0].length === 2) {
      const transformedI = [matrix[0][0], matrix[1][0]];
      const transformedJ = [matrix[0][1], matrix[1][1]];

      vectors.push(
        <line
          key="i-transformed"
          x1={centerX}
          y1={centerY}
          x2={centerX + transformedI[0] * scale}
          y2={centerY - transformedI[1] * scale}
          stroke="#28a745"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5,5"
          className="vector-transformed"
        />
      );
      vectors.push(
        <line
          key="j-transformed"
          x1={centerX}
          y1={centerY}
          x2={centerX + transformedJ[0] * scale}
          y2={centerY - transformedJ[1] * scale}
          stroke="#28a745"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5,5"
          className="vector-transformed"
        />
      );

      // Labels for transformed vectors
      vectors.push(
        <text
          key="i-transformed-label"
          x={centerX + transformedI[0] * scale + 5}
          y={centerY - transformedI[1] * scale + 5}
          fontSize="12"
          fill="#28a745"
          fontWeight="bold"
        >
          î'
        </text>
      );
      vectors.push(
        <text
          key="j-transformed-label"
          x={centerX + transformedJ[0] * scale + 5}
          y={centerY - transformedJ[1] * scale + 5}
          fontSize="12"
          fill="#28a745"
          fontWeight="bold"
        >
          ĵ'
        </text>
      );
    }

    return vectors;
  };

  const renderUnitSquare = () => {
    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30;

    const squares = [];

    // Original unit square
    squares.push(
      <rect
        key="unit-square"
        x={centerX}
        y={centerY - scale}
        width={scale}
        height={scale}
        fill="rgba(0,123,255,0.1)"
        stroke="#007bff"
        strokeWidth="2"
        className="unit-square"
      />
    );

    // Transformed unit square if matrix is provided
    if (matrix && matrix.length === 2 && matrix[0].length === 2) {
      const transformedI = [matrix[0][0], matrix[1][0]];
      const transformedJ = [matrix[0][1], matrix[1][1]];

      // Calculate transformed square vertices
      const p1 = [centerX, centerY];
      const p2 = [centerX + transformedI[0] * scale, centerY - transformedI[1] * scale];
      const p3 = [centerX + transformedI[0] * scale + transformedJ[0] * scale, 
                  centerY - transformedI[1] * scale - transformedJ[1] * scale];
      const p4 = [centerX + transformedJ[0] * scale, centerY - transformedJ[1] * scale];

      squares.push(
        <polygon
          key="transformed-square"
          points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} ${p4[0]},${p4[1]}`}
          fill="rgba(40,167,69,0.1)"
          stroke="#28a745"
          strokeWidth="2"
          className="unit-square-transformed"
        />
      );
    }

    return squares;
  };

  const renderEigenvectors = () => {
    if (!showEigenvectors || !matrix || matrix.length !== 2 || matrix[0].length !== 2) {
      return null;
    }

    // Calculate eigenvalues and eigenvectors
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];

    const trace = a + d;
    const det = a * d - b * c;
    const discriminant = trace * trace - 4 * det;

    if (discriminant < 0) {
      return null; // Complex eigenvalues
    }

    const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
    const lambda2 = (trace - Math.sqrt(discriminant)) / 2;

    // Calculate eigenvectors
    const eigenvectors = [];
    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30;

    // For each eigenvalue, find a corresponding eigenvector
    [lambda1, lambda2].forEach((lambda, index) => {
      let vx, vy;
      if (Math.abs(b) > 1e-10) {
        vx = 1;
        vy = (lambda - a) / b;
      } else if (Math.abs(c) > 1e-10) {
        vy = 1;
        vx = (lambda - d) / c;
      } else {
        vx = 1;
        vy = 0;
      }

      // Normalize the vector
      const length = Math.sqrt(vx * vx + vy * vy);
      vx /= length;
      vy /= length;

      eigenvectors.push(
        <line
          key={`eigenvector-${index}`}
          x1={centerX}
          y1={centerY}
          x2={centerX + vx * scale * 2}
          y2={centerY - vy * scale * 2}
          stroke="#ffc107"
          strokeWidth="4"
          strokeLinecap="round"
          className="eigenvector"
        />
      );

      eigenvectors.push(
        <text
          key={`eigenvector-label-${index}`}
          x={centerX + vx * scale * 2 + 5}
          y={centerY - vy * scale * 2 + 5}
          fontSize="12"
          fill="#ffc107"
          fontWeight="bold"
        >
          λ{index + 1} = {lambda.toFixed(2)}
        </text>
      );
    });

    return eigenvectors;
  };

  return (
    <div className="visualizer-2d">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="coordinate-grid"
      >
        {renderGrid()}
        {renderUnitSquare()}
        {renderVectors()}
        {renderEigenvectors()}
      </svg>
    </div>
  );
};

export default Visualizer2D;
