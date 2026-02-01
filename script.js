/* 
 * Portfolio Interactions 
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations (Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));


    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Active Navigation Link on Scroll (Scroll Spy) ---
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    const scrollObserverOptions = {
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, scrollObserverOptions);

    sections.forEach(section => {
        scrollObserver.observe(section);
    });

    // --- Contact Form Demo (prevent reload) ---
    // Removed to allow Formspree submission
    // --- Contact Form AJAX Submission (Prevent Redirect) ---
    const contactForm = document.getElementById('contactForm');
    const formContainer = document.querySelector('.contact-form-container');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            // 1. Show Loading State
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                // 2. Send Data to Formspree via AJAX
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 3. Show Success Message (Replace Form)
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <!-- SVG Checkmark -->
                            <div class="success-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h3 class="success-title">Message Sent!</h3>
                            <p class="success-text">Thank you for reaching out. I'll get back to you shortly.</p>
                            <button class="btn btn-outline" style="margin-top: 20px;" onclick="location.reload()">Send Another</button>
                        </div>
                    `;
                } else {
                    // Error Handling
                    alert("Oops! There was a problem sending your message. Please try again.");
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert("Error connecting to the server. Please check your internet connection.");
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- Dynamic Greeting Typing Effect (Optional enhancement) ---
    // If you add a span with id 'typing-text', this will cycle words.
    /*
    const textElement = document.getElementById('typing-text');
    if (textElement) {
        const words = ["Automation Tester", "QA Engineer", "Python Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            // Typing logic here if requested later
        }
    }
    */
});
