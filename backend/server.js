// =====================================
// ADSA IPÊ SYSTEM
// BACKEND API
// MYSQL + JWT
// =====================================


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");


dotenv.config();


const app = express();


const PORT = process.env.PORT || 3000;



// =====================================
// MIDDLEWARE
// =====================================


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));




// =====================================
// MYSQL
// =====================================


const db = mysql.createPool({

    host:process.env.DB_HOST,

    user:process.env.DB_USER,

    password:process.env.DB_PASSWORD,

    database:process.env.DB_NAME,

    waitForConnections:true,

    connectionLimit:10

});



db.getConnection()
.then(()=>{

console.log("MySQL conectado com sucesso!");

})
.catch(err=>{

console.log("Erro MySQL:",err);

});




// =====================================
// JWT
// =====================================


function verificarToken(req,res,next){


const auth = req.headers.authorization;


if(!auth){

return res.status(401).json({

sucesso:false,

mensagem:"Token não informado"

});

}



const token = auth.split(" ")[1];


try{


req.usuario = jwt.verify(

token,

process.env.JWT_SECRET

);


next();



}catch(error){


return res.status(403).json({

sucesso:false,

mensagem:"Token inválido"

});


}


}





function permitir(...tipos){


return(req,res,next)=>{


if(!tipos.includes(req.usuario.tipo)){


return res.status(403).json({

sucesso:false,

mensagem:"Sem permissão"

});


}


next();


};


}






// =====================================
// HOME
// =====================================


app.get("/",(req,res)=>{


res.json({

sistema:"ADSA IPÊ SYSTEM",

status:"Online",

banco:"MySQL"


});


});





// =====================================
// LOGIN
// =====================================


app.post("/api/login", async(req,res)=>{


const {

email,

senha

}=req.body;



try{


const [usuarios] = await db.query(

"SELECT * FROM usuarios WHERE email=?",

[email]

);



if(usuarios.length===0){


return res.status(401).json({

sucesso:false,

mensagem:"Usuário não encontrado"

});


}



const usuario = usuarios[0];



if(senha !== usuario.senha){


return res.status(401).json({

sucesso:false,

mensagem:"Senha incorreta"

});


}




const token = jwt.sign({

id:usuario.id,

nome:usuario.nome,

email:usuario.email,

tipo:usuario.tipo,

status:usuario.status


},

process.env.JWT_SECRET,

{

expiresIn:"8h"

});





res.json({

sucesso:true,

token,

usuario

});



}catch(error){


console.log(error);


res.status(500).json({

erro:error.message

});


}



});






// =====================================
// USUÁRIOS
// =====================================


app.get("/api/usuarios",

verificarToken,

permitir("admin"),

async(req,res)=>{


const [dados]=await db.query(

"SELECT id,nome,email,tipo,status FROM usuarios"

);



res.json({

sucesso:true,

usuarios:dados

});


});






app.post("/api/usuarios",

verificarToken,

permitir("admin"),

async(req,res)=>{


const {

nome,

email,

cpf,

senha,

tipo

}=req.body;



await db.query(

`
INSERT INTO usuarios
(nome,email,cpf,senha,tipo)
VALUES(?,?,?,?,?)
`,

[

nome,

email,

cpf,

senha,

tipo || "membro"

]


);



res.json({

sucesso:true,

mensagem:"Usuário criado"

});



});







// =====================================
// MEMBROS
// =====================================


app.get("/api/membros",

verificarToken,

async(req,res)=>{


const [dados]=await db.query(

"SELECT * FROM membros"

);


res.json({

sucesso:true,

membros:dados

});


});





app.post("/api/membros",

verificarToken,

async(req,res)=>{


const dados=req.body;



await db.query(

`
INSERT INTO membros
(usuario_id,telefone,endereco,nascimento,batizado,data_batismo,ministerio,observacoes)

VALUES(?,?,?,?,?,?,?,?)
`,

[

dados.usuario_id,

dados.telefone,

dados.endereco,

dados.nascimento,

dados.batizado,

dados.data_batismo,

dados.ministerio,

dados.observacoes


]

);



res.json({

sucesso:true,

mensagem:"Membro cadastrado"

});


});








// =====================================
// FINANCEIRO
// =====================================


app.get("/api/financeiro",

verificarToken,

permitir("admin"),

async(req,res)=>{


const [dados]=await db.query(

"SELECT * FROM financeiro ORDER BY data DESC"

);



res.json({

sucesso:true,

dados

});


});







app.post("/api/financeiro",

verificarToken,

permitir("admin"),

async(req,res)=>{


const {

tipo,

descricao,

valor,

data

}=req.body;



await db.query(

`
INSERT INTO financeiro
(tipo,descricao,valor,data,usuario_id)

VALUES(?,?,?,?,?)

`,

[

tipo,

descricao,

valor,

data,

req.usuario.id

]


);



res.json({

sucesso:true,

mensagem:"Lançamento salvo"

});


});







// =====================================
// EVENTOS
// =====================================


app.get("/api/eventos",

async(req,res)=>{


const [dados]=await db.query(

"SELECT * FROM eventos ORDER BY data_evento"

);



res.json({

sucesso:true,

dados

});


});






app.post("/api/eventos",

verificarToken,

permitir("admin","pastor"),

async(req,res)=>{


const {

titulo,

descricao,

data_evento,

horario,

local

}=req.body;



await db.query(

`

INSERT INTO eventos

(titulo,descricao,data_evento,horario,local)

VALUES(?,?,?,?,?)

`,

[

titulo,

descricao,

data_evento,

horario,

local

]


);



res.json({

sucesso:true,

mensagem:"Evento criado"

});


});






// =====================================
// 404
// =====================================


app.use((req,res)=>{


res.status(404).json({

sucesso:false,

mensagem:"Rota não encontrada",

rota:req.originalUrl

});


});







app.listen(PORT,()=>{


console.log(`

=================================

ADSA IPÊ SYSTEM

Servidor ONLINE

Porta: ${PORT}

JWT: ATIVO

MYSQL: ATIVO

=================================

`);


});