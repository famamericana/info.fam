
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
