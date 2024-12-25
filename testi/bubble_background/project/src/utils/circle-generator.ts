interface Circle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
  color: string;
}

export function generateRandomCircles(count: number, minSize: number, maxSize: number): Circle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + Math.random() * 20, // Start slightly below viewport
    size: Math.random() * (maxSize - minSize) + minSize,
    opacity: Math.random() * 0.5 + 0.5,
    speed: Math.random() * 1.5 + 0.5,
    delay: Math.random() * -40, // Random start time
    color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
  }));
}

export function generateBoxShadow(circles: Circle[]): string {
  return circles
    .map(circle => `${circle.x}px ${circle.y}px ${circle.size}px ${circle.color}`)
    .join(',');
}

export function generateAnimationStyles(circles: Circle[]): string {
  return circles
    .map((circle, index) => 
      `.circle-${index} {
        left: ${circle.x}px;
        animation: float ${circle.speed * 20}s linear ${circle.delay}s infinite;
      }`
    )
    .join('\n');
}