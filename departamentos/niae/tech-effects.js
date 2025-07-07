// Efeitos de tecnologia para a página NIAE
document.addEventListener('DOMContentLoaded', function() {
    createTechBackground();
    addScrollAnimations();
});

// Criar fundo tecnológico com grade
function createTechBackground() {
    const techBg = document.createElement('div');
    techBg.className = 'tech-background';
    techBg.innerHTML = `
        <div class="tech-grid"></div>
        <div class="tech-circuits"></div>
    `;
    document.body.appendChild(techBg);
}

// Adicionar animações no scroll
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar seções principais
    const sections = document.querySelectorAll('.tresmain, .segundomain, .features > div');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Efeito de digitação para títulos
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Efeito de hover nos cards de features
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.features > div');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(0, 150, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Efeito de código binário
function createBinaryRain() {
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-rain';
    
    for (let i = 0; i < 10; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDelay = Math.random() * 5 + 's';
        
        let binaryString = '';
        for (let j = 0; j < 20; j++) {
            binaryString += Math.random() > 0.5 ? '1' : '0';
        }
        column.textContent = binaryString;
        
        binaryContainer.appendChild(column);
    }
    
    document.body.appendChild(binaryContainer);
}

// Inicializar efeito binário
setTimeout(createBinaryRain, 2000);
