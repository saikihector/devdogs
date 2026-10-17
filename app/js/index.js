const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

// Abre/fecha o menu no celular
hamburger.addEventListener('click', () => {
    const aberto = nav.classList.toggle('open');
    hamburger.classList.toggle('open', aberto);
    hamburger.setAttribute('aria-expanded', aberto);
});

// Header ganha fundo ao rolar a página
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// Efeito de Opacidade do Scroll

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const welcomeTextEl = document.getElementById('welcome-text');
    const studentsText = document.getElementById('students-text');

    if (welcomeTextEl) {
        let opacity = 1 - scrollPosition / 500;
        welcomeTextEl.style.opacity = Math.max(opacity, 0);
    }
    if (studentsText) {
        let opacityStudents = 1 - (scrollPosition - 100) / 500;
        studentsText.style.opacity = Math.max(opacityStudents, 0);
    }
});

// Efeito de rolagem suave ao clicar no botão

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const alvo = document.querySelector(link.getAttribute('href'));
        if (!alvo) return;

        e.preventDefault();
        alvo.scrollIntoView({ behavior: 'smooth' });

    });
});