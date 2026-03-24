document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Set active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Team section visibility toggle
    const teamSection = document.getElementById('team');
    const teamLinks = document.querySelectorAll('a[href="#team"]');

    function showTeam() {
        if (teamSection) {
            teamSection.classList.add('show');
            // Re-trigger scroll observer for team cards if needed
            setTimeout(() => {
                teamSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    teamLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showTeam();
        });
    });

    // Check if URL hash is #team on load
    if (window.location.hash === '#team') {
        showTeam();
    }

    // Dashboard Chart Implementation
    const ctx = document.getElementById('aqiChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
                datasets: [{
                    label: 'AQI Index (24h Trend)',
                    data: [35, 32, 48, 55, 42, 38, 42],
                    borderColor: '#22C55E',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#22C55E',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Live AQI Counter Fluctuation
    const aqiValueElement = document.getElementById('live-aqi-value');
    const aqiStatusElement = document.getElementById('live-aqi-status');

    if (aqiValueElement && aqiStatusElement) {
        setInterval(() => {
            // Generate random AQI between 30 and 120
            const newValue = Math.floor(Math.random() * (120 - 30 + 1)) + 30;
            
            // Smooth transition: scale and fade
            aqiValueElement.style.transform = 'scale(0.95)';
            aqiValueElement.style.opacity = '0.7';
            
            setTimeout(() => {
                aqiValueElement.textContent = newValue;
                
                // Update status and color
                let status = '';
                let color = '';
                
                if (newValue <= 50) {
                    status = 'Excellent';
                    color = '#22C55E'; // Green
                } else if (newValue <= 100) {
                    status = 'Moderate';
                    color = '#FACC15'; // Yellow
                } else {
                    status = 'Unhealthy for Sensitive Groups';
                    color = '#FB923C'; // Orange (Tailwind Orange 400)
                }
                
                aqiStatusElement.textContent = status;
                aqiStatusElement.style.color = color;
                aqiValueElement.style.color = color;
                aqiValueElement.style.transform = 'scale(1)';
                aqiValueElement.style.opacity = '1';
            }, 300);
        }, 3000);
    }

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            
            // Show a professional success message
            const button = contactForm.querySelector('button');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.textContent = 'Message Sent Successfully!';
            button.style.backgroundColor = '#22C55E';
            
            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
                button.style.backgroundColor = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // Subtle Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-init');
        observer.observe(section);
    });
});

// Add these styles dynamically for reveal animations
const style = document.createElement('style');
style.textContent = `
    .reveal-init {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
