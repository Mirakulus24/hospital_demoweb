// Shared Footer Component
const footerHTML = `
    <div class="footer-grid">
        <div class="footer-brand">
            <a href="#" class="logo" style="color: white;"><i class="fas fa-plus-square"></i> MediFlow</a>
            <p>Providing world-class healthcare since 2010. Your health is our only priority.</p>
        </div>
        <div class="footer-links">
            <h4>Departments</h4>
            <ul>
                <li><a href="services.html">Cardiology</a></li>
                <li><a href="services.html">Neurology</a></li>
                <li><a href="services.html">Pediatrics</a></li>
            </ul>
        </div>
        <div class="footer-contact">
            <h4>Emergency</h4>
            <p><i class="fas fa-phone"></i> +1 (555) 911-0000</p>
            <p><i class="fas fa-envelope"></i> help@mediflow.com</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 MediFlow Hospital System. All rights reserved.</p>
    </div>
`;

const footerContainer = document.querySelector('.main-footer');
if (footerContainer) footerContainer.innerHTML = footerHTML;

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('#stats-section');
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is slower

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + (target === 15 ? "" : "+");
                }
            };
            updateCount();
        });
    };

    // Trigger when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 });

    if(statsSection) observer.observe(statsSection);
});

let currentIdx = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentIdx = (currentIdx + 1) % slides.length;
    showSlide(currentIdx);
}

function currentSlide(n) {
    currentIdx = n;
    showSlide(currentIdx);
}

// Auto-rotate
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}