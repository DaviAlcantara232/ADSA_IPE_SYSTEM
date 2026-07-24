let eventoEditando = null;



document.addEventListener(
"DOMContentLoaded",
()=>{


atualizarEventosAntigos();


carregarEventos();



document
.getElementById("salvar-evento")
.addEventListener(
"click",
salvarEvento
);



document
.getElementById("cancelar-evento")
.addEventListener(
"click",
cancelarEdicao
);



document
.getElementById("pesquisa-evento")
.addEventListener(
"input",
carregarEventos
);



});








function atualizarEventosAntigos(){


let eventos =
JSON.parse(
localStorage.getItem("eventos")
) || [];



eventos =
eventos.map(evento=>({


id:
evento.id || Date.now(),


nome:
evento.nome || "",


data:
evento.data || "",


hora:
evento.hora || "",


local:
evento.local || "",


responsavel:
evento.responsavel || "",


descricao:
evento.descricao || ""



}));




localStorage.setItem(
"eventos",
JSON.stringify(eventos)
);



}









function salvarEvento(){



let eventos =
JSON.parse(
localStorage.getItem("eventos")
) || [];





const evento = {


id:
eventoEditando || Date.now(),


nome:
document.getElementById("nome-evento").value,


data:
document.getElementById("data-evento").value,


hora:
document.getElementById("hora-evento").value,


local:
document.getElementById("local-evento").value,


responsavel:
document.getElementById("responsavel-evento").value,


descricao:
document.getElementById("descricao-evento").value



};






if(
!evento.nome ||
!evento.data
){


alert(
"Preencha o nome e a data do evento."
);


return;


}








if(eventoEditando){


eventos =
eventos.map(
item =>
item.id === eventoEditando
?
evento
:
item
);


}

else{


eventos.push(evento);


}







localStorage.setItem(
"eventos",
JSON.stringify(eventos)
);



limparFormulario();



carregarEventos();


}









function carregarEventos(){


const tabela =
document.getElementById(
"lista-eventos"
);



if(!tabela)return;






let eventos =
JSON.parse(
localStorage.getItem("eventos")
) || [];






const pesquisa =
document
.getElementById("pesquisa-evento")
.value
.toLowerCase();





tabela.innerHTML="";






eventos
.filter(
evento =>
evento.nome
.toLowerCase()
.includes(pesquisa)
)

.forEach(evento=>{


const linha =
document.createElement("tr");



linha.innerHTML = `


<td>

${evento.nome}

</td>



<td>

${evento.data}

</td>



<td>

${evento.hora}

</td>



<td>

${evento.local}

</td>



<td>

${evento.responsavel}

</td>



<td class="actions">


<button
class="btn-edit"
onclick="editarEvento(${evento.id})">

✏️ Editar

</button>



<button
class="btn-delete"
onclick="excluirEvento(${evento.id})">

🗑️ Excluir

</button>



</td>


`;



tabela.appendChild(linha);



});



}









function editarEvento(id){


let eventos =
JSON.parse(
localStorage.getItem("eventos")
) || [];



const evento =
eventos.find(
item=>item.id===id
);




if(!evento)return;





document.getElementById("nome-evento").value =
evento.nome;


document.getElementById("data-evento").value =
evento.data;


document.getElementById("hora-evento").value =
evento.hora;


document.getElementById("local-evento").value =
evento.local;


document.getElementById("responsavel-evento").value =
evento.responsavel;


document.getElementById("descricao-evento").value =
evento.descricao;




eventoEditando=id;




document.getElementById(
"cancelar-evento"
)
.style.display="inline-block";



}









function excluirEvento(id){


let eventos =
JSON.parse(
localStorage.getItem("eventos")
) || [];



eventos =
eventos.filter(
evento =>
evento.id !== id
);



localStorage.setItem(
"eventos",
JSON.stringify(eventos)
);



carregarEventos();



}









function cancelarEdicao(){


eventoEditando=null;


limparFormulario();



document.getElementById(
"cancelar-evento"
)
.style.display="none";


}








function limparFormulario(){


document.getElementById(
"nome-evento"
).value="";


document.getElementById(
"data-evento"
).value="";


document.getElementById(
"hora-evento"
).value="";


document.getElementById(
"local-evento"
).value="";


document.getElementById(
"responsavel-evento"
).value="";


document.getElementById(
"descricao-evento"
).value="";


}