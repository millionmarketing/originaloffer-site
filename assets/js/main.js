document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Formulário de contato
    const form = document.getElementById('contato-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            alert('Obrigado pelo contato! Retornaremos em breve.');
            form.reset();
        });
    }

    // Navbar fixa com mudança de cor ao rolar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = '#ffffff';
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    initDepoimentos();
    initCounters();
});

function initDepoimentos() {
    const slider = document.querySelector('.depoimentos-slider');
    const depoimentos = document.querySelectorAll('.depoimento');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    
    // Criar dots
    depoimentos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Mostrar primeiro depoimento
    depoimentos[0].classList.add('active');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        depoimentos[currentIndex].classList.remove('active');
        currentIndex = index;
        if (currentIndex < 0) currentIndex = depoimentos.length - 1;
        if (currentIndex >= depoimentos.length) currentIndex = 0;
        depoimentos[currentIndex].classList.add('active');
        updateDots();
    }
    
    // Animação de fade
    function fadeIn(element) {
        element.style.opacity = 0;
        element.classList.add('active');
        
        let opacity = 0;
        const animation = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(animation);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, 50);
    }
    
    function fadeOut(element) {
        let opacity = 1;
        const animation = setInterval(() => {
            if (opacity <= 0) {
                element.classList.remove('active');
                clearInterval(animation);
            }
            element.style.opacity = opacity;
            opacity -= 0.1;
        }, 50);
    }
    
    // Event listeners para os botões
    prevBtn.addEventListener('click', () => {
        fadeOut(depoimentos[currentIndex]);
        setTimeout(() => {
            goToSlide(currentIndex - 1);
            fadeIn(depoimentos[currentIndex]);
        }, 500);
    });
    
    nextBtn.addEventListener('click', () => {
        fadeOut(depoimentos[currentIndex]);
        setTimeout(() => {
            goToSlide(currentIndex + 1);
            fadeIn(depoimentos[currentIndex]);
        }, 500);
    });
    
    // Autoplay
    let autoplay = setInterval(() => {
        nextBtn.click();
    }, 5000);
    
    // Pausar autoplay quando o mouse estiver sobre o slider
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Ajuste para velocidade da animação
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 20);
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
} 