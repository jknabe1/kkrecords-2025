"use client"

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('rgb(191, 161, 64)');
  const [targetColor, setTargetColor] = useState('rgb(191, 161, 64)');

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const colors = ['rgb(191, 161, 64)', 'rgb(64, 191, 191)', 'rgb(191, 64, 64)'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setTargetColor(randomColor);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const interpolateColor = (color1: string, color2: string, factor: number) => {
      const result = color1.slice(4, -1).split(',').map((c, i) => {
        const c1 = parseInt(c.trim());
        const c2 = parseInt(color2.slice(4, -1).split(',')[i].trim());
        return Math.round(c1 + (c2 - c1) * factor);
      });
      return `rgb(${result.join(', ')})`;
    };

    const animateColor = () => {
      setColor((prevColor) => {
        const newColor = interpolateColor(prevColor, targetColor, 0.03); // Reduced factor for smoother transition
        return newColor;
      });
      animationFrameId = requestAnimationFrame(animateColor);
    };

    animationFrameId = requestAnimationFrame(animateColor);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetColor]);

  return (
    <div>
      <svg
        height="500"
        width="500"
        className="fixed -z-1 cursor"
        style={{
          transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
          opacity: 0.4,
        }}
      >
        <circle
          cx="250"
          cy="250"
          r="250"
          fill={color}
        ></circle>
      </svg>
    </div>
  );
};

export default CustomCursor;