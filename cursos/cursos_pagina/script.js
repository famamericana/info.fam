const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vREDH7BTr9H2Um4BgNp45XYW1ybvS1qBIWACK2eElc7pmra17fwwcVBp3Um-GD6_wOF_N_FquXS1Rx9/pub?output=csv';

Papa.parse(url, {
  download: true,
  header: true,
  complete: function (results) {
    var data = results.data;

    // Para "Administração"
    var contentDivAdmin = document.createElement('div');
    contentDivAdmin.className = 'containercursos';

    data.filter(row => row['Cursos'] === 'Administração').forEach(row => {
      var cardDiv = document.createElement('div');
      cardDiv.className = 'cursos';

      cardDiv.innerHTML = `<p>${row['Valor']}</p>`;
      contentDivAdmin.appendChild(cardDiv);
    });

    var meuLocalAdmin = document.getElementById('produtofinalcursos');
    meuLocalAdmin.appendChild(contentDivAdmin);

    // Para "EaD"
    var contentDivEng = document.createElement('div');
    contentDivEng.className = 'containerengenharia';

    data.filter(row => row['Cursos'] === 'Administração EAD').forEach(row => {
      var cardDiv = document.createElement('div');
      cardDiv.className = 'cursos';

      cardDiv.innerHTML = `<p>${row['Valor']}</p>`;
      contentDivEng.appendChild(cardDiv);
    });

    var meuLocalEng = document.getElementById('produtofinalead');
    meuLocalEng.appendChild(contentDivEng);
  }
});


const url3 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQFQpAPuz3qeeeaVPGRhbC76PJCmu__UDYg99qUuZMnYw6PrdOkZ3jtLCOf9SlcMh3ft7liKV5b0tk4/pub?output=csv';

Papa.parse(url3, {
  download: true,
  header: true,
  complete: function (results) {
    var data = results.data;
    var cardHolder = document.querySelector('.cardHolder');

    data.forEach(row => {
      if (row['Nome PsicoEscolar'] && row['Foto PsicoEscolar'] && row['Cargo PsicoEscolar']) {
        var cardBox = document.createElement('div');
        cardBox.className = 'cardBox swiper-slide';

        var cardDetails = document.createElement('div');
        cardDetails.className = 'cardDetails';

        var cardDiv = document.createElement('div');
        cardDiv.className = 'teacherSection';
        cardDiv.innerHTML = `
                  <img class="teacherImg" src="${row['Foto PsicoEscolar']}" alt="${row['Nome PsicoEscolar']}">
                  <h3>${row['Nome PsicoEscolar']}</h3>
                  <p>${row['Cargo PsicoEscolar']}</p>
                  <div class="teacherCurriculum">
                      <a class="teacherCurriculumLinks" href="${row['Contato PsicoEscolar']}" target="_blank" title="Contato"><i class="fa-solid fa-comment"></i></a>
                      <a class="teacherCurriculumLinks" href="${row['Currículo PsicoEscolar']}" target="_blank" title="Currículo"><i class="ai ai-lattes"></i>Currículo</a>
                  </div>
              `;
        cardDetails.appendChild(cardDiv);
        cardBox.appendChild(cardDetails);
        cardHolder.appendChild(cardBox);
      }
    });

    var swiper = new Swiper(".slideContent", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      centerSlide: 'true',
      fade: 'true',
      grabCursor: 'true',
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });
  }
});
