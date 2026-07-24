// =====================================
// ADSA IPÊ SYSTEM
// ROTAS FINANCEIRO
// =====================================

const express = require("express");

const router = express.Router();

let financeiro = [

    {
        id: 1,
        tipo: "entrada",
        descricao: "Oferta",
        valor: 100,
        data: "22/07/2026",
        status: "Confirmado"
    }

];



// =====================================
// LISTAR
// =====================================

router.get("/", (req, res) => {

    res.json({

        sucesso: true,

        dados: financeiro

    });

});



// =====================================
// NOVO LANÇAMENTO
// =====================================

router.post("/", (req, res) => {

    const {

        tipo,

        descricao,

        valor

    } = req.body;



    if (!tipo || !descricao || !valor) {

        return res.status(400).json({

            sucesso: false,

            mensagem: "Dados obrigatórios."

        });

    }



    const novo = {

        id: Date.now(),

        tipo,

        descricao,

        valor: Number(valor),

        data: new Date().toLocaleDateString("pt-BR"),

        status: "Confirmado"

    };



    financeiro.push(novo);



    res.status(201).json({

        sucesso: true,

        mensagem: "Lançamento criado.",

        dados: novo

    });

});



// =====================================
// EDITAR
// =====================================

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const item = financeiro.find(f => f.id === id);

    if (!item) {

        return res.status(404).json({

            sucesso: false,

            mensagem: "Lançamento não encontrado."

        });

    }

    item.tipo = req.body.tipo ?? item.tipo;
    item.descricao = req.body.descricao ?? item.descricao;
    item.valor = req.body.valor ?? item.valor;
    item.status = req.body.status ?? item.status;

    res.json({

        sucesso: true,

        dados: item

    });

});



// =====================================
// EXCLUIR
// =====================================

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    financeiro = financeiro.filter(f => f.id !== id);

    res.json({

        sucesso: true,

        mensagem: "Lançamento removido."

    });

});



module.exports = router;