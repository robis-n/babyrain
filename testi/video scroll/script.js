// Shrink the header when the user scrolls
window.addEventListener('scroll', () => {
  const header = document.getElementById('full-page-header');
  if (window.scrollY > 100) { // Adjust scroll threshold for shrinking
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});
