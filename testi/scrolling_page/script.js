window.addEventListener('scroll', () => {
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
    } else {
        video.style.visibility = 'visible';
        if (video.paused) {
            video.play();
        }
        const scrollPercent = scrollY / threshold;
        const opacity = Math.max(0.1, 0.8 - scrollPercent * 1.4);
        video.style.opacity = opacity;
        
        // Fade out title as user scrolls
        title.style.opacity = Math.max(0, 1 - (scrollY / (viewportHeight * 0.5)));
    }
});

// Optional: Pause video when tab is not visible
document.addEventListener('visibilitychange', () => {
    const video = document.getElementById('bg-video');
    if (document.hidden) {
        video.pause();
    } else if (window.scrollY <= window.innerHeight) {
        video.play();
    }
});

$(document).ready(function() {
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Handle scroll events for fade-in
    function handleScrollAnimation() {
        $('.fade-in').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('visible');
            }
        });
    }

    // Throttle scroll events
    let scrollTimeout;
    $(window).on('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            handleScrollAnimation();
        });
    });

    // Initial check for visible elements
    handleScrollAnimation();
});


