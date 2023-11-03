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
    var cId = dCounter.id; // Isso nos dará "LikeCount1", "LikeCount2", etc.
    var dDatabase = firebase.database().ref('Like Number Counter/' + cId); // Salve cada contagem de likes em um nó separado
    var likesCountRef = dDatabase.child('likesCount');
    var usersLikedRef = dDatabase.child('usersLiked');

    var userID;

    if (localStorage.getItem('userID')) {
        userID = localStorage.getItem('userID');
    } else {
        userID = 'user_' + Math.random().toString(36).substr(2, 16);
        localStorage.setItem('userID', userID);
    }

    // Verifique se o usuário já deu like anteriormente
    usersLikedRef.child(userID).once('value', function (snap) {
        if (snap.exists()) {
            el.classList.add('button1-liked');
        }
    });

    // get firebase data
    likesCountRef.on('value', function (snap) {
        var data = snap.val() || 0;
        dCounter.querySelector('span').innerHTML = data;
    });

    // set firebase data
    el.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do botão
    
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
