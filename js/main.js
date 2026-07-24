// =====================================
// ADSA IPÊ - SITE PÚBLICO
// JAVASCRIPT PRINCIPAL
// =====================================


// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


if (menuToggle && navMenu) {


    menuToggle.addEventListener("click", () => {


        navMenu.classList.toggle("active");


    });


}



// FECHAR MENU AO CLICAR EM UM LINK

const linksMenu = document.querySelectorAll(".nav a");


linksMenu.forEach(link => {


    link.addEventListener("click", () => {


        navMenu.classList.remove("active");


    });


});



// ANO AUTOMÁTICO NO RODAPÉ

const ano = document.querySelector(".footer p");


if(ano){

    ano.innerHTML =
    `© ${new Date().getFullYear()} ADSA IPÊ. Todos os direitos reservados.`;

}