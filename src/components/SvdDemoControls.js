import React, { useState, useEffect } from 'react';
import './SvdDemoControls.css';

const SvdDemoControls = ({ matrix, onMatrixChange, onAnimate }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  const handleMatrixChange = (newMatrix) => {
    onMatrixChange(newMatrix);
    setAnimationStep(0);
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    const steps = ['original', 'rotation', 'scaling', 'final'];
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setAnimationStep(currentStep);
      if (onAnimate) onAnimate(currentStep);
      
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setAnimationStep(0);
        if (onAnimate) onAnimate(0);
      }
    }, animationSpeed);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setAnimationStep(0);
  };

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(false);
    if (onAnimate) onAnimate(0);
  };

  const getAnimationStepName = () => {
    const steps = ['Original Matrix', 'U Rotation', 'Σ Scaling', 'Vᵀ Rotation', 'Final Transform'];
    return steps[animationStep] || 'Original Matrix';
  };

  return (
    <div className="svd-demo-controls">
      <div className="controls-header">
        <h3>SVD Animation Controls</h3>
        <div className="animation-status">
          <span className={`status-indicator ${isAnimating ? 'animating' : 'stopped'}`}>
            {isAnimating ? 'Animating' : 'Stopped'}
          </span>
          <span className="current-step">{getAnimationStepName()}</span>
        </div>
      </div>

      <div className="controls-body">
        <div className="control-group">
          <label>Animation Speed (ms):</label>
          <input
            type="range"
            min="500"
            max="3000"
            step="250"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            disabled={isAnimating}
          />
          <span className="speed-display">{animationSpeed}ms</span>
        </div>

        <div className="control-buttons">
          <button
            className="btn btn-primary"
            onClick={startAnimation}
            disabled={isAnimating}
          >
            Start Animation
          </button>
          <button
            className="btn btn-secondary"
            onClick={stopAnimation}
            disabled={!isAnimating}
          >
            Stop
          </button>
          <button
            className="btn btn-outline"
            onClick={resetAnimation}
          >
            Reset
          </button>
        </div>

        <div className="step-controls">
          <button
            className="btn btn-sm"
            onClick={() => {
              const next = Math.max(0, animationStep - 1);
              setAnimationStep(next);
              if (onAnimate) onAnimate(next);
            }}
            disabled={isAnimating}
          >
            ← Previous
          </button>
          <button
            className="btn btn-sm"
            onClick={() => {
              const next = Math.min(4, animationStep + 1);
              setAnimationStep(next);
              if (onAnimate) onAnimate(next);
            }}
            disabled={isAnimating}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="animation-explanation">
        <h4>Animation Steps:</h4>
        <ol>
          <li><strong>Original Matrix:</strong> The input 2×2 matrix</li>
          <li><strong>U Rotation:</strong> First rotation matrix from SVD</li>
          <li><strong>Σ Scaling:</strong> Scaling along principal axes</li>
          <li><strong>Vᵀ Rotation:</strong> Second rotation matrix</li>
          <li><strong>Final Transform:</strong> Complete transformation</li>
        </ol>
      </div>
    </div>
  );
};

export default SvdDemoControls;
