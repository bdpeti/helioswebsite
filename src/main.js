import './style.css';

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

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
}

// Preloader Logic
window.addEventListener('load', () => {
    const loaderBar = document.getElementById('loader-bar');
    const preloader = document.getElementById('preloader');

    if (loaderBar && preloader) {
        // Check if already visited in this session
        if (sessionStorage.getItem('visited')) {
            preloader.style.display = 'none';
        } else {
            sessionStorage.setItem('visited', 'true');
            setTimeout(() => { loaderBar.style.width = '50%'; }, 200);
            setTimeout(() => { loaderBar.style.width = '100%'; }, 800);

            setTimeout(() => {
                preloader.style.transform = 'translateY(-100%)';
            }, 1200);
        }
    }
});

// Scroll Observer
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

// --- CART LOGIC ---
function initCart() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    const loader = document.getElementById('cart-loader');

    // Helper: Show/Hide Loader
    const toggleLoader = (show) => {
        if (show) loader.classList.remove('hidden');
        else loader.classList.add('hidden');
    };

    // Helper: Update Cart via AJAX
    const updateCartItem = async (key, quantity) => {
        toggleLoader(true);
        try {
            const response = await fetch('/cart/change.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: key, quantity: quantity })
            });

            if (response.ok) {
                // Reload the section to get updated HTML
                const sectionResponse = await fetch(`/?section_id=main-cart`);
                const text = await sectionResponse.text();

                // Parse and replace
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const newCartContainer = doc.getElementById('cart-container');

                if (newCartContainer) {
                    cartContainer.innerHTML = newCartContainer.innerHTML;
                    // Re-init listeners since DOM changed
                    initCart();
                }
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            toggleLoader(false);
        }
    };

    // Event Delegation for Cart Actions
    cartContainer.addEventListener('click', (e) => {
        // Quantity Buttons
        if (e.target.classList.contains('qty-btn')) {
            const input = e.target.parentElement.querySelector('input');
            const key = input.dataset.key;
            let currentQty = parseInt(input.value);

            if (e.target.dataset.action === 'plus') {
                updateCartItem(key, currentQty + 1);
            } else if (e.target.dataset.action === 'minus') {
                updateCartItem(key, currentQty - 1);
            }
        }

        // Remove Button
        if (e.target.classList.contains('remove-btn')) {
            const key = e.target.dataset.key;
            updateCartItem(key, 0);
        }
    });

    // Quantity Input Change
    cartContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('qty-input')) {
            const key = e.target.dataset.key;
            const qty = parseInt(e.target.value);
            updateCartItem(key, qty);
        }
    });

    // Checkout with Discount
    const checkoutBtn = document.getElementById('checkout-btn');
    const discountInput = document.getElementById('discount-input');

    if (checkoutBtn && discountInput) {
        checkoutBtn.addEventListener('click', (e) => {
            const code = discountInput.value.trim();
            if (code) {
                e.preventDefault();
                // Redirect to checkout with discount
                window.location.href = `/checkout?discount=${code}`;
            }
        });
    }
}

// Initialize Cart Logic
document.addEventListener('DOMContentLoaded', initCart);
