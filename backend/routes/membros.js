// ======================================
// ADSA IPÊ SYSTEM
// MEMBROS
// ======================================

const API = "http://localhost:3000/api";

const token = localStorage.getItem("token");

const lista = document.getElementById("lista-membros");

const btnSalvar = document.getElementById("salvar-membro");

const pesquisa = document.getElementById("pesquisa");

let membroEditando = null;


// ======================================
// BUSCAR MEMBROS
// ======================================

async function carregarMembros(){

    try{

        const resposta = await fetch(

            API + "/membros",

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const dados = await resposta.json();

        lista.innerHTML = "";

        if(!dados.sucesso){

            lista.innerHTML=`

            <tr>

                <td colspan="6">

                Nenhum membro encontrado

                </td>

            </tr>

            `;

            return;

        }

        dados.membros.forEach(criarLinha);

    }

    catch(error){

        console.error(error);

    }

}



// ======================================
// CRIAR LINHA
// ======================================

function criarLinha(membro){

lista.innerHTML += `

<tr>

<td>${membro.nome}</td>

<td>${membro.email}</td>

<td>${membro.telefone || ""}</td>

<td>${membro.ministerio || ""}</td>

<td>${membro.status}</td>

<td>

<button

class="btn-primary"

onclick="editarMembro(${membro.id})">

Editar

</button>

<button

class="btn-danger"

onclick="excluirMembro(${membro.id})">

Excluir

</button>

</td>

</tr>

`;

}

// ======================================
// SALVAR MEMBRO
// ======================================

btnSalvar.addEventListener("click", salvarMembro);

async function salvarMembro(){

const usuario={

nome:document.getElementById("nome").value,

email:document.getElementById("email").value,

cpf:document.getElementById("cpf").value,

senha:document.getElementById("senha").value,

tipo:"membro",

status:document.getElementById("status").value

};


try{

// ======================================
// CRIA USUÁRIO
// ======================================

const respostaUsuario = await fetch(

API+"/usuarios",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify(usuario)

}

);

const dadosUsuario = await respostaUsuario.json();

if(!dadosUsuario.sucesso){

alert(dadosUsuario.mensagem);

return;

}


// ======================================
// CRIA MEMBRO
// ======================================

const membro={

usuario_id:dadosUsuario.id,

telefone:document.getElementById("telefone").value,

endereco:document.getElementById("endereco").value,

nascimento:document.getElementById("nascimento").value,

batizado:Number(document.getElementById("batizado").value),

data_batismo:document.getElementById("data_batismo").value,

ministerio:document.getElementById("ministerio").value,

observacoes:document.getElementById("observacoes").value

};


const respostaMembro = await fetch(

API+"/membros",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify(membro)

}

);

const dadosMembro = await respostaMembro.json();

if(dadosMembro.sucesso){

alert("Membro cadastrado com sucesso!");

limparFormulario();

carregarMembros();

}else{

alert(dadosMembro.mensagem);

}

}catch(error){

console.error(error);

alert("Erro ao cadastrar.");

}

}