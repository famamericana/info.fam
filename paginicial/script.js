
$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

$(document).ready(function () {
    $("#BotaoTopo").load("/codigos-gerais/voltartopo/voltartopo.html");
});

// Função para criar um cookie
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Função para ler um cookie
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Função para apagar um cookie
function eraseCookie(name) {
    createCookie(name, "", -1);
}

// Verifique se o userID já está definido no cookie
var userID = readCookie('userID');
if (!userID) {
    userID = 'user_' + Math.random().toString(36).substr(2, 16);
    createCookie('userID', userID, 365); // O cookie expira em 365 dias
}

var config = {
    apiKey: "AIzaSyA-nZmId8FWeXerbSWbVV33QMN5YZH0Q9I",
    authDomain: "likes-do-infofam.firebaseapp.com",
    databaseURL: "https://likes-do-infofam-default-rtdb.firebaseio.com",
    storageBucket: "likes-do-infofam.appspot.com",
    messagingSenderId: "471689274360",
};
firebase.initializeApp(config);

var dCounters = document.querySelectorAll('.CountLike');

[].forEach.call(dCounters, function (dCounter) {
    var el = dCounter.querySelector('button');
    var cId = dCounter.id;
    var dDatabase = firebase.database().ref('Like Number Counter/' + cId);
    var likesCountRef = dDatabase.child('likesCount');
    var usersLikedRef = dDatabase.child('usersLiked');

    // Atualize a classe com base no estado "liked" ao carregar a página
    usersLikedRef.child(userID).once('value', function (snap) {
        if (snap.exists()) {
            el.classList.add('button1-liked'); // Certifique-se de que esta é a classe correta para o estado "liked"
        }
    });

    if (localStorage.getItem('userID')) {
        userID = localStorage.getItem('userID');
    } else {
        userID = 'user_' + Math.random().toString(36).substr(2, 16);
        localStorage.setItem('userID', userID);
    }

    usersLikedRef.child(userID).once('value', function (snap) {
        if (snap.exists()) {
            el.classList.add('button1-liked');
        }
    });

    likesCountRef.on('value', function (snap) {
        var data = snap.val() || 0;
        dCounter.querySelector('span').innerHTML = data;
    });

    el.addEventListener('click', function (event) {
        event.preventDefault();

        // Desabilita o botão imediatamente após o clique
        el.disabled = true;

        usersLikedRef.child(userID).once('value', function (snap) {
            if (snap.exists()) {
                usersLikedRef.child(userID).remove();
                likesCountRef.transaction(function (currentLikes) {
                    return (currentLikes || 0) - 1;
                });
                el.classList.remove('button1-liked');
            } else {
                usersLikedRef.child(userID).set(true);
                likesCountRef.transaction(function (currentLikes) {
                    return (currentLikes || 0) + 1;
                });
                el.classList.add('button1-liked');
            }

            // Reabilita o botão após 1 segundo
            setTimeout(function () {
                el.disabled = false;
            }, 1000);
        });
    });
});




//MAIS RELEVANTES ----------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    function updateLikesValuesAndSort() {
        const gridItems = document.querySelectorAll('.grid-item');
        let itemData = [];

        gridItems.forEach((gridItem, index) => {
            const counterStat = gridItem.querySelector('.counterStat');
            if (counterStat) {
                const likesCount = parseInt(counterStat.textContent || 0);
                const isNovidade = gridItem.classList.contains('new');
                itemData.push({ element: gridItem, likesCount, index, isNovidade });
            }
        });

        // Classifique os elementos com base na quantidade de likesCount em ordem decrescente
        itemData.sort((a, b) => b.likesCount - a.likesCount);

        // Preparação para atualizar seções
        const maisRelevantesContainer = document.querySelector('.grid-container.mais-relevantes');
        const novidadesContainer = document.querySelector('.grid-container.novidades');
        const todosContainer = document.querySelectorAll('.grid-container')[2]; // Assumindo que é o terceiro grid-container

        maisRelevantesContainer.innerHTML = '';
        novidadesContainer.innerHTML = '';

        let restItems = [];

        // Distribua os elementos para "Mais Relevantes" e "Novidades"
        itemData.forEach((data) => {
            if (data.isNovidade) {
                novidadesContainer.appendChild(data.element);
            } else if (maisRelevantesContainer.children.length < 4) {
                maisRelevantesContainer.appendChild(data.element);
            } else {
                restItems.push(data.element);
            }
        });

        // Adicione os elementos restantes à seção "Todos"
        restItems.forEach((element) => {
            todosContainer.appendChild(element);
        });
    }

    setInterval(updateLikesValuesAndSort, 1000);
    updateLikesValuesAndSort();
});



// ARRUMANDO O EFEITO DE HOVER NO LIKE E GRID-ITEM -----------------------------------------------------------
const gridItems = document.querySelectorAll('.grid-item');
const buttonsLike = document.querySelectorAll('.button1');

function updateEventListeners() {
    if (window.innerWidth >= 500) {
        // Adiciona os event listeners
        gridItems.forEach((gridItem) => {
            gridItem.addEventListener('mouseenter', mouseEnterGrid);
            gridItem.addEventListener('mouseleave', mouseLeaveGrid);
        });

        buttonsLike.forEach((button) => {
            button.addEventListener('mouseenter', mouseEnterButton);
            button.addEventListener('mouseleave', mouseLeaveButton);
        });
    } else {
        // Remove os event listeners
        gridItems.forEach((gridItem) => {
            gridItem.removeEventListener('mouseenter', mouseEnterGrid);
            gridItem.removeEventListener('mouseleave', mouseLeaveGrid);
        });

        buttonsLike.forEach((button) => {
            button.removeEventListener('mouseenter', mouseEnterButton);
            button.removeEventListener('mouseleave', mouseLeaveButton);
        });
    }
}

function mouseEnterGrid() {
    this.style.transform = 'scale(1.05)';
}

function mouseLeaveGrid() {
    this.style.transform = 'scale(1)';
}

function mouseEnterButton() {
    this.style.backgroundColor = 'white';
    this.style.boxShadow = 'inset 0 0 0 2px #e53888';
    this.style.color = '#e53888';
}

function mouseLeaveButton() {
    this.style.backgroundColor = '';
    this.style.boxShadow = '';
    this.style.color = '';
}

// Inicia a configuração e lida com mudanças de tamanho da tela
updateEventListeners();
window.addEventListener('resize', updateEventListeners);


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// pegar esses dados e colocar em outro lugar ------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const newItems = [];
        const gridItems = document.querySelectorAll('.grid-item.new'); // Captura os itens com a classe 'new'

        gridItems.forEach(item => {
            const href = item.href ? new URL(item.getAttribute('href'), window.location.origin).href : 'https://info.fam.br/'; // Captura o href ou aplica o valor padrão

            newItems.push({
                href,
                imageSrc: item.querySelector('img').src,
                title: item.querySelector('h3').textContent,
                description: item.querySelector('p').textContent,
                likes: item.querySelector('.counterStat').textContent
            });
        });

        if (newItems.length > 0) {
            localStorage.setItem('newItems', JSON.stringify(newItems)); // Armazena os itens no localStorage se houver
            //console.log("Itens armazenados:", newItems);
        } else {
            //console.warn("Nenhum item 'new' encontrado.");
        }
    }, 1000); // Atraso de 1 segundo para garantir o carregamento completo do DOM
});
