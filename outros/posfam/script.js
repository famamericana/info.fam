
document.addEventListener('DOMContentLoaded', function() {
    const bolas = document.querySelectorAll('.bola');
    
    // Posição original/padrão de cada bola
    const posOriginal = [];
    bolas.forEach((bola) => {
        const computedStyle = window.getComputedStyle(bola);
        posOriginal.push({
            transform: computedStyle.transform === 'none' ? '' : computedStyle.transform
        });
    });
    
    // Efeito de paralaxe para as bolas quando o mouse se move
    document.addEventListener('mousemove', function(e) {
        // Posição relativa do mouse na tela (valores entre 0 e 1)
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        bolas.forEach((bola, index) => {
            // Fator de movimento diferente para cada bola (quanto maior o índice, mais lento o movimento)
            const fatorMovimento = 15 / (index + 1);
            
            // Mover a bola com base na posição do mouse
            const moveX = (mouseX - 0.5) * fatorMovimento * 20;
            const moveY = (mouseY - 0.5) * fatorMovimento * 20;
            
            // Aplicar transformação adicional, preservando a animação CSS
            bola.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + mouseX * 0.05})`;
        });
    });
    
    // Paralaxe no scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        bolas.forEach((bola, index) => {
            // Velocidade de paralaxe diferente para cada bola
            const scrollSpeed = 0.05 * (index % 4 + 1);
            const yOffset = scrollTop * scrollSpeed;
            
            // Aplicar transformação de scroll
            bola.style.transform = `translateY(${yOffset}px)`;
        });
    });
});