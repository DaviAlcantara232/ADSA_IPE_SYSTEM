/* =====================================
   ADSA IPÊ SYSTEM
   SITE PÚBLICO - JAVASCRIPT
   ===================================== */



// =====================================
// MENU MOBILE
// =====================================


const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");



if(menuToggle && navMenu){


    menuToggle.addEventListener("click",()=>{


        navMenu.classList.toggle("active");


    });


}




// =====================================
// FECHAR MENU AO CLICAR NOS LINKS
// =====================================


const menuLinks = document.querySelectorAll(".nav a");


menuLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        if(navMenu){

            navMenu.classList.remove("active");

        }


    });


});





// =====================================
// ANO AUTOMÁTICO DO FOOTER
// =====================================


const footerText = document.querySelector(".footer p");


if(footerText){


    footerText.innerHTML =
    `© ${new Date().getFullYear()} ADSA IPÊ. Todos os direitos reservados.`;


}






// =====================================
// SCROLL SUAVE
// =====================================


document.querySelectorAll('a[href^="#"]').forEach(link=>{


    link.addEventListener("click",function(e){


        const destino = document.querySelector(this.getAttribute("href"));


        if(destino){


            e.preventDefault();


            destino.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});





// =====================================
// STATUS DO SITE
// =====================================


console.log(
    "ADSA IPÊ SYSTEM - Site público carregado com sucesso."
);