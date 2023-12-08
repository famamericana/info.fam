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

            /*
            alert('User Created!!') */

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
        document.getElementById('toggleFormButtonLogin').innerText = 'Voltar';
        document.getElementById('toggleFormButtonRegistrar').innerText = 'Login';
        isLoginFormShown = false;
    } else {
        document.getElementById('login_form_container').style.display = 'block';
        document.getElementById('register_form_container').style.display = 'none';
        document.getElementById('toggleFormButtonLogin').innerText = 'Voltar';
        document.getElementById('toggleFormButtonRegistrar').innerText = 'Registrar';
        isLoginFormShown = true;
    }
}



function logout() {
    auth.signOut().then(function () {
        // Logout bem-sucedido
        var contentContainer = document.getElementById('content_container');
        var postLoginContent = document.getElementById('post_login_content');
        var toggleFormButton = document.getElementById('toggleFormButton'); // Verifique se este ID está correto

        if (contentContainer) {
            contentContainer.style.display = 'block';
        }
        if (postLoginContent) {
            postLoginContent.style.display = 'none';
        }
        if (toggleFormButton) {
            toggleFormButton.innerText = 'Register'; // Ou o texto que você deseja
        }

        isLoginFormShown = true; // Reset para mostrar o formulário de login
    }).catch(function (error) {
        // Tratar erro de logout
        alert(error.message);
    });
}



// Verifica o estado de autenticação quando a aplicação é carregada
auth.onAuthStateChanged(function (user) {
    if (user) {
        // Usuário está logado, verifique se a conta ainda existe ou se a senha foi alterada
        database.ref('users/' + user.uid).once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                // A conta ainda existe, exiba o conteúdo do usuário
                fetchAndDisplayDocuments();
                document.getElementById('content_container').style.display = 'none';
                document.getElementById('post_login_content').style.display = 'block';

                // Buscar o nome atual do usuário e atualizar o placeholder
                var userData = snapshot.val();
                document.getElementById('newName').placeholder = userData.full_name;

                // Buscar e exibir a data de criação da conta
                var creationDate = new Date(user.metadata.creationTime);
                document.getElementById('accountCreationDate').innerText = "Data de Criação da Conta: " + creationDate.toLocaleDateString();

                // Buscar e exibir a data e hora do último login
                var lastLoginDate = new Date(userData.last_login);
                document.getElementById('lastLoginDate').innerText = "Último Login: " + lastLoginDate.toLocaleString();

            } else {
                // A conta não existe mais, deslogue o usuário
                logout();
            }
        }).catch(function (error) {
            // Erro ao verificar a conta, possivelmente deslogue o usuário
            console.error("Erro ao verificar a conta: ", error);
            logout();
        });
    } else {
        // Usuário não está logado, exiba o formulário de login
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
        const postLoginContent = document.getElementById('post_login_content_firestoreDocumentos');
        postLoginContent.innerHTML = ''; // Limpa o conteúdo anterior

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            postLoginContent.innerHTML += `
                <div>
                <img src="${data.urlImagem}" alt="Imagem">
                    <h3>${data.titulo}</h3>
                    <p>${data.conteudo}</p>
                    <a href="${data.urlBotao}" target="_blank"><button>Link</button></a>
                </div>`;
        });
    });
}


db.collection("Documentos").get().then((querySnapshot) => {
    console.log("Documentos encontrados: ", querySnapshot.size);
}).catch((error) => {
    console.error("Erro ao acessar o Firestore: ", error);
});



// qualidade de vida, enter login -----------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
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


// login - olho senha -----------------------------------------------------------------------------------------------------------------------------------------------------------

function togglePasswordVisibility(id, icon) {
    var passwordInput = document.getElementById(id);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove('fa-regular', 'fa-eye');
        icon.classList.add('fa-solid', 'fa-eye');
    } else {
        passwordInput.type = "password";
        icon.classList.remove('fa-solid', 'fa-eye');
        icon.classList.add('fa-regular', 'fa-eye');
    }
}


//deletar conta --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Adiciona um ouvinte de eventos ao botão de exclusão de conta
document.getElementById('deleteAccountButton').addEventListener('click', function () {
    var confirmDelete = confirm("Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (confirmDelete) {
        deleteAccount();
    }
});
// Função para deletar os dados do usuário
function deleteUserData(userId) {
    var userRef = database.ref('users/' + userId);
    userRef.remove()
        .then(function () {
            console.log("Dados do usuário removidos com sucesso.");
        })
        .catch(function (error) {
            console.error("Erro ao remover dados do usuário: ", error);
        });
}

// Função para excluir a conta do usuário
function deleteAccount() {
    var user = auth.currentUser;

    if (user) {
        // Primeiro, deleta os dados do usuário no Realtime Database
        deleteUserData(user.uid);

        // Em seguida, deleta a conta do usuário no Firebase Auth
        user.delete().then(function () {
            alert("Conta excluída com sucesso.");
            // Redireciona o usuário ou atualiza a interface do usuário conforme necessário
        }).catch(function (error) {
            alert("Erro ao excluir a conta: " + error.message);
        });
    } else {
        alert("Nenhum usuário logado para excluir.");
    }
}


// mudar nome ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function updateName() {
    var user = auth.currentUser;
    var newName = document.getElementById('newName').value;

    if (user && validate_field(newName)) {
        var userRef = database.ref('users/' + user.uid);
        userRef.update({ full_name: newName })
            .then(function () {
                alert("Nome atualizado com sucesso.");
            }).catch(function (error) {
                alert("Erro ao atualizar o nome: " + error.message);
            });
    } else {
        alert("Por favor, insira um nome válido.");
    }
}


document.getElementById('editNameButton').addEventListener('click', function () {
    var newNameInput = document.getElementById('newName');
    var updateNameButton = document.getElementById('updateNameButton');

    newNameInput.disabled = !newNameInput.disabled; // Alterna entre habilitado e desabilitado

    if (!newNameInput.disabled) {
        newNameInput.focus(); // Coloca o foco no campo de entrada
        updateNameButton.style.display = 'block'; // Mostra o botão Atualizar Nome
    } else {
        updateNameButton.style.display = 'none'; // Esconde o botão Atualizar Nome
    }
});


// botão de usuario ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggleButton');
    var usuarioOpcoes = document.querySelector('.usuariopções');

    // Oculta o botão ao carregar a página
    usuarioOpcoes.style.display = 'none';

    toggleButton.addEventListener('click', function () {
        usuarioOpcoes.style.display = usuarioOpcoes.style.display === 'none' ? 'block' : 'none';
    });

    window.addEventListener('click', function (event) {
        if (!usuarioOpcoes.contains(event.target) && !toggleButton.contains(event.target)) {
            usuarioOpcoes.style.display = 'none';
        }
    });
});
