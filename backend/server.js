// =====================================
// ADSA IPÊ SYSTEM
// BACKEND SERVER
// MYSQL + JWT + PERMISSÕES
// =====================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const db = require("./config/database");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


// =====================================
// MIDDLEWARES
// =====================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));




// =====================================
// VERIFICAR TOKEN
// =====================================

function verificarToken(req,res,next){

    const authHeader = req.headers.authorization;


    if(!authHeader){

        return res.status(401).json({

            sucesso:false,

            mensagem:"Token não informado"

        });

    }


    const token = authHeader.split(" ")[1];


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





// =====================================
// PERMISSÕES
// =====================================

function permitir(...tipos){

    return (req,res,next)=>{


        if(!tipos.includes(req.usuario.tipo)){


            return res.status(403).json({

                sucesso:false,

                mensagem:"Usuário sem permissão"

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

app.post("/api/login",(req,res)=>{


const {

email,

senha

}=req.body;



const sql = `

SELECT *

FROM usuarios

WHERE email = ?

AND senha = ?

`;



db.query(sql,[email,senha],(err,result)=>{


if(err){

return res.status(500).json({

mensagem:"Erro no banco"

});

}



if(result.length===0){

return res.status(401).json({

sucesso:false,

mensagem:"Login inválido"

});

}



const usuario=result[0];



if(usuario.status !== "ativo"){

return res.status(403).json({

mensagem:"Usuário bloqueado"

});

}




const token = jwt.sign(

{

id:usuario.id,

nome:usuario.nome,

email:usuario.email,

tipo:usuario.tipo,

status:usuario.status

},

process.env.JWT_SECRET,

{

expiresIn:"8h"

}

);




res.json({

sucesso:true,

mensagem:"Login realizado",

token,

usuario

});



});


});






// =====================================
// USUÁRIOS
// =====================================

app.get("/api/usuarios",(req,res)=>{


db.query(

"SELECT id,nome,email,tipo,status FROM usuarios",

(err,result)=>{


if(err){

return res.status(500).json({

erro:"Erro usuários"

});

}



res.json({

sucesso:true,

usuarios:result

});


});


});

// =====================================
// MEMBROS - LISTAR
// =====================================

app.get("/api/membros",(req,res)=>{


const sql = `

SELECT

membros.*,

usuarios.nome,

usuarios.email

FROM membros

LEFT JOIN usuarios

ON membros.usuario_id = usuarios.id

`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json({

erro:"Erro membros"

});

}



res.json({

sucesso:true,

membros:result

});


});


});






// =====================================
// MEMBROS - CADASTRAR
// =====================================

app.post(

"/api/membros",

verificarToken,

permitir("admin"),

(req,res)=>{


const {

usuario_id,
telefone,
endereco,
nascimento,
batizado,
data_batismo,
ministerio,
observacoes

}=req.body;



const sql = `

INSERT INTO membros

(

usuario_id,
telefone,
endereco,
nascimento,
batizado,
data_batismo,
ministerio,
observacoes

)

VALUES (?,?,?,?,?,?,?,?)

`;



db.query(

sql,

[

usuario_id,
telefone,
endereco,
nascimento,
batizado,
data_batismo,
ministerio,
observacoes

],

(err,result)=>{


if(err){

return res.status(500).json({

erro:"Erro cadastro membro"

});

}



res.json({

sucesso:true,

mensagem:"Membro cadastrado",

id:result.insertId

});


});


}

);








// =====================================
// FINANCEIRO - LISTAR
// =====================================

app.get(

"/api/financeiro",

verificarToken,

permitir("admin","tesoureiro"),

(req,res)=>{


db.query(

"SELECT * FROM financeiro ORDER BY data DESC",

(err,result)=>{


if(err){

return res.status(500).json({

erro:"Erro financeiro"

});

}



res.json({

sucesso:true,

dados:result

});


});


}

);








// =====================================
// FINANCEIRO - CADASTRAR
// =====================================

app.post(

"/api/financeiro",

verificarToken,

permitir("admin","tesoureiro"),

(req,res)=>{


const {

tipo,
descricao,
valor,
data

}=req.body;



const sql = `

INSERT INTO financeiro

(

tipo,
descricao,
valor,
data,
usuario_id

)

VALUES (?,?,?,?,?)

`;



db.query(

sql,

[

tipo,
descricao,
valor,
data,
req.usuario.id

],

(err,result)=>{


if(err){

console.log(err);


return res.status(500).json({

sucesso:false,

mensagem:"Erro ao cadastrar lançamento"

});

}



res.json({

sucesso:true,

mensagem:"Lançamento criado",

id:result.insertId

});


});


}

);








// =====================================
// FINANCEIRO - RESUMO
// =====================================

app.get(

"/api/financeiro/resumo",

verificarToken,

permitir("admin","tesoureiro"),

(req,res)=>{


const sql = `

SELECT


SUM(

CASE

WHEN tipo='entrada'

THEN valor

ELSE 0

END

) AS entradas,


SUM(

CASE

WHEN tipo='saida'

THEN valor

ELSE 0

END

) AS saidas


FROM financeiro


`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json({

erro:"Erro resumo financeiro"

});

}



const entradas = Number(result[0].entradas || 0);

const saidas = Number(result[0].saidas || 0);



res.json({

sucesso:true,

resumo:{

entradas,

saidas,

saldo: entradas - saidas

}

});


});


}

);









// =====================================
// EVENTOS
// =====================================

app.get("/api/eventos",(req,res)=>{


db.query(

"SELECT * FROM eventos ORDER BY data_evento ASC",

(err,result)=>{


if(err){

return res.status(500).json({

erro:"Erro eventos"

});

}



res.json({

sucesso:true,

eventos:result

});


});


});








// =====================================
// ADMIN TESTE
// =====================================

app.get(

"/api/admin/teste",

verificarToken,

permitir("admin"),

(req,res)=>{


res.json({

sucesso:true,

mensagem:"Área administrativa liberada",

usuario:req.usuario

});


}

);








// =====================================
// ROTA NÃO ENCONTRADA
// =====================================

app.use((req,res)=>{


res.status(404).json({

sucesso:false,

mensagem:"Rota não encontrada",

rota:req.originalUrl

});


});








// =====================================
// SERVIDOR
// =====================================

app.listen(PORT,()=>{


console.log(`

=================================

ADSA IPÊ SYSTEM

Servidor ONLINE

Porta: ${PORT}

MySQL: ATIVO

JWT: ATIVO

PERMISSÕES: ATIVAS

=================================

`);


});