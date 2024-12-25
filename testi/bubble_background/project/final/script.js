function createCircles() {
    const container = document.getElementById('circleContainer');
    const smallCirclesCount = 50;
    const mediumCirclesCount = 30;

    function addCircles(count, minSize, maxSize, duration, className) {
        for (let i = 0; i < count; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle', className);

            const size = Math.random() * (maxSize - minSize) + minSize;
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;

            const x = Math.random() * 100;
            const y = Math.random() * 100;
            circle.style.left = `${x}%`;
            circle.style.top = `${y}%`;

            circle.style.animationDuration = `${duration}s`;
            circle.style.animationDelay = `${Math.random() * duration}s`;

            container.appendChild(circle);
        }
    }

    addCircles(smallCirclesCount, 2, 3, 15, 'circle-small');
    addCircles(mediumCirclesCount, 3, 4, 20, 'circle-medium');
}

document.addEventListener('DOMContentLoaded', createCircles);
