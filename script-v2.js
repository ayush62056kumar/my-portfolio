// === GLOBALS ===
const body = document.body;

// ================= THEME TOGGLE =================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light');
        localStorage.setItem(
            'theme',
            body.classList.contains('light') ? 'light' : 'dark'
        );
        updateNavbarTheme();
    });
}

function updateNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const isLight = body.classList.contains('light');
    navbar.style.background =
        window.scrollY > 100
            ? isLight ? 'rgba(250,250,250,0.95)' : 'rgba(13,13,13,0.95)'
            : isLight ? 'rgba(250,250,250,0.8)' : 'rgba(13,13,13,0.8)';
}

// Restore theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
}

// ================= MOBILE MENU =================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');

        const spans = hamburger.querySelectorAll('span');
        const active = navLinks.classList.contains('active');

        spans[0].style.transform = active ? 'rotate(45deg) translateY(8px)' : 'none';
        spans[1].style.opacity = active ? '0' : '1';
        spans[2].style.transform = active ? 'rotate(-45deg) translateY(-8px)' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// ================= ACTIVE NAV =================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });

    updateNavbarTheme();
});

// ================= SCROLL ANIMATIONS =================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.project, .timeline-item, .certificate-card')
    .forEach(el => observer.observe(el));

// ================= SKILL BARS (FINAL FIX) =================
window.addEventListener('load', () => {
    console.log('✅ Skills animation started');

    document.querySelectorAll('.skill-bar-wrapper').forEach((wrapper, i) => {
        const bar = wrapper.querySelector('.skill-progress');
        if (!bar) return;

        setTimeout(() => {
            wrapper.classList.add('animate');
            bar.style.width = bar.dataset.progress + '%';
        }, i * 120);
    });
});

// ================= CONTACT FORM =================
const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');

if (contactForm && sendBtn && window.emailjs) {
    emailjs.init("WVuI4iijgNv1mcJ2J");

    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        sendBtn.textContent = 'Sending...';
        sendBtn.disabled = true;

        emailjs.sendForm(
            "service_fnvqzak",
            "template_4x59y08",
            contactForm
        ).then(() => {
            alert('Message sent ✅');
            contactForm.reset();
        }).catch(() => {
            alert('Failed ❌');
        }).finally(() => {
            sendBtn.textContent = 'Send Message';
            sendBtn.disabled = false;
        });
    });
}
// ================= FINAL LOG =================
console.log('%c✨ Portfolio Loaded', 'color:#e63946;font-size:18px;font-weight:bold');