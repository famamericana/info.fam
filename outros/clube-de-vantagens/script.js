$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

document.addEventListener('DOMContentLoaded', function () {
    const googleSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfEwrOn4LplY12o8ybuJRJ22dgw-phIEvM8ZNzb8KIpUOwfvx_aJEgqyS8GxLhb31DkJZq5b53badH/pub?output=csv';

    fetch(googleSheetURL)
        .then(response => response.text())
        .then(data => {
            let rows = data.split('\n').slice(1);
            rows.forEach(row => {
                let columns = row.split(',');

                // Adicionar itens nas respectivas colunas
                addItemToColumn('desconto-40', columns[0], columns[1], columns[2]);
                addItemToColumn('desconto-20', columns[3], columns[4], columns[5]);
                addItemToColumn('desconto-10', columns[6], columns[7], columns[8]);
            });

        });
});

function addItemToColumn(columnId, imageUrl, descricao, linkUrl) {
    const column = document.getElementById(columnId);

    if (!imageUrl.trim()) return;

    const itemHtml = `
<div class="griditemdescontos">
    <img src="${imageUrl.replace(/"/g, '')}" alt="imagem da empresa" class="desconto-img">
    <div class="descricao">
        <p>${descricao.replace(/"/g, '')}</p>
        <a href="${linkUrl.replace(/"/g, '')}">
            <button class="desc-btn">Saiba Mais</button>
        </a>
    </div>
</div>
`;

    column.innerHTML += itemHtml;
}

