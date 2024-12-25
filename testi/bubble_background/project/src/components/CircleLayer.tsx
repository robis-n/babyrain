import React, { useEffect, useState } from 'react';
import { generateRandomCircles } from '../utils/circle-generator';

interface CircleLayerProps {
  count: number;
  minSize: number;
  maxSize: number;
  duration: number;
  className?: string;
}

export function CircleLayer({ count, minSize, maxSize, duration, className = '' }: CircleLayerProps) {
  const [circles, setCircles] = useState<ReturnType<typeof generateRandomCircles>>([]);

  useEffect(() => {
    setCircles(generateRandomCircles(count, minSize, maxSize));
  }, [count, minSize, maxSize]);

  return (
    <div className={`circle-layer ${className}`}>
      {circles.map((circle, index) => (
        <div
          key={index}
          className="circle"
          style={{
            left: `${circle.x}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            opacity: circle.opacity,
            backgroundColor: circle.color,
            animationDuration: `${duration * circle.speed}s`,
            animationDelay: `${circle.delay}s`
          }}
        />
      ))}
    </div>
  );
}