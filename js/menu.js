/* =====================================
   ADSA IPÊ SYSTEM
   MENU JS
   ===================================== */


document.addEventListener("DOMContentLoaded", () => {


    const menuButton = document.querySelector(".menu-toggle");

    const menu = document.querySelector(".nav");



    if (!menuButton || !menu) {

        return;

    }



    menuButton.addEventListener("click", () => {


        menu.classList.toggle("active");


    });




    // Fecha o menu ao clicar em um link

    const links = document.querySelectorAll(".nav a");


    links.forEach(link => {


        link.addEventListener("click", () => {


            menu.classList.remove("active");


        });


    });



});