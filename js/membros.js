let membroEditando = null;



document.addEventListener(
"DOMContentLoaded",
()=>{


carregarMembros();



document
.getElementById("salvar-membro")
.addEventListener(
"click",
salvarMembro
);



document
.getElementById("cancelar-edicao")
.addEventListener(
"click",
cancelar
);



document
.getElementById("pesquisa")
.addEventListener(
"input",
carregarMembros
);



});







function salvarMembro(){


let membros =
JSON.parse(
localStorage.getItem("membros")
) || [];





const membro={


id:
membroEditando || Date.now(),


nome:
nome.value,


telefone:
telefone.value,


email:
email.value,


nascimento:
nascimento.value,


ministerio:
ministerio.value,


status:
status.value


};






if(!membro.nome){


alert(
"Digite o nome do membro"
);


return;


}





if(membroEditando){



membros =
membros.map(
item=>
item.id===membroEditando
?
membro
:
item
);



}else{


membros.push(membro);


}






localStorage.setItem(
"membros",
JSON.stringify(membros)
);




limpar();


carregarMembros();


}









function carregarMembros(){


const tabela =
document.getElementById(
"lista-membros"
);



if(!tabela)return;





let membros =
JSON.parse(
localStorage.getItem("membros")
) || [];






const busca =
document.getElementById("pesquisa")
.value
.toLowerCase();





tabela.innerHTML="";





membros
.filter(
m =>
m.nome
.toLowerCase()
.includes(busca)
)

.forEach(m=>{



let linha =
document.createElement("tr");



linha.innerHTML=`


<td>${m.nome}</td>

<td>${m.telefone}</td>

<td>${m.email}</td>

<td>${m.ministerio}</td>

<td>${m.status}</td>


<td class="actions">


<button 
class="btn-edit"
onclick="editarMembro(${m.id})">

✏️ Editar

</button>


<button 
class="btn-delete"
onclick="excluirMembro(${m.id})">

🗑️ Excluir

</button>


</td>


`;



tabela.appendChild(linha);



});


}









function editarMembro(id){


let membros =
JSON.parse(
localStorage.getItem("membros")
) || [];



let m =
membros.find(
x=>x.id===id
);





nome.value=m.nome;

telefone.value=m.telefone;

email.value=m.email;

nascimento.value=m.nascimento;

ministerio.value=m.ministerio;

status.value=m.status;



membroEditando=id;



document.getElementById(
"cancelar-edicao"
)
.style.display="inline-block";


}









function excluirMembro(id){


let membros =
JSON.parse(
localStorage.getItem("membros")
) || [];



membros =
membros.filter(
m=>m.id!==id
);



localStorage.setItem(
"membros",
JSON.stringify(membros)
);



carregarMembros();


}








function cancelar(){


membroEditando=null;


limpar();


document.getElementById(
"cancelar-edicao"
)
.style.display="none";


}







function limpar(){


nome.value="";

telefone.value="";

email.value="";

nascimento.value="";

ministerio.value="Nenhum";

status.value="Ativo";


}