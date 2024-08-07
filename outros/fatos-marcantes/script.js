//Aniversário FAM --------------------------------------------------------------------------------  

document.addEventListener("DOMContentLoaded", function () {
    // Data de início
    const startDate = new Date('1999-08-09');
    // Data atual
    const currentDate = new Date();
    // Cálculo da diferença em anos
    let yearsDifference = currentDate.getFullYear() - startDate.getFullYear();
    // Ajuste se a data atual ainda não passou o aniversário no ano atual
    const monthDifference = currentDate.getMonth() - startDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < startDate.getDate())) {
        yearsDifference--;
    }

    // Espera a planilha carregar e atualiza o conteúdo do span com os anos calculados
    setTimeout(() => {
        const spanElement = document.querySelector('.tl-text-content span#years-span');
        if (spanElement) {
            spanElement.textContent = yearsDifference;
        }
    }, 2000); // Ajuste o tempo conforme necessário para garantir que a planilha esteja carregada
});


// 