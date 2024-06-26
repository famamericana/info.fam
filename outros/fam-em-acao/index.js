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
                is_mod: false,
                accountStatus: "ativo" // Defina como "ativo" por padrão
            }

            // Push to Firebase Database
            return database_ref.child('users/' + user.uid).set(user_data);

        })
        .then(function () {
            alert("Conta criada, verifique seu e-mail e faça o login.");
            return auth.signOut();
        })
        .then(function () {
            // Recarregue a página
            location.reload();
        })
        .catch(function (error) {
            // Tratamento de erro
            var error_message = error.message
            alert(error_message)
        });
}



// botão de login ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    fetchAndDisplayNoticias(); // Isso garante que as notícias sejam buscadas independentemente do estado de autenticação do usuário


    var toggleButtonlogin = document.getElementById('toggleButtonlogin');
    var Opcoescontainerlogin = document.querySelector('.containerdelogin');

    // Oculta o container de login ao carregar a página
    Opcoescontainerlogin.style.display = 'none';

    // Verifica o estado de autenticação ao carregar a página
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Se o usuário estiver logado, oculta o botão de login
            toggleButtonlogin.style.display = 'none';
        } else {
            // Se o usuário não estiver logado, mostra o botão de login e permite que ele abra o container de login
            toggleButtonlogin.style.display = 'block';
            toggleButtonlogin.addEventListener('click', function () {
                Opcoescontainerlogin.style.display = Opcoescontainerlogin.style.display === 'none' ? 'block' : 'none';
            });
        }
    });

    window.addEventListener('click', function (event) {
        if (!Opcoescontainerlogin.contains(event.target) && !toggleButtonlogin.contains(event.target)) {
            Opcoescontainerlogin.style.display = 'none';
        }
    });
});


// -------------------------------------------------------------------------------------------------------------------------------

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
                location.reload();
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

function formatarDataHora(data) {
    if (!data) return '';

    const opcoesData = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const opcoesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    return data.toLocaleDateString('pt-BR', opcoesData) + ' | ' + data.toLocaleTimeString('pt-BR', opcoesHora);
}


// Verifica o estado de autenticação quando a aplicação é carregada
auth.onAuthStateChanged(function (user) {
    if (user) {
        // Usuário está logado, verifique se a conta ainda existe ou se a senha foi alterada
        database.ref('users/' + user.uid).once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                // A conta ainda existe, exiba o conteúdo do usuário
                var userData = snapshot.val();
                var loginContainers = document.querySelectorAll('.containerdelogin');

                // Usuário está logado
                loginContainers.forEach(function (container) {
                    container.style.display = 'none';
                });

                // Verifique o status da conta
                if (userData.accountStatus === 'ativo') {
                    // Carregue o conteúdo dentro de post_login_content apenas para contas ativas

                    document.getElementById('post_login_content').style.display = 'block';
                    document.getElementById('post_login_content_dormente').style.display = 'none'; // Oculte o conteúdo dormente


                } else if (userData.accountStatus === 'dormente') {
                    // A conta está dormente, não carregue o conteúdo de post_login_content
                    document.getElementById('post_login_content').style.display = 'none';
                    document.getElementById('post_login_content_dormente').style.display = 'block'; // Exiba o conteúdo dormente

                }

                if (userData && userData.is_admin) {
                    // User is an admin, show the adminPanel and toggleButtonADM
                    document.getElementById('toggleButtonADM').style.display = 'block';
                    document.getElementById('toggleModFormButton').style.display = 'block';
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
                document.getElementById('Nomeatual').textContent = `Boa sorte, ${userData.full_name}!`;

                // Atualizar a data/hora do último login no Firebase
                var userRef = firebase.database().ref('users/' + user.uid);
                userRef.update({
                    last_login: Date.now()
                });
                // Formatar e exibir a data de criação da conta
                var creationDate = new Date(user.metadata.creationTime);
                document.getElementById('accountCreationDate').innerText = "Criação da Conta: " + formatarDataHora(creationDate);

                // Formatar e exibir a data e hora do último login
                var lastLoginDate = new Date(userData.last_login);
                document.getElementById('lastLoginDate').innerText = "Último Login: " + formatarDataHora(lastLoginDate);

            } else {

                // Usuário está logado
                loginContainers.forEach(function (container) {
                    container.style.display = 'block';
                });

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
        document.getElementById('post_login_content').style.display = 'block';
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
            // Recarregue a página
            location.reload();
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
var isSuperAdmin = false; // Variável global

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
                    console.error("Erro ao promover usuário a ADM: ", error);
                });
        } else {
            alert("Ação não permitida: usuário não é ADM Geral.");
        }
    });
}



auth.onAuthStateChanged(function (user) {
    if (user) {
        database.ref('users/' + user.uid).once('value').then(function (snapshot) {
            var userData = snapshot.val();
            isSuperAdmin = userData.is_super_admin; // Atualiza a variável global

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
            // Adicionar botão para tornar/modificar status de Moderador



            var userType, userClass;
            if (user.is_super_admin) {
                userType = '<i class="fa-solid fa-cat"></i> ADM Geral';
                userClass = 'admin-master';
                adminsList.appendChild(userDiv); // Adicione administradores à lista de administradores
            } else if (user.is_admin) {
                userType = '<i class="fa-solid fa-dog"></i> ADM';
                userClass = 'admin-normal';
                adminsList.appendChild(userDiv); // Adicione administradores à lista de administradores
            } else if (user.is_mod) {
                userType = '<i class="fa-solid fa-feather"></i> Escritor'; // Ícone de Moderador
                userClass = 'moderator';
                // Adicione os moderadores à lista de administradores ou a uma lista separada de moderadores
                adminsList.appendChild(userDiv);
            }
            else {
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
                            ${!user.is_super_admin && isSuperAdmin ?
                    (user.is_admin ?
                        '<button onclick="removeAdminStatus(\'' + userId + '\')"><i class="fa-solid fa-minus"></i> <i class="fa-solid fa-dog"></i></button>' :
                        '<button onclick="makeUserAdmin(\'' + userId + '\')"><i class="fa-solid fa-plus"></i><i class="fa-solid fa-dog"></i></button>')
                    : ''}
                                ${!user.is_super_admin ?
                    '<button onclick="toggleModStatus(\'' + userId + '\')">' +
                    (user.is_mod ? '<i class="fa-solid fa-minus"></i> <i class="fa-solid fa-feather"></i>' : '<i class="fa-solid fa-plus"></i> <i class="fa-solid fa-feather"></i>') +
                    '</button>' : ''}                            </div>
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


function searchUsers() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var usersList = document.querySelectorAll('.user-type'); // Seleciona todos os elementos de usuário

    usersList.forEach(function (userDiv) {
        var userName = userDiv.textContent.toLowerCase();
        if (userName.includes(searchValue)) {
            userDiv.style.display = ''; // Mostra os usuários que correspondem
        } else {
            userDiv.style.display = 'none'; // Oculta os demais
        }
    });
}

$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});


// mod --------------------------------------------------------------------------------------------------------------------------------------------------------------------

function formatarData(data) {
    if (!data) return '';

    // Opções para a data
    const opcoesDatapost = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // Opções para a hora
    const opcoesHorapost = { hour: '2-digit', minute: '2-digit' };

    // Convertendo o timestamp para um objeto Date
    const dataFormatadapost = new Date(data.seconds * 1000);

    // Formatando a data e a hora separadamente
    const datapostString = dataFormatadapost.toLocaleDateString('pt-BR', opcoesDatapost);
    const horapostString = dataFormatadapost.toLocaleTimeString('pt-BR', opcoesHorapost);

    // Combinando com o separador '|'
    return datapostString + ' | ' + horapostString;
}


function fetchAndDisplayNoticias() {
    db.collection("famemacao").orderBy("tagsano", "desc").get().then((querySnapshot) => {
        let noticiasPorAno = {};

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const ano = data.tagsano; // 'tagsano' é o campo que contém o ano

            // Se o ano ainda não foi adicionado ao objeto, inicialize com um array vazio
            if (!noticiasPorAno[ano]) {
                noticiasPorAno[ano] = [];
            }

            // Adiciona a notícia ao array correspondente ao seu ano
            noticiasPorAno[ano].push(doc);
        });

        // Ordena as notícias dentro de cada ano por dataPublicacao antes de exibir
        for (const ano in noticiasPorAno) {
            noticiasPorAno[ano].sort((a, b) => b.data().dataPublicacao.toDate() - a.data().dataPublicacao.toDate());
        }

        // 'noticiasPorAno' agora contém as notícias agrupadas por ano
        displayNoticiasAgrupadas(noticiasPorAno);

    }).catch(error => {
        console.error("Erro ao acessar o Firestore: ", error);
    });
}

function displayNoticiasAgrupadas(noticiasPorAno) {
    const postLoginContent = document.getElementById('post_login_content_firestoreNoticias');
    postLoginContent.innerHTML = ''; // Limpa o conteúdo anterior

    // Obtém as chaves do objeto (os anos), as converte para números e ordena em ordem decrescente
    const anosOrdenados = Object.keys(noticiasPorAno).map(Number).sort((a, b) => b - a);


    anosOrdenados.forEach((ano) => {
        const noticias = noticiasPorAno[ano];

        // Cria um contêiner para o grupo de notícias de cada ano
        let grupoNoticiasAno = document.createElement('div');
        grupoNoticiasAno.classList.add('grupo-noticias-ano');
        postLoginContent.appendChild(grupoNoticiasAno);

        // Cria e exibe um título para o ano, adicionando ao contêiner do grupo
        let tituloAno = document.createElement('h2-anos');
        tituloAno.textContent = `${ano}`;
        grupoNoticiasAno.appendChild(tituloAno);

        // Cria um novo div que será o contêiner para todos os noticia-container do ano
        let grupoNoticias = document.createElement('div');
        grupoNoticias.classList.add('grupo-noticias');
        grupoNoticiasAno.appendChild(grupoNoticias);

        // Exibe cada notícia desse ano
        noticias.forEach((doc) => {
            const data = doc.data();
            const botaoLink = data.urlBotao ? `<a href="${data.urlBotao}" target="_blank"><button class="ver-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></button></a>` : '';
            const imagemNoticia = data.urlImagem ? `<img src="${data.urlImagem}" alt="Imagem" class="noticia-imagem">` : `<img src="https://i.postimg.cc/h4drSDnV/padr-o.png" alt="Imagem Padrão" class="noticia-imagem">`;
            const dataFormatada = formatarData(data.dataPublicacao); // Assegure-se de que formatarData está definida corretamente para formatar o campo dataPublicacao

            let elementoNoticia = document.createElement('div');
            elementoNoticia.classList.add("noticia-container");
            elementoNoticia.innerHTML = `
                ${imagemNoticia}
                <h3 class="noticia-titulo">${data.titulo}</h3>
                <div class="noticia-conteudo completo" style="display: none;">${data.conteudo}</div>
                <p class="escritor">${data.autor} </br>(${data.email})</p>
                <p class="horarionoticia">${dataFormatada}</p>
                <div class="button-container">
                ${botaoLink}
                        <button class="ver-mais">Ver Mais</button>
                        <button style="display:none;" class="noticiadeletebutton" data-noticia-id="${doc.id}" data-titulo-noticia="${data.titulo}"><i class="fa-solid fa-trash"></i></button>
                        </div>
            `;
            grupoNoticias.appendChild(elementoNoticia);
        });
    });
}

// Certifique-se de que a função formatarData está implementada para converter timestamps Firestore para a representação desejada de data/hora
function formatarData(timestamp) {
    const data = timestamp.toDate(); // Converte o timestamp do Firestore para um objeto Date do JavaScript
    return data.toLocaleDateString('pt-BR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}


document.addEventListener('click', function (e) {
    if (e.target && e.target.className === 'ver-mais') {
        var noticiaContainer = e.target.closest('.noticia-container');
        var overlay = document.getElementById('overlay');

        // Clone o container da notícia
        var conteudoCompleto = noticiaContainer.cloneNode(true);

        // Mude o botão para "Veja Menos"
        var verMaisButton = conteudoCompleto.querySelector('.ver-mais');
        verMaisButton.textContent = 'Veja Menos';

        // Exiba o conteúdo completo
        var conteudoCompletoDiv = conteudoCompleto.querySelector('.noticia-conteudo.completo');
        conteudoCompletoDiv.style.display = 'block';

        // Limpe o conteúdo atual do overlay
        overlay.innerHTML = '';

        // Adicione o conteúdo do container da notícia ao overlay
        overlay.appendChild(conteudoCompleto);

        // Exiba o overlay
        overlay.style.display = 'block';
        document.body.classList.add('no-scroll');

    }
});

// Adicione um evento de clique no botão "Veja Menos" dentro do overlay para fechar o overlay
document.addEventListener('click', function (e) {
    if (e.target && e.target.className === 'ver-mais' && e.target.textContent === 'Veja Menos') {
        var overlay = document.getElementById('overlay');

        // Oculte o overlay quando o botão "Veja Menos" é clicado
        overlay.style.display = 'none';
        document.body.classList.remove('no-scroll');

    }
});


db.collection("famemacao").get().then((querySnapshot) => {
    console.log("Noticias encontradas: ", querySnapshot.size);
}).catch((error) => {
    console.error("Erro ao acessar o Firestore: ", error);
});


document.getElementById('addNoticiaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pega os valores do formulário
    var titulo = document.getElementById('tituloNoticia').value;
    var tagsano = document.getElementById('tagsano').value; // Capturando o valor do ano
    var urlImagem = document.getElementById('urlImagemNoticia').value;
    var urlBotao = document.getElementById('urlBotaoNoticia').value;


    // Obter o conteúdo do TinyMCE em vez do valor do textarea
    var conteudo = tinymce.get('conteudoNoticia').getContent();
    console.log("Conteúdo capturado do TinyMCE:", conteudo);

    // Obter o nome e o email do usuário atual
    var usuarioAtual = firebase.auth().currentUser;
    // Buscar o nome completo do usuário no Firebase Realtime Database
    firebase.database().ref('users/' + usuarioAtual.uid).once('value').then(function (snapshot) {
        var nomeUsuario = snapshot.val().full_name; // Aqui estamos buscando o full_name
        var emailUsuario = usuarioAtual.email;

        // Adiciona os dados no Firestore
        return db.collection("famemacao").add({
            titulo: titulo,
            tagsano: tagsano, // Incluindo o campo de ano
            conteudo: conteudo,
            urlImagem: urlImagem,
            urlBotao: urlBotao,
            autor: nomeUsuario, // Usando o nome completo do banco de dados
            email: emailUsuario,  // Adicionando o email do usuário
            dataPublicacao: firebase.firestore.FieldValue.serverTimestamp() // Adiciona a data e hora da publicação

        });
    })
        .then(function (docRef) {
            console.log("Documento escrito com ID: ", docRef.id);
            alert("Notícia adicionada com sucesso!");
            // Limpar formulário ou atualizar a página conforme necessário
        })
        .catch(function (error) {
            console.error("Erro ao adicionar documento: ", error);
            alert("Erro ao adicionar notícia!");
        })
        .then(function (docRef) {
            console.log("docRef:", docRef);
            console.log("Documento adicionado com ID: ", docRef.id);
        })

        .catch(function (error) {
            console.error("Erro ao adicionar documento: ", error);
            console.log(error); // Adicionando esta linha para obter mais detalhes
        });
});

// Supondo que você tenha uma função de autenticação
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // Usuário está logado, agora verifique se é um mod
        verificarStatusMod(user.uid);
    } else {
        // Usuário não está logado, esconder formulário
        document.getElementById('modFormContainer').style.display = 'none';
    }
});





// Verificar se o usuário é um moderador usando o Realtime Database
function verificarStatusMod(userId) {
    var userRef = firebase.database().ref('users/' + userId);

    userRef.once('value', function (snapshot) {
        if (snapshot.exists()) {
            var userData = snapshot.val();
            if (userData.is_mod) {
                document.getElementById('toggleModFormButton').style.display = 'block';

                // O usuário é um mod, mostrar formulário
                document.getElementById('modFormContainer').style.display = 'none';
                setTimeout(function () {
                    var deleteButtons = document.querySelectorAll('.noticiadeletebutton');
                    deleteButtons.forEach(function (button) {
                        button.style.display = 'flex';
                    });
                }, 500); // Atrasa a execução em 500 milissegundos

                Addouviutitulonoticia(); // Certifique-se que esta chamada acontece após os botões serem adicionados ao DOM

            } else {
                // O usuário não é um mod, esconder formulário
                document.getElementById('modFormContainer').style.display = 'none';
                document.getElementById('toggleModFormButton').style.display = 'none';
                // Ocultar todos os botões de exclusão
                var deleteButtons = document.querySelectorAll('.noticiadeletebutton');
                deleteButtons.forEach(function (button) {
                    button.style.display = 'none';
                });
            }
        } else {
            console.log("Documento não encontrado no Realtime Database");
        }
    }).catch(function (error) {
        console.log("Erro ao obter dados do usuário:", error);
    });
}




// Verificação de estado de autenticação
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        verificarStatusMod(user.uid);
    } else {
        document.getElementById('modFormContainer').style.display = 'none';
    }
});


document.getElementById('toggleModFormButton').addEventListener('click', function () {
    var modForm = document.getElementById('modFormContainer');

    if (modForm.style.display === 'none' || modForm.style.display === '') {
        modForm.style.display = 'block'; // Ou 'flex', dependendo do seu layout
        this.textContent = 'Esconder criação de noticia';
    } else {
        modForm.style.display = 'none';
        this.textContent = 'Criar notícia';
    }
});


function toggleModStatus(userId) {
    var currentUser = auth.currentUser;

    if (!currentUser) {
        console.error("Nenhum usuário autenticado encontrado.");
        return;
    }

    database.ref('users/' + currentUser.uid).once('value').then(function (snapshot) {
        var currentUserData = snapshot.val();

        if (currentUserData.is_admin) {
            var userRef = database.ref('users/' + userId);
            userRef.once('value').then(function (userSnapshot) {
                var isMod = userSnapshot.val().is_mod || false;
                userRef.update({ is_mod: !isMod })
                    .then(function () {
                        console.log("Status de Moderador alterado com sucesso.");
                        loadUsers(); // Recarrega a lista de usuários
                    })
                    .catch(function (error) {
                        console.error("Erro ao alterar status de Moderador: ", error);
                    });
            });
        } else {
            console.error("Ação não permitida: usuário não é ADM ou é ADM Geral.");
        }
    }).catch(function (error) {
        console.error("Erro ao acessar informações do usuário atual: ", error);
    });
}


// editor de texto ------------------------------------------------------------------------------------------------

tinymce.init({
    selector: '#conteudoNoticia',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    content_css: 'index.css',
    link_list: [
        { title: 'My page 1', value: 'http://www.tinymce.com' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
        { title: 'My page 1', value: 'http://www.tinymce.com' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
        { title: 'None', value: '' },
        { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    file_picker_callback: function (callback, value, meta) {
        /* Provide file and text for the link dialog */
        if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
        }

        /* Provide image and alt text for the image dialog */
        if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
        }

        /* Provide alternative source and posted for the media dialog */
        if (meta.filetype === 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
        }
    },
    templates: [
        { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
        { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
        { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 520,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: 'sliding',
    contextmenu: "link image imagetools table",
    setup: function (editor) {
        editor.on('init', function () {
            editor.execCommand('JustifyLeft');
        });
    }
});


// deletar noticia ------------------------------------------------------------------------------------------------------------------------------------------------------------------

function deleteNoticia(noticiaId, tituloNoticia) {
    if (confirm(`Tem certeza que deseja deletar a notícia '${tituloNoticia}'?`)) {
        db.collection("famemacao").doc(noticiaId).delete().then(() => {
            console.log("Notícia deletada com sucesso!");

            // Registrar a ação de deleção
            var logData = {
                userId: auth.currentUser.uid,
                tituloNoticia: tituloNoticia,
                noticiaId: noticiaId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            db.collection("famemacaodel").add(logData).then(() => {
                console.log("Log de deleção registrado com sucesso.");
                alert("Notícia deletada com sucesso!"); // Opcional: Mostrar uma confirmação para o usuário
                location.reload(); // Recarrega a página
            }).catch(error => {
                console.error("Erro ao registrar log de deleção:", error);
            });

        }).catch((error) => {
            console.error("Erro ao deletar notícia: ", error);
        });
    }
}



function Addouviutitulonoticia() {
    const botoesDeletar = document.querySelectorAll('.noticiadeletebutton');
    botoesDeletar.forEach(button => {
        // Verifica se o ouvinte já foi adicionado
        if (!button.hasAttribute('data-event-listener-added')) {
            button.addEventListener('click', function () {
                const noticiaId = this.getAttribute('data-noticia-id');
                const tituloNoticia = this.getAttribute('data-titulo-noticia');
                deleteNoticia(noticiaId, tituloNoticia);
            });
            // Marca o botão indicando que o ouvinte foi adicionado
            button.setAttribute('data-event-listener-added', 'true');
        }
    });
}


