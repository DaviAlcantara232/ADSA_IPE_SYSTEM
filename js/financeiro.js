let editando = null;



document.addEventListener(
"DOMContentLoaded",
()=>{


carregarFinanceiro();



document
.getElementById("salvar")
.addEventListener(
"click",
salvar
);



document
.getElementById("cancelar")
.addEventListener(
"click",
cancelarEdicao
);



});






function salvar(){


let dados =
JSON.parse(
localStorage.getItem("financeiro")
) || [];



const lancamento = {


id:
editando || Date.now(),


tipo:
document.getElementById("tipo").value,


categoria:
document.getElementById("categoria").value,


descricao:
document.getElementById("descricao").value,


valor:
Number(
document.getElementById("valor").value
),


data:
document.getElementById("data").value


};




if(
!lancamento.descricao ||
!lancamento.valor ||
!lancamento.data
){

alert(
"Preencha todos os campos"
);

return;

}





if(editando){


dados =
dados.map(item =>
item.id === editando
?
lancamento
:
item
);



}else{


dados.push(lancamento);


}



localStorage.setItem(
"financeiro",
JSON.stringify(dados)
);



limpar();


carregarFinanceiro();


}









function carregarFinanceiro(){



const tabela =
document.getElementById("tabela");



if(!tabela)return;




let dados =
JSON.parse(
localStorage.getItem("financeiro")
) || [];





tabela.innerHTML="";



let entradas=0;
let saidas=0;
let dizimos=0;





dados.forEach(item=>{


let linha =
document.createElement("tr");



linha.innerHTML=`


<td>${item.data}</td>

<td>${item.descricao}</td>

<td>${item.categoria}</td>

<td>${item.tipo}</td>

<td>
R$ ${item.valor.toFixed(2)}
</td>


<td>


<button onclick="editar(${item.id})">

Editar

</button>


<button onclick="excluir(${item.id})">

Excluir

</button>


</td>


`;



tabela.appendChild(linha);






if(item.tipo==="entrada"){

entradas += item.valor;


}



else{


saidas += item.valor;


}




if(
item.categoria==="Dízimo"
){

dizimos += item.valor;


}




});






document
.getElementById("total-entradas")
.innerHTML =
"R$ "+entradas.toFixed(2);



document
.getElementById("total-saidas")
.innerHTML =
"R$ "+saidas.toFixed(2);



document
.getElementById("saldo")
.innerHTML =
"R$ "+(entradas-saidas).toFixed(2);



document
.getElementById("total-dizimos")
.innerHTML =
"R$ "+dizimos.toFixed(2);



}









function excluir(id){


let dados =
JSON.parse(
localStorage.getItem("financeiro")
) || [];



dados =
dados.filter(
item=>item.id!==id
);



localStorage.setItem(
"financeiro",
JSON.stringify(dados)
);



carregarFinanceiro();


}









function editar(id){


let dados =
JSON.parse(
localStorage.getItem("financeiro")
) || [];



let item =
dados.find(
x=>x.id===id
);



document.getElementById("tipo").value=item.tipo;

document.getElementById("categoria").value=item.categoria;

document.getElementById("descricao").value=item.descricao;

document.getElementById("valor").value=item.valor;

document.getElementById("data").value=item.data;



editando=id;



document.getElementById("cancelar")
.style.display="inline-block";



}








function cancelarEdicao(){


editando=null;


limpar();


document.getElementById("cancelar")
.style.display="none";


}









function limpar(){


document.getElementById("descricao").value="";


document.getElementById("valor").value="";


document.getElementById("data").value="";


}