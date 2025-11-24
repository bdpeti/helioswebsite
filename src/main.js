import './style.css';

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (animation)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover states for cursor
document.querySelectorAll('.cursor-none-target').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(255, 158, 0, 0.2)';
        cursorOutline.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = '#FF9E00';
    });
});

// Preloader Logic
window.addEventListener('load', () => {
    const loaderBar = document.getElementById('loader-bar');
    const preloader = document.getElementById('preloader');

    // Simulate loading
    setTimeout(() => { loaderBar.style.width = '50%'; }, 200);
    setTimeout(() => { loaderBar.style.width = '100%'; }, 800);

    setTimeout(() => {
        preloader.style.transform = 'translateY(-100%)';
        // Trigger intro animations for elements visible on load
        // observer.check(); // Removed invalid check
    }, 1200);
});

// Scroll Observer for Fade-in effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});
