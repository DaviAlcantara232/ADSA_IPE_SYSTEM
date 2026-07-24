const express = require("express");
const router = express.Router();

// Rota de login
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    // Usuário de teste (temporário)
    const usuario = {
        email: "admin@adsa.com",
        senha: "123456",
        nome: "Administrador ADSA IPÊ",
        tipo: "admin"
    };

    if (email === usuario.email && senha === usuario.senha) {
        return res.json({
            sucesso: true,
            mensagem: "Login realizado com sucesso",
            usuario: {
                nome: usuario.nome,
                tipo: usuario.tipo
            }
        });
    }

    return res.status(401).json({
        sucesso: false,
        mensagem: "Email ou senha incorretos"
    });
});

module.exports = router;