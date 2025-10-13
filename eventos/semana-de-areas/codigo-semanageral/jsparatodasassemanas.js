 // Dicionário de substituições
 const substitutions = {
    "areas": "Áreas",
    "educacao": "Educação",
    "comunicacao": "Comunicação",
    "gestao": "Gestão",
    "contabeis": "Contábeis",
    "financas": "Finanças",
    "fisica": "Física",

};

function capitalizeWords(str) {
    let words = str.split('-').map(word => {
        // Substitui a palavra, se ela existir no dicionário de substituições
        if (substitutions[word]) {
            return substitutions[word];
        }

        return (word.length < 3) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return words.join(' ');
}

document.addEventListener('DOMContentLoaded', function () {
    const pathParts = window.location.pathname.split('/').filter(part => part && part !== 'index.html');

    let breadcrumbContent = '';
    let constructedPath = '';

    pathParts.forEach((part, index) => {
        let displayPart = capitalizeWords(decodeURIComponent(part));
        constructedPath += '/' + part;
        if (index !== pathParts.length - 1) {
            breadcrumbContent += `<a href="${constructedPath}" class="breadcrumb-item">${displayPart}</a><span class="breadcrumb-separator">/</span>`;
        } else {
            breadcrumbContent += `<span class="breadcrumb-current">${displayPart}</span>`;
        }
    });

    document.querySelector('.breadcrumb').innerHTML = breadcrumbContent;
});

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});


$(document).ready(function () {
    $("#BotaoTopo").load("/codigos-gerais/voltartopo/voltartopo.html");
});
