/* =====================================
   ADSA IPÊ SYSTEM
   ANIMATIONS JS
   ===================================== */


document.addEventListener("DOMContentLoaded", () => {


    iniciarAnimacoes();


});





function iniciarAnimacoes() {


    const elementos =
        document.querySelectorAll(
            ".hero-text, .hero-image, .card, .section h2"
        );



    elementos.forEach(elemento => {


        elemento.classList.add("fade-element");


    });



    observarElementos();


}






function observarElementos() {


    const elementos =
        document.querySelectorAll(".fade-element");



    const observer =
        new IntersectionObserver((entradas) => {



            entradas.forEach(entrada => {



                if (entrada.isIntersecting) {


                    entrada.target.classList.add("show");


                    observer.unobserve(
                        entrada.target
                    );


                }


            });



        },
        {

            threshold: 0.15

        });



    elementos.forEach(elemento => {


        observer.observe(elemento);


    });



}