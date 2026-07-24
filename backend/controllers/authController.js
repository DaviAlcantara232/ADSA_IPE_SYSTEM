const banco = require("../database/connection");
const jwt = require("jsonwebtoken");

async function login(req, res) {

    try {

        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Email e senha são obrigatórios."
            });
        }

        const [usuarios] = await banco.execute(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                sucesso: false,
                mensagem: "Email ou senha inválidos."
            });
        }

        const usuario = usuarios[0];

        // Por enquanto compara texto puro.
        // Depois vamos trocar por bcrypt.compare().
        if (senha !== usuario.senha) {
            return res.status(401).json({
                sucesso: false,
                mensagem: "Email ou senha inválidos."
            });
        }

        if (usuario.status !== "ativo") {
            return res.status(403).json({
                sucesso: false,
                mensagem: "Usuário inativo."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        return res.json({
            sucesso: true,
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (erro) {

        console.error(erro);

        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro interno do servidor."
        });

    }

}

module.exports = {
    login
};