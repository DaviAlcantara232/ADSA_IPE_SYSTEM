// =====================================
// ADSA IPÊ SYSTEM
// FRONTEND LOGIN
// =====================================


// Endereço do backend

const API_URL = "http://localhost:3000";



// =====================================
// FUNÇÃO DE LOGIN
// =====================================

async function fazerLogin() {


    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;



    if (!email || !senha) {


        alert("Digite email e senha");

        return;


    }



    try {


        const resposta = await fetch(

            `${API_URL}/api/login`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },


                body: JSON.stringify({

                    email: email,

                    senha: senha

                })

            }

        );



        const dados = await resposta.json();



        console.log("Resposta API:", dados);



        if (!dados.sucesso) {


            alert(dados.mensagem);

            return;


        }



        // Guardar sessão

        localStorage.setItem(

            "token",

            dados.token

        );



        localStorage.setItem(

            "usuario",

            JSON.stringify(dados.usuario)

        );



        alert("Login realizado com sucesso");



        window.location.href = "admin/dashboard.html";



    } catch (erro) {


        console.error(

            "Erro:",

            erro

        );


        alert(

            "Não foi possível conectar ao servidor"

        );


    }


}