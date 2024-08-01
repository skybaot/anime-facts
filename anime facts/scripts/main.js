// Utility functions
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Smooth scrolling
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        $(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Parallax effect for header
const handleParallax = () => {
    const header = $('header');
    if (header) {
        header.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
        header.style.transform = `translateZ(-${window.pageYOffset * 0.1}px)`;
    }
};

// Animated content reveal on scroll
const revealElements = $$('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

// Form validation
const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = $('#name')?.value;
    const email = $('#email')?.value;
    const message = $('#message')?.value;

    if (name && email && message) {
        showMessage(form, 'Thank you for your message!', 'success-message');
        form.reset();
    } else {
        showMessage(form, 'Please fill out all fields.', 'error-message');
    }
};

const showMessage = (form, text, className) => {
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add(className);
    form.appendChild(message);
    setTimeout(() => message.remove(), 3000);
};

// Navigation hover effect
const addNavHoverEffect = () => {
    $$('nav ul li a').forEach(item => {
        item.addEventListener('mouseover', () => item.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)');
        item.addEventListener('mouseout', () => item.style.textShadow = 'none');
    });
};

// Logo animation
const addLogoAnimation = () => {
    const logo = $('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => logo.style.transform = 'scale(1.1) perspective(500px) rotateX(0deg)');
        logo.addEventListener('mouseout', () => logo.style.transform = 'scale(1) perspective(500px) rotateX(20deg)');
    }
};

// Search functionality
const searchFacts = () => {
    const searchTerm = $('#searchInput')?.value.toLowerCase();
    console.log(`Searching for: ${searchTerm}`);
    alert(`Search functionality is not yet implemented. You searched for: ${searchTerm}`);
};

// Random fact generator
const facts = [
    "The anime 'One Piece' has been running since 1999.",
    "Studio Ghibli's 'Spirited Away' won an Oscar in 2003.",
    "'Sazae-san' is the longest-running animated TV series in the world.",
    // ... (other facts)
];

const generateRandomFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    $('#randomFact').textContent = randomFact;
};

// User contribution form submission
const handleFactSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Fact submitted:', Object.fromEntries(formData));
    alert('Thank you for your submission! It will be reviewed shortly.');
    event.target.reset();
};

// Newsletter subscription
const handleNewsletterSubscription = (event) => {
    event.preventDefault();
    const email = $('#email')?.value;
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');
    event.target.reset();
};

// Back to Top button
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.textContent = '↑';
    button.classList.add('back-to-top');
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.style.display = window.pageYOffset > 100 ? 'block' : 'none';
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Navbar functionality
const navSlide = () => {
    const hamburger = $('.hamburger');
    const nav = $('.nav-links');
    const navLinks = $$('.nav-links li');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        hamburger.classList.toggle('toggle');
    });

    $$('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });
};

// Meme functionality
const memeUrls = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150'
];

let currentMemeIndex = 0;

const loadMemes = () => {
    const memeContainer = $('#meme-container');
    const loadMoreButton = $('#load-more-memes');

    for (let i = 0; i < 4 && currentMemeIndex < memeUrls.length; i++) {
        const memeElement = document.createElement('div');
        memeElement.classList.add('meme-card');
        memeElement.innerHTML = `
            <img src="${memeUrls[currentMemeIndex]}" alt="Anime Meme" class="meme-image">
            <h3>Meme Title</h3>
            <p>This is a description of the meme.</p>
            <div class="card-actions">
                <button class="like-button">Like</button>
                <button class="share-button">Share</button>
            </div>
        `;
        memeContainer.appendChild(memeElement);
        currentMemeIndex++;
    }

    if (currentMemeIndex >= memeUrls.length) {
        loadMoreButton.style.display = 'none';
    }
};

// Event listeners and initializations
window.addEventListener('load', () => {
    revealOnScroll();
    generateRandomFact();
    addNavHoverEffect();
    addLogoAnimation();
    createBackToTopButton();
    navSlide();

    if (window.location.pathname.includes('memes.html')) {
        loadMemes();
        $('#load-more-memes')?.addEventListener('click', loadMemes);
    }

    $('#contact-form')?.addEventListener('submit', handleFormSubmit);
    $('#factSubmissionForm')?.addEventListener('submit', handleFactSubmission);
    $('#newsletter-form')?.addEventListener('submit', handleNewsletterSubscription);
});

window.addEventListener('scroll', () => {
    handleParallax();
    revealOnScroll();
});
