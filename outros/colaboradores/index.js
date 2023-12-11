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

            // Enviar email de verificação
            user.sendEmailVerification().then(function () {
                // Email enviado
            })

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                departamento_nome: departamento_nome,
                last_login: Date.now(),
                is_admin: false,
                is_super_admin: false,
                accountStatus: "ativo" // Defina como "ativo" por padrão
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // Depois de registrar o usuário, você pode deslogá-lo imediatamente
            auth.signOut().then(() => {
                // Recarregue a página
                location.reload();
            });

            alert("Conta criada. Por favor, verifique seu e-mail e faça o login.");
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
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

            // Verifica se o e-mail foi verificado
            if (!user.emailVerified) {
                alert("Por favor, verifique seu e-mail antes de fazer login.");
                auth.signOut(); // Desloga o usuário caso ele não tenha verificado o e-mail
                return;
            }

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



            // Aqui a lógica para exibir o conteúdo após o login
            document.getElementById('content_container').style.display = 'none';
            document.getElementById('post_login_content').style.display = 'none';
            document.getElementById('loadingScreen').style.display = 'block';

            // Recarregue a página
            location.reload();

            fetchAndDisplayDocuments();

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

        // Recarregue a página
        location.reload();
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
                var userData = snapshot.val();

                // Verifique o status da conta
                if (userData.accountStatus === 'ativo') {
                    // Carregue o conteúdo dentro de post_login_content apenas para contas ativas
                    fetchAndDisplayDocuments();
                    document.getElementById('post_login_content').style.display = 'block';
                    document.getElementById('post_login_content_dormente').style.display = 'none'; // Oculte o conteúdo dormente


                } else if (userData.accountStatus === 'dormente') {
                    // A conta está dormente, não carregue o conteúdo de post_login_content
                    document.getElementById('post_login_content').style.display = 'none';
                    document.getElementById('post_login_content_dormente').style.display = 'block'; // Exiba o conteúdo dormente

                } else {
                    // Outros estados da conta, se necessário
                }

                if (userData && userData.is_admin) {
                    // User is an admin, show the adminPanel and toggleButtonADM
                    document.getElementById('toggleButtonADM').style.display = 'block';
                    document.getElementById('adminPanel').style.display = 'none';
                    loadUsers(); // Load admin-specific content
                } else {
                    // User is not an admin, hide the toggleButtonADM and adminPanel
                    document.getElementById('toggleButtonADM').style.display = 'none';
                    document.getElementById('adminPanel').style.display = 'none';
                }
                // Buscar o nome atual do usuário e atualizar o placeholder
                document.getElementById('newName').placeholder = userData.full_name;

                // Update the greeting message with the user's name
                document.getElementById('Nomeatual').textContent = ` Explore a sua faculdade, ${userData.full_name}!`;

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
        document.getElementById('post_login_content_dormente').style.display = 'none'; // Certifique-se de ocultar o conteúdo dormente também
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
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    } else {
        passwordInput.type = "password";
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
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

// adm ----------------------------------------------------------------------------------------------------------------------------------

function makeUserAdmin(userId) {
    var currentUser = auth.currentUser;
    database.ref('users/' + currentUser.uid).once('value').then(function (snapshot) {
        if (snapshot.val().is_super_admin) {
            var userRef = database.ref('users/' + userId);
            userRef.update({ is_admin: true })
                .then(function () {
                    console.log("Usuário promovido a Admin Normal.");
                    loadUsers(); // Recarrega a lista de usuários
                })
                .catch(function (error) {
                    console.error("Erro ao promover usuário a Admin Normal: ", error);
                });
        } else {
            console.error("Ação não permitida: usuário não é Admin Master.");
        }
    });
}



auth.onAuthStateChanged(function (user) {
    if (user) {
        database.ref('users/' + user.uid).once('value').then(function (snapshot) {
            var userData = snapshot.val();
            if (userData && userData.is_admin) {
                // Mostrar interface administrativa
                document.getElementById('adminPanel').style.display = 'block';
            } else {
                // Esconder interface administrativa
                document.getElementById('adminPanel').style.display = 'none';
            }
        });
    } else {
        // Usuário não está logado ou a sessão expirou
        document.getElementById('adminPanel').style.display = 'none';
    }
});
function loadUsers() {
    var adminsList = document.getElementById('adminsList');
    var activeUsersList = document.getElementById('activeUsersList');
    var dormantUsersList = document.getElementById('dormantUsersList');
    adminsList.innerHTML = ''; // Limpa a lista de administradores
    activeUsersList.innerHTML = ''; // Limpa a lista de usuários ativos
    dormantUsersList.innerHTML = ''; // Limpa a lista de usuários dormentes

    var usersRef = database.ref('users');
    usersRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var user = childSnapshot.val();
            var userId = childSnapshot.key;

            var userDiv = document.createElement('div');
            userDiv.id = 'user-' + userId;
            userDiv.classList.add('user-type'); // Classe base para todos os usuários

            var userType, userClass;
            if (user.is_super_admin) {
                userType = '<i class="fa-solid fa-cat"></i> ADM Geral';
                userClass = 'admin-master';
                adminsList.appendChild(userDiv); // Adicione administradores à lista de administradores
            } else if (user.is_admin) {
                userType = '<i class="fa-solid fa-feather"></i> ADM';
                userClass = 'admin-normal';
                adminsList.appendChild(userDiv); // Adicione administradores à lista de administradores
            } else {
                userType = '<i class="fa-solid fa-user-graduate"></i> Usuário';
                userClass = 'user-common';
                if (user.accountStatus === 'ativo') {
                    activeUsersList.appendChild(userDiv); // Adicione usuários ativos à lista de usuários ativos
                } else {
                    dormantUsersList.appendChild(userDiv); // Adicione usuários dormentes à lista de usuários dormentes
                }
            }

            userDiv.classList.add(userClass); // Adicione a classe específica do tipo de usuário

            userDiv.innerHTML = `
            <table class="tabelaadm">
                <tr>
                    <td class="tabelaadmtd">${user.full_name || 'Não informado'} (${user.email || 'Não informado'})</td>
                    <td class="tabelaadmtd">${user.departamento_nome || 'Não informado'}</td>
                    <td class="tabelaadmtd">
                        <div class="tabelaadmtdcombotao">
                            <div>${userType}</div>
                            <div>
                                ${!user.is_admin && !user.is_super_admin ? '<button onclick="makeUserAdmin(\'' + userId + '\')"><i class="fa-solid fa-feather"></i></button>' : ''}
                                ${user.is_admin && !user.is_super_admin ? '<button onclick="removeAdminStatus(\'' + userId + '\')"><i class="fa-solid fa-feather"></i></button>' : ''}
                            </div>
                            </div>
                    </td>

                    <td class="tabelaadmtd">
                    <div class="tabelaadmtdcombotao"><div><i class="fa-solid fa-power-off"></i> ${user.accountStatus}</div>
                    <div>${!user.is_admin && !user.is_super_admin ? '<button title="uma conta ativa pode acessar o conteúdo do site, uma dormente não" onclick="toggleAccountStatus(\'' + userId + '\')"><i class="fa-solid fa-power-off"></i></button>' : ''}</div></div>
</td>
                </tr>
            </table>
        `;

        });
    });
}





function deactivateAccount(userId) {
    var currentUser = auth.currentUser;
    database.ref('users/' + currentUser.uid).once('value').then(function (snapshot) {
        var currentAdmin = snapshot.val();
        database.ref('users/' + userId).once('value').then(function (userSnapshot) {
            var targetUser = userSnapshot.val();

            if (currentAdmin.is_super_admin) {
                // O administrador geral pode desativar qualquer conta
                var confirmation = confirm("Tem certeza de que deseja desativar esta conta?");
                if (confirmation) {
                    // Atualize o campo accountStatus para "dormant" no banco de dados
                    var userRef = database.ref('users/' + userId);
                    userRef.update({ accountStatus: 'dormant' })
                        .then(function () {
                            console.log("Conta de usuário desativada com sucesso.");
                            // Mova o usuário para outra parte do banco de dados, em vez de removê-lo
                            var dormantUsersRef = database.ref('dormantUsers/' + userId);
                            userRef.once('value').then(function (userSnapshot) {
                                var userData = userSnapshot.val();
                                dormantUsersRef.set(userData);

                                // Remova o usuário da lista principal
                                document.getElementById('user-' + userId).remove();
                            });
                        })
                        .catch(function (error) {
                            console.error("Erro ao desativar a conta de usuário: ", error);
                        });
                }
            } else if (currentAdmin.is_admin && !targetUser.is_super_admin) {
                // O ADM Normal não pode desativar a conta de outro ADM Normal
                alert("Você não pode desativar a conta de um administrador.");
            } else if (currentAdmin.is_admin && targetUser.is_super_admin) {
                // O ADM Normal não pode desativar a conta do ADM Master
                alert("Você não pode desativar a conta de um administrador geral.");
            }
        });
    });
}




function makeUserSuperAdmin(userId) {
    var currentUser = auth.currentUser;
    database.ref('users/' + currentUser.uid).once('value').then(function (snapshot) {
        if (snapshot.val().is_super_admin) {
            var userRef = database.ref('users/' + userId);
            userRef.update({ is_super_admin: true })
                .then(function () {
                    console.log("Usuário promovido a Admin Master.");
                    loadUsers(); // Recarrega a lista de usuários
                })
                .catch(function (error) {
                    console.error("Erro ao promover usuário a Admin Master: ", error);
                });
        } else {
            console.error("Ação não permitida: usuário não é Admin Master.");
        }
    });
}
function removeAdminStatus(userId) {
    var currentUser = auth.currentUser;
    if (currentUser.uid === userId) {
        alert("Você não pode deixar de ser adm, consulte o administrador geral.");
        return;
    }

    database.ref('users/' + currentUser.uid).once('value').then(function (snapshot) {
        if (snapshot.val().is_super_admin) {
            var userRef = database.ref('users/' + userId);
            userRef.update({ is_admin: false, is_super_admin: false })
                .then(function () {
                    console.log("Status de admin removido.");
                    loadUsers(); // Recarrega a lista de usuários
                })
                .catch(function (error) {
                    console.error("Erro ao remover status de admin: ", error);
                });
        } else {
            console.error("Ação não permitida: usuário não é Admin Master.");
        }
    });
}


function setAccountStatus(userId, status) {
    var userRef = database.ref('users/' + userId);
    userRef.update({ accountStatus: status })
        .then(function () {
            console.log("Status da conta atualizado com sucesso.");
            loadUsers(); // Recarrega a lista de usuários
        })
        .catch(function (error) {
            console.error("Erro ao atualizar o status da conta: ", error);
        });
}


function toggleAccountStatus(userId) {
    var userRef = database.ref('users/' + userId);

    userRef.once('value', function (snapshot) {
        var user = snapshot.val();
        var newStatus = user.accountStatus === 'ativo' ? 'dormente' : 'ativo';

        userRef.update({ accountStatus: newStatus })
            .then(function () {
                // Atualização bem-sucedida, atualize a lista de usuários
                loadUsers();
            })
            .catch(function (error) {
                console.error("Erro ao alternar o status da conta: ", error);
            });
    });
}

// Obtém o botão e o painel admin pelo ID
const toggleButton = document.getElementById("toggleButtonADM");
const adminPanel = document.getElementById("adminPanel");

// Adiciona um ouvinte de evento de clique ao botão
toggleButton.addEventListener("click", function () {
    // Verifica o estado atual do painel admin
    if (adminPanel.style.display === "none" || adminPanel.style.display === "") {
        // Se estiver oculto, exibe-o
        adminPanel.style.display = "block";
    } else {
        // Caso contrário, oculta-o
        adminPanel.style.display = "none";
    }
});


// modo dark ----------------------------------------------------------------------------------------------------


const body = document.body;
const lightModeIcon = document.getElementById('lightModeIcon');
const darkModeIcon = document.getElementById('darkModeIcon');
const toggleDarkModeButton = document.getElementById('toggleDarkModeButton');

// Function to toggle between light and dark modes
function toggleDarkMode() {
    body.classList.toggle('dark');
    const isDarkMode = body.classList.contains('dark');

    // Toggle icons
    lightModeIcon.style.display = isDarkMode ? 'none' : 'inline';
    darkModeIcon.style.display = isDarkMode ? 'inline' : 'none';

    // Toggle button color
    toggleDarkModeButton.style.backgroundColor = isDarkMode
        ? getComputedStyle(document.documentElement).getPropertyValue('--button-color-dark')
        : getComputedStyle(document.documentElement).getPropertyValue('--button-color-light');

    // Save user preference in localStorage if needed
    localStorage.setItem('darkMode', isDarkMode);
}

// Check user preference from localStorage on page load
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode && savedDarkMode === 'true') {
    body.classList.add('dark');
    lightModeIcon.style.display = 'none';
    darkModeIcon.style.display = 'inline';
    toggleDarkModeButton.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--button-color-dark');
}

// Attach the toggleDarkMode function to the button click event
toggleDarkModeButton.addEventListener('click', toggleDarkMode);


$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});
