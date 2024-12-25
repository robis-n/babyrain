function createCircles(container, count, minSize, maxSize, duration) {
    for (let i = 0; i < count; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        
        const size = Math.random() * (maxSize - minSize) + minSize;
        circle.style.width = `${size}rem`;
        circle.style.height = `${size}rem`;
        
        // Position circle randomly along the width
        circle.style.left = `${Math.random() * 100}%`;
        
        // Set random x-offset for floating animation
        const xOffset = (Math.random() - 0.5) * 20;
        circle.style.setProperty('--x-offset', `${xOffset}vw`);
        
        // Set random starting position along height with some offset
        const startPos = Math.random() * 20;
        circle.style.top = `${100 + startPos}vh`;
        
        // Randomize animation duration within a range
        const randomDuration = duration + (Math.random() - 0.5) * 10;
        circle.style.animationDuration = `${randomDuration}s`;
        
        // Add some delay to stagger the animations
        circle.style.animationDelay = `${Math.random() * -duration}s`;
        
        // Ensure circle is visible by setting a minimum opacity
        circle.style.opacity = `${Math.random() * (1 - 0.5) + 0.5}`;
        
        // Add a background color to the circle to make it visible
        circle.style.background = `hsl(${Math.random() * 360}, 50%, 50%)`;
        
        container.appendChild(circle);
    }
}

function initializeCircles() {
    const smallCircles = document.querySelector('.circle-layer-small');
    const mediumCircles = document.querySelector('.circle-layer-medium');
    const largeCircles = document.querySelector('.circle-layer-large');

    createCircles(smallCircles, 50, 1, 2, 20);
    createCircles(mediumCircles, 30, 2, 3, 25);
    createCircles(largeCircles, 15, 3, 4, 30);
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initializeCircles);

// Recreate circles periodically to ensure smooth continuous animation
setInterval(() => {
    const layers = document.querySelectorAll('.circle-layer-small, .circle-layer-medium, .circle-layer-large');
    layers.forEach(layer => {
        if (layer.children.length < 20) {  // Only add more if we're running low
            const size = layer.classList.contains('circle-layer-small') ? [1, 2, 20] :
                        layer.classList.contains('circle-layer-medium') ? [2, 3, 25] : [3, 4, 30];
            createCircles(layer, 5, size[0], size[1], size[2]);
        }
    });
}, 5000);
