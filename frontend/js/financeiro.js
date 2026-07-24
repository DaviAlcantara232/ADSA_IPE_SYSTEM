// =====================================
// ADSA IPÊ SYSTEM
// FINANCEIRO
// =====================================

const API_URL = "http://localhost:3000";

const token = localStorage.getItem("token");
const usuarioJSON = localStorage.getItem("usuario");

if (!token || !usuarioJSON) {

    alert("Sessão expirada.");

    window.location.href = "../login.html";

}

const usuario = JSON.parse(usuarioJSON);

const usuarioLogado = document.getElementById("usuarioLogado");

const saldo = document.getElementById("saldo");

const entradas = document.getElementById("entradas");

const saidas = document.getElementById("saidas");

const listaFinanceiro = document.getElementById("listaFinanceiro");

const logSistema = document.getElementById("logSistema");

let financeiro = [];

let selecionado = null;



// =====================================
// MOSTRAR USUÁRIO
// =====================================

usuarioLogado.innerHTML = `
<b>${usuario.nome}</b><br>
${usuario.email}<br>
${usuario.tipo}
`;



// =====================================
// LOG
// =====================================

function adicionarLog(texto){

    const agora = new Date();

    const hora = agora.toLocaleTimeString("pt-BR");

    logSistema.innerHTML =
    "[" + hora + "] " + texto + "<br>" +
    logSistema.innerHTML;

}



// =====================================
// BUSCAR FINANCEIRO
// =====================================

async function carregarFinanceiro(){

    adicionarLog("Buscando lançamentos...");

    try{

        const resposta = await fetch(

            API_URL + "/api/financeiro",

            {

                headers:{

                    Authorization:"Bearer " + token

                }

            }

        );

        const dados = await resposta.json();

        if(!dados.sucesso){

            alert(dados.mensagem);

            return;

        }

        financeiro = dados.dados;

        montarTabela();

        atualizarCards();

        adicionarLog("Dados carregados.");

    }

    catch(erro){

        console.error(erro);

        adicionarLog("Erro ao conectar com o servidor.");

    }

}

// =====================================
// MONTAR TABELA
// =====================================

function montarTabela(){

    listaFinanceiro.innerHTML = "";


    if(financeiro.length === 0){

        listaFinanceiro.innerHTML = `

        <tr>

            <td colspan="6">
                Nenhum lançamento encontrado.
            </td>

        </tr>

        `;

        return;

    }



    financeiro.forEach(item => {


        const linha = document.createElement("tr");


        linha.innerHTML = `

        <td>
            ${item.id}
        </td>

        <td>
            ${item.tipo}
        </td>

        <td>
            ${item.descricao}
        </td>

        <td>
            R$ ${Number(item.valor).toFixed(2)}
        </td>

        <td>
            ${item.data || "-"}
        </td>

        <td>
            ${item.status || "Confirmado"}
        </td>

        `;



        linha.onclick = function(){

            selecionarLancamento(item, linha);

        };



        listaFinanceiro.appendChild(linha);


    });


}



// =====================================
// SELECIONAR LANÇAMENTO
// =====================================

function selecionarLancamento(item, linha){


    selecionado = item;


    const linhas = document.querySelectorAll(

        "#listaFinanceiro tr"

    );


    linhas.forEach(l => {

        l.style.background = "";

    });



    linha.style.background = "#ddd";



    adicionarLog(

        "Selecionado: " + item.descricao

    );


}



// =====================================
// ATUALIZAR CARDS
// =====================================

function atualizarCards(){


    let totalEntradas = 0;

    let totalSaidas = 0;



    financeiro.forEach(item => {


        const valor = Number(item.valor);



        if(item.tipo.toLowerCase() === "entrada"){


            totalEntradas += valor;


        }else{


            totalSaidas += valor;


        }


    });



    const saldoAtual = totalEntradas - totalSaidas;



    saldo.innerHTML =

    "R$ " + saldoAtual.toFixed(2);



    entradas.innerHTML =

    "R$ " + totalEntradas.toFixed(2);



    saidas.innerHTML =

    "R$ " + totalSaidas.toFixed(2);



}



// =====================================
// ATUALIZAR BOTÃO
// =====================================

function atualizarFinanceiro(){


    carregarFinanceiro();


}



// =====================================
// VOLTAR DASHBOARD
// =====================================

function voltar(){


    window.location.href = "dashboard.html";


}



// =====================================
// SAIR
// =====================================

function sair(){


    localStorage.removeItem("token");


    localStorage.removeItem("usuario");


    window.location.href = "../login.html";


}

// =====================================
// CRIAR LANÇAMENTO
// =====================================

async function criarLancamento(tipo){


    const descricao = prompt(

        "Digite a descrição:"

    );


    if(!descricao){

        return;

    }



    const valorDigitado = prompt(

        "Digite o valor:"

    );



    if(!valorDigitado){

        return;

    }



    const valor = Number(

        valorDigitado.replace(",", ".")

    );



    if(isNaN(valor) || valor <= 0){


        alert(

            "Valor inválido."

        );


        return;

    }



    try{


        const resposta = await fetch(

            API_URL + "/api/financeiro",

            {

                method:"POST",

                headers:{


                    "Content-Type":

                    "application/json",


                    "Authorization":

                    "Bearer " + token


                },


                body:JSON.stringify({


                    tipo:tipo,


                    descricao:descricao,


                    valor:valor


                })


            }


        );



        const dados = await resposta.json();



        if(!dados.sucesso){


            alert(dados.mensagem);


            return;


        }



        adicionarLog(

            "Novo lançamento criado."

        );



        carregarFinanceiro();



    }


    catch(erro){


        console.error(erro);


        adicionarLog(

            "Erro ao criar lançamento."

        );


    }



}



// =====================================
// NOVA ENTRADA
// =====================================

function novaEntrada(){


    criarLancamento(

        "entrada"

    );


}



// =====================================
// NOVA SAÍDA
// =====================================

function novaSaida(){


    criarLancamento(

        "saida"

    );


}

// =====================================
// EDITAR LANÇAMENTO
// =====================================

async function editarSelecionado(){


    if(!selecionado){


        alert(

            "Selecione um lançamento na tabela primeiro."

        );


        return;


    }



    const novaDescricao = prompt(

        "Nova descrição:",

        selecionado.descricao

    );



    if(!novaDescricao){

        return;

    }



    const novoValorTexto = prompt(

        "Novo valor:",

        selecionado.valor

    );



    if(!novoValorTexto){

        return;

    }



    const novoValor = Number(

        novoValorTexto.replace(",", ".")

    );



    try{


        const resposta = await fetch(

            API_URL + "/api/financeiro/" + selecionado.id,

            {


                method:"PUT",


                headers:{


                    "Content-Type":

                    "application/json",


                    "Authorization":

                    "Bearer " + token


                },


                body:JSON.stringify({


                    descricao:novaDescricao,


                    valor:novoValor


                })


            }

        );



        const dados = await resposta.json();



        if(!dados.sucesso){


            alert(dados.mensagem);


            return;


        }



        adicionarLog(

            "Lançamento editado."

        );



        selecionado = null;


        carregarFinanceiro();



    }


    catch(erro){


        console.error(erro);


        adicionarLog(

            "Erro ao editar lançamento."

        );


    }


}





// =====================================
// EXCLUIR LANÇAMENTO
// =====================================

async function excluirSelecionado(){



    if(!selecionado){


        alert(

            "Selecione um lançamento na tabela primeiro."

        );


        return;


    }



    const confirmar = confirm(

        "Deseja realmente excluir este lançamento?"

    );



    if(!confirmar){


        return;


    }



    try{


        const resposta = await fetch(

            API_URL + "/api/financeiro/" + selecionado.id,

            {


                method:"DELETE",


                headers:{


                    "Authorization":

                    "Bearer " + token


                }


            }

        );



        const dados = await resposta.json();



        if(!dados.sucesso){


            alert(dados.mensagem);


            return;


        }



        adicionarLog(

            "Lançamento excluído."

        );



        selecionado = null;


        carregarFinanceiro();



    }



    catch(erro){


        console.error(erro);


        adicionarLog(

            "Erro ao excluir lançamento."

        );


    }


}

// =====================================
// HISTÓRICO
// =====================================

function historicoFinanceiro(){


    if(financeiro.length === 0){


        alert(

            "Não existem lançamentos."

        );


        return;


    }



    let texto = "Histórico Financeiro:\n\n";



    financeiro.forEach(item => {


        texto +=

        `${item.tipo.toUpperCase()} - ${item.descricao} - R$ ${Number(item.valor).toFixed(2)}\n`;



    });



    alert(texto);



    adicionarLog(

        "Histórico consultado."

    );


}





// =====================================
// RELATÓRIOS
// =====================================

function relatorioFinanceiro(){



    let totalEntrada = 0;

    let totalSaida = 0;



    financeiro.forEach(item => {



        if(item.tipo === "entrada"){


            totalEntrada += Number(item.valor);



        }else{


            totalSaida += Number(item.valor);



        }



    });



    const saldoAtual = totalEntrada - totalSaida;



    alert(

`
RELATÓRIO FINANCEIRO

Entradas:
R$ ${totalEntrada.toFixed(2)}

Saídas:
R$ ${totalSaida.toFixed(2)}

Saldo:
R$ ${saldoAtual.toFixed(2)}
`

    );



    adicionarLog(

        "Relatório gerado."

    );


}




// =====================================
// EXPORTAR PDF
// =====================================

function exportarPDF(){



    const conteudo = `

ADSA IPÊ SYSTEM

RELATÓRIO FINANCEIRO


Saldo:
${saldo.innerText}


Entradas:
${entradas.innerText}


Saídas:
${saidas.innerText}


`;



    const janela = window.open("");



    janela.document.write(

        "<pre>" + conteudo + "</pre>"

    );



    janela.print();



    adicionarLog(

        "Relatório enviado para impressão."

    );


}





// =====================================
// INICIALIZAR SISTEMA
// =====================================

carregarFinanceiro();