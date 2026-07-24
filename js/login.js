/* =====================================
   ADSA IPÊ SYSTEM
   LOGIN JS
   ===================================== */


document.addEventListener("DOMContentLoaded", () => {


    iniciarLogin();


});





function iniciarLogin() {


    const formulario =
        document.querySelector("#login-form");



    if (!formulario) {

        return;

    }



    formulario.addEventListener(
        "submit",
        (evento) => {


            evento.preventDefault();



            const email =
                document.querySelector("#email").value;



            const senha =
                document.querySelector("#senha").value;




            validarLogin(
                email,
                senha
            );



        }

    );


}







function validarLogin(email, senha) {



    const mensagem =
        document.querySelector("#login-message");



    if (!email || !senha) {



        mensagem.innerHTML =
            "Preencha todos os campos.";



        mensagem.className =
            "alert alert-error";



        return;

    }






    /*
       Login temporário
       Será substituído pelo banco de dados
    */


    if (
        email === "admin@adsa.com" &&
        senha === "123456"
    ) {



        mensagem.innerHTML =
            "Login realizado com sucesso!";



        mensagem.className =
            "alert alert-success";



        setTimeout(() => {


            window.location.href =
                "admin/dashboard.html";


        }, 1000);



    } else {



        mensagem.innerHTML =
            "Usuário ou senha incorretos.";



        mensagem.className =
            "alert alert-error";


    }



}