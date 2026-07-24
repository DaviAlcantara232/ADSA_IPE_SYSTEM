// =====================================
// ADSA IPÊ SYSTEM
// ROTAS DE USUÁRIOS
// =====================================


const express = require("express");

const router = express.Router();

console.log("ROTAS DE USUARIOS ATIVAS");


// Banco temporário
// Futuramente será substituído pelo banco de dados

let usuarios = [

    {
        id: 1,
        nome: "Administrador ADSA IPÊ",
        email: "admin@adsa.com",
        tipo: "admin",
        status: "ativo"
    }

];



// =====================================
// TESTE DA ROTA
// GET /api/usuarios
// =====================================

router.get("/", (req, res) => {

    res.json({

        sucesso: true,

        mensagem: "Rota de usuários funcionando",

        quantidade: usuarios.length,

        usuarios: usuarios

    });

});



// =====================================
// BUSCAR USUÁRIO POR ID
// GET /api/usuarios/:id
// =====================================

router.get("/:id", (req, res) => {


    const usuario = usuarios.find(

        item => item.id == req.params.id

    );


    if (!usuario) {

        return res.status(404).json({

            sucesso: false,

            mensagem: "Usuário não encontrado"

        });

    }


    res.json({

        sucesso: true,

        usuario: usuario

    });


});



// =====================================
// CRIAR USUÁRIO
// POST /api/usuarios
// =====================================

router.post("/", (req, res) => {


    const {

        nome,

        email,

        tipo

    } = req.body;



    if (!nome || !email) {

        return res.status(400).json({

            sucesso: false,

            mensagem: "Nome e email são obrigatórios"

        });

    }



    const novoUsuario = {

        id: usuarios.length + 1,

        nome: nome,

        email: email,

        tipo: tipo || "membro",

        status: "ativo"

    };



    usuarios.push(novoUsuario);



    res.status(201).json({

        sucesso: true,

        mensagem: "Usuário criado com sucesso",

        usuario: novoUsuario

    });


});



// =====================================
// ALTERAR STATUS
// PUT /api/usuarios/:id/status
// =====================================

router.put("/:id/status", (req, res) => {


    const usuario = usuarios.find(

        item => item.id == req.params.id

    );


    if (!usuario) {

        return res.status(404).json({

            sucesso: false,

            mensagem: "Usuário não encontrado"

        });

    }



    usuario.status = req.body.status;



    res.json({

        sucesso: true,

        mensagem: "Status atualizado",

        usuario: usuario

    });


});



// =====================================
// EXPORTAR ROTAS
// =====================================

module.exports = router;