// script.js
window.addEventListener('scroll', () => {
    const video = document.querySelector('.transition-video');
    const textSection = document.querySelector('.text-section');
    const videoHeight = video.offsetHeight;

    // Calculate the scroll position relative to the video section
    if (window.scrollY >= videoHeight / 2) {
        // Scale down the video
        video.style.transform = 'scale(0.5)';
        
        // Fade in the text section
        textSection.style.opacity = 1;
    } else {
        // Reset to original state when scrolled back up
        video.style.transform = 'scale(1)';
        textSection.style.opacity = 0;
    }
});
