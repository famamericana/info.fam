// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDhujY2q24_MBs8snWwi8KqEes5x0Su1LU",
    authDomain: "infofam-157d7.firebaseapp.com",
    projectId: "infofam-157d7",
    storageBucket: "infofam-157d7.appspot.com",
    messagingSenderId: "778485195486",
    appId: "1:778485195486:web:21115c37f0e36f1aeb984f"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
    // Get all our input fields
    var email = document.getElementById('register_email').value
    var password = document.getElementById('register_password').value
    var full_name = document.getElementById('register_full_name').value
    var departamento_nome = document.getElementById('register_departamento_nome').value
    var confirm_password = document.getElementById('register_confirm_password').value

    // Verificar se as senhas coincidem
    if (password !== confirm_password) {
        alert('Passwords do not match');
        return;
    }
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(departamento_nome) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                departamento_nome: departamento_nome,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    var email = document.getElementById('login_email').value
    var password = document.getElementById('login_password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Update last login time
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            /* User Logged In
            alert('User Logged In!!') */

            fetchAndDisplayDocuments();

            // Aqui a lógica para exibir o conteúdo após o login
            document.getElementById('content_container').style.display = 'none';
            document.getElementById('post_login_content').style.display = 'block';
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}


// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@fam\.br$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        alert('E-mail tem que terminar com @fam.br');
        return false
    }
}


function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}



var isLoginFormShown = true; // Variável para rastrear o formulário exibido

// Função para alternar entre os formulários

function toggleForm() {
    if (isLoginFormShown) {
        document.getElementById('login_form_container').style.display = 'none';
        document.getElementById('register_form_container').style.display = 'block';
        document.getElementById('toggleFormButton').innerText = 'Login';
        isLoginFormShown = false;
    } else {
        document.getElementById('login_form_container').style.display = 'block';
        document.getElementById('register_form_container').style.display = 'none';
        document.getElementById('toggleFormButton').innerText = 'Register';
        isLoginFormShown = true;
    }
}


function logout() {
    auth.signOut().then(function () {
        // Logout bem-sucedido
        document.getElementById('content_container').style.display = 'block';
        document.getElementById('post_login_content').style.display = 'none';
        isLoginFormShown = true; // Reset para mostrar o formulário de login
        document.getElementById('toggleFormButton').innerText = 'Register';
    }).catch(function (error) {
        // Tratar erro de logout
        alert(error.message);
    });
}


// Verifica o estado de autenticação quando a aplicação é carregada
auth.onAuthStateChanged(function (user) {
    if (user) {
        // Usuário está logado
        fetchAndDisplayDocuments();
        document.getElementById('content_container').style.display = 'none';
        document.getElementById('post_login_content').style.display = 'block';
    } else {
        // Usuário não está logado
        document.getElementById('content_container').style.display = 'block';
        document.getElementById('post_login_content').style.display = 'none';
    }
    // Esconde a tela de carregamento após a verificação
    document.getElementById('loadingScreen').style.display = 'none';
});


function sendPasswordResetEmail() {
    var email = prompt("Por favor, insira seu e-mail para redefinição de senha:");
    if (email) {
        auth.sendPasswordResetEmail(email).then(function () {
            alert("E-mail de redefinição de senha enviado.");
        }).catch(function (error) {
            // Um erro aconteceu, como um e-mail inválido ou problemas de rede
            alert("Erro ao enviar e-mail de redefinição de senha: " + error.message);
        });
    } else {
        alert("E-mail não fornecido.");
    }
}


// Inicialize a referência do Firestore
const db = firebase.firestore();

function fetchAndDisplayDocuments() {
    db.collection("Documentos").get().then((querySnapshot) => {
        const postLoginContent = document.getElementById('post_login_content_firestore');
        postLoginContent.innerHTML = ''; // Limpa o conteúdo anterior

        querySnapshot.forEach((doc) => {
            // Aqui você pode formatar como deseja exibir os dados
            const data = doc.data();
            postLoginContent.innerHTML += `<div><h3>${data.titulo}</h3><p>${data.conteudo}</p></div>`;
        });
    });
}


db.collection("Documentos").get().then((querySnapshot) => {
    console.log("Documentos encontrados: ", querySnapshot.size);
}).catch((error) => {
    console.error("Erro ao acessar o Firestore: ", error);
});



// qualidade de vida, enter login -----------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    var emailInput = document.getElementById('login_email');
    var passwordInput = document.getElementById('login_password');
    var loginButton = document.querySelector('#login_form_container button');

    function handleEnterKeyPress(event) {
        if (event.key === 'Enter') {
            if (emailInput.value && passwordInput.value) {
                login(); // Função que executa o login
            } else if (emailInput.value) {
                passwordInput.focus();
            } else {
                emailInput.focus();
            }
        }
    }

    emailInput.addEventListener('keyup', handleEnterKeyPress);
    passwordInput.addEventListener('keyup', handleEnterKeyPress);
});
