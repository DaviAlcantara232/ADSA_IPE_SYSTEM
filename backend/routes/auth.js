// =====================================
// ADSA IPÊ SYSTEM
// ROTAS DE AUTENTICAÇÃO
// =====================================

const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");



// =====================================
// LOGIN
// =====================================

router.post("/login", authController.login);



// =====================================
// EXPORTAR
// =====================================

module.exports = router;