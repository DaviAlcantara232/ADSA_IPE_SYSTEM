const banco = require("./database/connection");

async function testar() {

    try {

        const conexao = await banco.getConnection();

        console.log("✅ Conectado ao MySQL com sucesso!");

        conexao.release();

    } catch (erro) {

        console.error("❌ Erro:");

        console.error(erro);

    }

}

testar();