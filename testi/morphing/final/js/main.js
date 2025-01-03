function getBlobSize() {
    // Calculate the available width for each column
    const availableWidth = window.innerWidth - 32; // account for container padding
    const columnWidth = availableWidth / 3;
    const height = Math.max(400, window.innerHeight * 0.6);
    return { width: columnWidth, height };
}

function initializeBlobs() {
    const size = getBlobSize();
    
    // Update wrapper heights to match content
    document.querySelectorAll('.blob-wrapper').forEach(wrapper => {
        wrapper.style.height = `${size.height}px`;
    });
    
    const commonConfig = {
        size: size,
        amplitude: 0.25,     // Increased amplitude for bigger morphing
        frequency: 0.4,
        density: 2.5,
        strength: 0.2,      // Increased strength for more pronounced effect
        radius: 2.0,        // Much larger radius to ensure blob extends beyond container
        detail: 4
    };
    
    const blob1 = new MorphingBlob('blob1', {
        ...commonConfig,
        color: new THREE.Color(0.2, 0.8, 0.5)  // Green tint
    });

    const blob2 = new MorphingBlob('blob2', {
        ...commonConfig,
        color: new THREE.Color(0.5, 0.3, 0.8)  // Purple tint
    });

    const blob3 = new MorphingBlob('blob3', {
        ...commonConfig,
        color: new THREE.Color(0.8, 0.4, 0.5)  // Pink tint
    });
}

// Make elements visible with a delay
function makeVisible() {
    document.querySelectorAll('.column').forEach((column, index) => {
        setTimeout(() => {
            column.classList.add('visible');
            column.querySelector('.blob-container').classList.add('visible');
            column.querySelector('.text-content').classList.add('visible');
        }, index * 200);
    });
}

// Initialize and make visible when page loads
window.addEventListener('load', () => {
    // Small delay to ensure content is properly laid out
    setTimeout(() => {
        initializeBlobs();
        makeVisible();
    }, 100);
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const size = getBlobSize();
        document.querySelectorAll('.blob-wrapper').forEach(wrapper => {
            wrapper.style.height = `${size.height}px`;
        });
    }, 100);
});
