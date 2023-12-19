
$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
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
    // Função para verificar e atualizar os valores de likes e classificar elementos
    function updateLikesValuesAndSort() {
        const gridItems = document.querySelectorAll('.grid-item');
        const itemData = [];

        gridItems.forEach((gridItem, index) => {
            const counterStat = gridItem.querySelector('.counterStat');
            if (counterStat) {
                const likesCount = parseInt(counterStat.textContent || 0);
                itemData.push({ element: gridItem, likesCount, index });
            }
        });

        // Classifique os elementos com base na quantidade de likesCount em ordem decrescente
        itemData.sort((a, b) => b.likesCount - a.likesCount);

        // Remova todos os elementos .grid-item da seção "Mais Relevantes"
        const maisRelevantesContainer = document.querySelector('.grid-container');
        maisRelevantesContainer.innerHTML = '';

        // Crie um novo array para armazenar os elementos que não foram movidos para "Mais Relevantes"
        const restItems = [];

        itemData.slice(0, 4).forEach((data) => {
            maisRelevantesContainer.appendChild(data.element);
        });

        // Adicione os elementos restantes de volta à seção "Todos"
        itemData.slice(4).forEach((data) => {
            restItems.push(data.element);
        });

        const todosContainer = document.querySelectorAll('.grid-container')[1];
        restItems.forEach((element) => {
            todosContainer.appendChild(element);
        });
    }

    // Chame a função de atualização periodicamente a cada segundo
    setInterval(updateLikesValuesAndSort, 1000);

    // Chame a função de atualização uma vez imediatamente após o carregamento da página
    updateLikesValuesAndSort();
});


// ARRUMANDO O EFEITO DE HOVER NO LIKE E GRID-ITEM -----------------------------------------------------------
const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach((gridItem) => {
    gridItem.addEventListener('mouseenter', function () {
        gridItem.style.transform = 'scale(1.05)';
    });

    gridItem.addEventListener('mouseleave', function () {
        gridItem.style.transform = 'scale(1)';
    });
});

const buttonsLike = document.querySelectorAll('.button1');

buttonsLike.forEach((button) => {
    button.addEventListener('mouseenter', function () {
        button.style.backgroundColor = 'white';
        button.style.boxShadow = 'inset 0 0 0 2px #e53888';
        button.style.color = '#e53888';
    });

    button.addEventListener('mouseleave', function () {
        button.style.backgroundColor = '';
        button.style.boxShadow = '';
        button.style.color = '';
    });
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
