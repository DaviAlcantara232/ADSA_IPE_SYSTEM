// =====================================
// ADSA IPÊ SYSTEM
// DASHBOARD
// =====================================

const API_URL = "http://localhost:3000";

const token = localStorage.getItem("token");
const usuarioStorage = localStorage.getItem("usuario");

if (!token || !usuarioStorage) {

    alert("Faça login novamente.");

    window.location.href = "../login.html";

}

const usuario = JSON.parse(usuarioStorage);

document.getElementById("usuario").innerHTML =
`Nome: ${usuario.nome}`;

document.getElementById("email").innerHTML =
`Email: ${usuario.email}`;

document.getElementById("tipoUsuario").innerHTML =
`Perfil: ${usuario.tipo}`;



// =====================================
// STATUS DA API
// =====================================

async function verificarAPI() {

    try {

        const resposta = await fetch(`${API_URL}/api/status`);

        const dados = await resposta.json();

        document.getElementById("statusAPI").innerHTML =
        `🟢 ${dados.mensagem}`;

    } catch {

        document.getElementById("statusAPI").innerHTML =
        `🔴 Backend Offline`;

    }

}

verificarAPI();



// =====================================
// ABRIR FINANCEIRO
// =====================================

async function abrirFinanceiro() {

    try {

        const resposta = await fetch(
            `${API_URL}/api/financeiro`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const dados = await resposta.json();

        if (!dados.sucesso) {

            alert(dados.mensagem);
            return;

        }

        // Vai para a página do financeiro
        window.location.href = "financeiro.html";

    } catch (erro) {

        console.error(erro);

        alert("Erro ao acessar o financeiro.");

    }

}



// =====================================
// MEMBROS
// =====================================

function abrirMembros() {

    window.location.href = "membros.html";

}



// =====================================
// LOGOUT
// =====================================

function sair() {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "../login.html";

}