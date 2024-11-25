// Debounce function to limit scroll event firing
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Use RequestAnimationFrame for smooth animations
let ticking = false;

// Initial check function
function checkScrollPosition() {
    const video = document.getElementById('bg-video');
    const title = document.querySelector('.title');
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    // Calculate threshold at 100vh
    const threshold = viewportHeight;
    
    if (scrollY > threshold) {
        video.style.visibility = 'hidden';
        video.style.opacity = '0';
        video.pause();
        title.style.opacity = '0';
        title.style.visibility = 'hidden';
    } else {
        video.style.visibility = 'visible';
        video.play();
        const scrollPercent = scrollY / threshold;
        const opacity = Math.max(0.1, 0.8 - scrollPercent * 1.4);
        video.style.opacity = opacity;
        
        title.style.opacity = Math.max(0, 1 - (scrollY / (viewportHeight * 0.5)));
        title.style.visibility = 'visible';
    }
}

// Run check immediately when page loads
document.addEventListener('DOMContentLoaded', checkScrollPosition);
// Also check on page reload
window.onload = checkScrollPosition;

// Rest of your scroll event code...
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            checkScrollPosition(); // Use the same function for consistency
            ticking = false;
        });
        ticking = true;
    }
});

// Optimize essay fragments fade in
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

// Observe all essay fragments
document.querySelectorAll('.essay-fragment').forEach(fragment => {
    observer.observe(fragment);
});

// Handle video playback on visibility change
document.addEventListener('visibilitychange', () => {
    const video = document.getElementById('bg-video');
    const scrollY = window.scrollY;
    const threshold = window.innerHeight;
    
    if (document.hidden || scrollY > threshold) {
        video.pause();
    } else {
        video.play();
    }
});


