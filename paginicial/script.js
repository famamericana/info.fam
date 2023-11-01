var config = {
    apiKey: "AIzaSyA-nZmId8FWeXerbSWbVV33QMN5YZH0Q9I",
    authDomain: "likes-do-infofam.firebaseapp.com",
    databaseURL: "https://likes-do-infofam-default-rtdb.firebaseio.com",
    storageBucket: "likes-do-infofam.appspot.com",
    messagingSenderId: "471689274360",
};
firebase.initializeApp(config);


var dCounters = document.querySelectorAll('.CountLike');

[].forEach.call(dCounters, function(dCounter) {
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
    usersLikedRef.child(userID).once('value', function(snap) {
        if (snap.exists()) {
            el.classList.add('button1-liked');
        }
    });

    // get firebase data
    likesCountRef.on('value', function(snap) {
        var data = snap.val() || 0;
        dCounter.querySelector('span').innerHTML = data;
    });

    // set firebase data
    el.addEventListener('click', function() {
        usersLikedRef.child(userID).once('value', function(snap) {
            if (snap.exists()) {
                usersLikedRef.child(userID).remove();
                likesCountRef.transaction(function(currentLikes) {
                    return (currentLikes || 0) - 1;
                });
                el.classList.remove('button1-liked');
            } else {
                usersLikedRef.child(userID).set(true);
                likesCountRef.transaction(function(currentLikes) {
                    return (currentLikes || 0) + 1;
                });
                el.classList.add('button1-liked');
            }
        });
    });
});
